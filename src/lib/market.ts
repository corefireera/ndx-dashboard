import "server-only";

import { cache } from "react";
import fallbackSnapshot from "@/data/market-snapshot.json";

export type MarketIndex = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
};

export type MarketStock = MarketIndex & {
  weight: number;
  contribution: number;
};

export type MarketSnapshot = {
  updatedAt: string;
  beijingUpdatedAt?: string;
  index: MarketIndex | null;
  stocks: MarketStock[];
  source: "live" | "snapshot";
};

type RawQuote = {
  symbol?: string;
  name?: string;
  close?: string | number;
  price?: string | number;
  change?: string | number;
  percent_change?: string | number;
  datetime?: string;
  timestamp?: string | number;
  code?: number | string;
};

const API_KEY = process.env.TWELVE_DATA_API_KEY;
const MARKET_REVALIDATE_SECONDS = 12 * 60 * 60;
const MARKET_FETCH_TIMEOUT_MS = 3500;

const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", weight: 8.72 },
  { symbol: "MSFT", name: "Microsoft Corp.", weight: 8.11 },
  { symbol: "NVDA", name: "NVIDIA Corporation", weight: 7.95 },
  { symbol: "AMZN", name: "Amazon.com Inc.", weight: 5.24 },
  { symbol: "META", name: "Meta Platforms Inc.", weight: 4.83 },
  { symbol: "GOOGL", name: "Alphabet Inc. Class A", weight: 3.92 },
  { symbol: "AVGO", name: "Broadcom Inc.", weight: 3.11 },
  { symbol: "AMD", name: "Advanced Micro Devices", weight: 1.94 },
  { symbol: "QCOM", name: "Qualcomm Inc.", weight: 1.42 },
  { symbol: "MU", name: "Micron Technology Inc.", weight: 1.18 },
  { symbol: "MRVL", name: "Marvell Technology Inc.", weight: 0.86 },
  { symbol: "ADBE", name: "Adobe Inc.", weight: 1.72 },
  { symbol: "NFLX", name: "Netflix Inc.", weight: 2.51 },
  { symbol: "COST", name: "Costco Wholesale Corp.", weight: 2.88 },
  { symbol: "TSLA", name: "Tesla Inc.", weight: 2.63 },
] as const;

const INDEX_CANDIDATES = [
  { symbol: "^NDX", name: "Nasdaq 100 Index" },
  { symbol: "QQQ", name: "纳指100ETF参考（QQQ）" },
] as const;

const ALL_SYMBOLS = [
  ...INDEX_CANDIDATES.map((item) => item.symbol),
  ...STOCKS.map((item) => item.symbol),
];

function toNumber(value: string | number | undefined) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function isQuote(value: unknown): value is RawQuote {
  return Boolean(value) && typeof value === "object";
}

function normalizeSymbol(symbol: string | undefined) {
  return symbol?.trim().toUpperCase() ?? "";
}

function normalizeResponse(raw: unknown): RawQuote[] {
  if (Array.isArray(raw)) {
    return raw.filter(isQuote);
  }

  if (!isQuote(raw)) {
    return [];
  }

  if ("symbol" in raw) {
    return [raw];
  }

  const quotes: RawQuote[] = [];

  for (const [symbol, item] of Object.entries(raw)) {
    if (isQuote(item)) {
      const quote = item as RawQuote;
      quotes.push({ ...quote, symbol: quote.symbol ?? symbol });
    }
  }

  return quotes;
}

function mapQuote(item: RawQuote, fallbackName = ""): MarketIndex {
  return {
    symbol: item.symbol ?? "",
    name: item.name ?? fallbackName ?? item.symbol ?? "",
    price: toNumber(item.close ?? item.price),
    change: toNumber(item.change),
    changesPercentage: toNumber(item.percent_change),
  };
}

function formatNewYorkTime(date = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatBeijingTime(date = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatQuoteTime(item?: RawQuote) {
  const timestamp = Number(item?.timestamp);

  if (Number.isFinite(timestamp) && timestamp > 0) {
    return `纽约 ${formatNewYorkTime(new Date(timestamp * 1000))}`;
  }

  if (item?.datetime) {
    const normalized = item.datetime.replaceAll("-", "/");
    return normalized.includes(":")
      ? `纽约 ${normalized}`
      : `纽约 ${normalized} 收盘`;
  }

  return `纽约 ${formatNewYorkTime()}`;
}

function formatBeijingQuoteTime(item?: RawQuote) {
  const timestamp = Number(item?.timestamp);

  if (Number.isFinite(timestamp) && timestamp > 0) {
    return `北京 ${formatBeijingTime(new Date(timestamp * 1000))}`;
  }

  return `北京 ${formatBeijingTime()}`;
}

async function fetchQuotes(symbols: readonly string[]) {
  const symbolParam = symbols.map(encodeURIComponent).join(",");
  const url = `https://api.twelvedata.com/quote?symbol=${symbolParam}&apikey=${API_KEY}`;
  const res = await fetchWithTimeout(url, {
    next: {
      revalidate: MARKET_REVALIDATE_SECONDS,
      tags: ["market-snapshot"],
    },
  });

  if (!res.ok) {
    throw new Error(`Market quote request failed: ${res.status}`);
  }

  return normalizeResponse(await res.json());
}

function latestFinitePair(values: unknown[]) {
  const finite = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);

  return {
    latest: finite.at(-1) ?? 0,
    previous: finite.at(-2) ?? 0,
  };
}

async function fetchYahooQuote(symbol: string): Promise<RawQuote | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol
  )}?range=5d&interval=1d`;
  const res = await fetchWithTimeout(url, {
    next: {
      revalidate: MARKET_REVALIDATE_SECONDS,
      tags: ["market-snapshot"],
    },
  });

  if (!res.ok) {
    return null;
  }

  const raw = await res.json();
  const result = raw?.chart?.result?.[0];
  const meta = result?.meta;
  const closes = result?.indicators?.quote?.[0]?.close;

  if (!meta || !Array.isArray(closes)) {
    return null;
  }

  const { latest, previous } = latestFinitePair(closes);

  if (!latest || !previous) {
    return null;
  }

  const change = latest - previous;

  return {
    symbol: meta.symbol ?? symbol,
    name: meta.longName ?? meta.shortName ?? symbol,
    close: latest,
    price: latest,
    change,
    percent_change: (change / previous) * 100,
    timestamp: meta.regularMarketTime,
  };
}

async function fetchYahooQuotes(symbols: readonly string[]) {
  const results = await Promise.all(symbols.map((symbol) => fetchYahooQuote(symbol)));

  return results.filter((item): item is RawQuote => Boolean(item));
}

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

async function fetchWithTimeout(url: string, init: NextFetchInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), MARKET_FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function pickIndex(items: RawQuote[]) {
  return INDEX_CANDIDATES.map((meta) => {
    const raw = items.find(
      (item) =>
        normalizeSymbol(item.symbol) === normalizeSymbol(meta.symbol) &&
        !item.code &&
        toNumber(item.close ?? item.price) > 0
    );

    return raw ? { meta, raw } : null;
  }).find(Boolean);
}

function mapStocks(items: RawQuote[]) {
  return STOCKS.map<MarketStock | null>((meta) => {
    const raw = items.find(
      (item) => normalizeSymbol(item.symbol) === normalizeSymbol(meta.symbol) && !item.code
    );

    if (!raw) {
      return null;
    }

    const mapped = mapQuote(raw, meta.name);
    const contribution = Number(
      ((meta.weight * mapped.changesPercentage) / 100).toFixed(2)
    );

    return {
      ...mapped,
      symbol: meta.symbol,
      name: mapped.name || meta.name,
      weight: meta.weight,
      contribution,
    };
  }).filter((item): item is MarketStock => Boolean(item));
}

function getFallbackSnapshot(): MarketSnapshot {
  const snapshot = fallbackSnapshot as {
    updatedAt?: string;
    beijingUpdatedAt?: string;
    index?: MarketIndex | null;
    stocks?: MarketStock[];
  };

  return {
    updatedAt: snapshot.updatedAt ?? "--",
    beijingUpdatedAt: snapshot.beijingUpdatedAt,
    index: snapshot.index ?? null,
    stocks: snapshot.stocks ?? [],
    source: "snapshot",
  };
}

function isSnapshotFresh(snapshot: MarketSnapshot) {
  const match = snapshot.updatedAt.match(/(\d{4})[/-](\d{2})[/-](\d{2})/);

  if (!match) {
    return false;
  }

  const [, year, month, day] = match;
  const snapshotDate = new Date(`${year}-${month}-${day}T12:00:00+08:00`);
  const ageMs = Date.now() - snapshotDate.getTime();

  return ageMs >= 0 && ageMs < 48 * 60 * 60 * 1000;
}

async function getLiveMarketData(): Promise<MarketSnapshot> {
  let items = await fetchYahooQuotes(ALL_SYMBOLS);
  let indexCandidate = pickIndex(items);
  let stocks = mapStocks(items);

  if ((!indexCandidate || stocks.length === 0) && API_KEY) {
    items = await fetchQuotes(ALL_SYMBOLS);
    indexCandidate = pickIndex(items);
    stocks = mapStocks(items);
  }

  if (!indexCandidate || stocks.length === 0) {
    throw new Error("Market quote response is incomplete");
  }

  return {
    updatedAt: formatQuoteTime(indexCandidate.raw),
    beijingUpdatedAt: formatBeijingQuoteTime(indexCandidate.raw),
    index: {
      ...mapQuote(indexCandidate.raw, indexCandidate.meta.name),
      symbol: indexCandidate.meta.symbol,
      name: indexCandidate.meta.name,
    },
    stocks,
    source: "live",
  };
}

export const getMarketData = cache(async (): Promise<MarketSnapshot> => {
  const fallback = getFallbackSnapshot();

  if (isSnapshotFresh(fallback)) {
    return fallback;
  }

  try {
    return await getLiveMarketData();
  } catch (error) {
    console.warn("Using local market snapshot fallback.", error);
    return fallback;
  }
});
