import fs from "fs/promises";
import path from "path";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputFile = path.join(projectRoot, "src", "data", "market-snapshot.json");
const execFileAsync = promisify(execFile);

const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", weight: 8.72 },
  { symbol: "MSFT", name: "Microsoft Corp.", weight: 8.11 },
  { symbol: "NVDA", name: "NVIDIA Corporation", weight: 7.95 },
  { symbol: "AMZN", name: "Amazon.com Inc.", weight: 5.24 },
  { symbol: "META", name: "Meta Platforms Inc.", weight: 4.83 },
  { symbol: "GOOGL", name: "Alphabet Inc. Class A", weight: 3.92 },
  { symbol: "GOOG", name: "Alphabet Inc. Class C", weight: 3.45 },
  { symbol: "AVGO", name: "Broadcom Inc.", weight: 3.11 },
  { symbol: "COST", name: "Costco Wholesale Corp.", weight: 2.88 },
  { symbol: "TSLA", name: "Tesla Inc.", weight: 2.63 },
  { symbol: "NFLX", name: "Netflix Inc.", weight: 2.51 },
  { symbol: "AMD", name: "Advanced Micro Devices", weight: 1.94 },
  { symbol: "ADBE", name: "Adobe Inc.", weight: 1.72 },
  { symbol: "PEP", name: "PepsiCo Inc.", weight: 1.58 },
  { symbol: "CSCO", name: "Cisco Systems Inc.", weight: 1.44 },
];

const INDEX_CANDIDATES = [
  { symbol: "^NDX", name: "Nasdaq 100 Index" },
  { symbol: "QQQ", name: "纳指100ETF参考（QQQ）" },
];

const ALL_SYMBOLS = [
  ...INDEX_CANDIDATES.map((item) => item.symbol),
  ...STOCKS.map((stock) => stock.symbol),
];

const PHASE_1 = [
  ...INDEX_CANDIDATES.map((item) => item.symbol),
  ...STOCKS.slice(0, 7).map((stock) => stock.symbol),
];
const PHASE_2 = STOCKS.slice(7).map((stock) => stock.symbol);

async function loadLocalEnv() {
  const envFile = path.join(projectRoot, ".env.local");

  try {
    const content = await fs.readFile(envFile, "utf-8");

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();

      if (!line || line.startsWith("#")) {
        continue;
      }

      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);

      if (!match) {
        continue;
      }

      const [, key, rawValue] = match;
      const value = rawValue.trim().replace(/^['"]|['"]$/g, "");

      process.env[key] ??= value;
    }
  } catch {
    // .env.local is optional when the key is already provided by the shell.
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchQuote(symbols, apiKey) {
  const symbolParam = symbols.map(encodeURIComponent).join(",");
  const url = `https://api.twelvedata.com/quote?symbol=${symbolParam}&apikey=${apiKey}`;

  return fetchJson(url);
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      throw new Error(`Market quote request failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    if (process.platform !== "win32") {
      throw error;
    }

    return fetchJsonWithPowerShell(url);
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJsonWithPowerShell(url) {
  const script = [
    "$ProgressPreference = 'SilentlyContinue';",
    "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;",
    "(Invoke-WebRequest -UseBasicParsing -Uri $env:QUOTE_URL).Content",
  ].join(" ");
  const { stdout } = await execFileAsync(
    "powershell.exe",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
    {
      env: { ...process.env, QUOTE_URL: url },
      maxBuffer: 10 * 1024 * 1024,
    }
  );

  return JSON.parse(stdout);
}

async function fetchYahooQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol
  )}?range=5d&interval=1d`;
  const raw = await fetchJson(url);
  const result = raw?.chart?.result?.[0];
  const meta = result?.meta;
  const closes = result?.indicators?.quote?.[0]?.close;

  if (!meta || !Array.isArray(closes)) {
    return null;
  }

  const finiteCloses = closes
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
  const latest = finiteCloses.at(-1) ?? 0;
  const previous = finiteCloses.at(-2) ?? 0;

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

async function fetchYahooQuotes(symbols) {
  const results = await Promise.all(symbols.map((symbol) => fetchYahooQuote(symbol)));

  return results.filter(Boolean);
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function isQuote(value) {
  return Boolean(value) && typeof value === "object";
}

function normalizeSymbol(symbol) {
  return symbol?.trim().toUpperCase() ?? "";
}

function normalizeResponse(raw) {
  if (Array.isArray(raw)) {
    return raw.filter(isQuote);
  }

  if (!isQuote(raw)) {
    return [];
  }

  if ("symbol" in raw) {
    return [raw];
  }

  return Object.entries(raw)
    .map(([symbol, item]) =>
      isQuote(item) ? { symbol: item.symbol ?? symbol, ...item } : null
    )
    .filter(Boolean);
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

function formatQuoteTime(item) {
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

function formatBeijingQuoteTime(item) {
  const timestamp = Number(item?.timestamp);

  if (Number.isFinite(timestamp) && timestamp > 0) {
    return `北京 ${formatBeijingTime(new Date(timestamp * 1000))}`;
  }

  return `北京 ${formatBeijingTime()}`;
}

function mapQuote(item, fallbackName = "") {
  return {
    symbol: item.symbol ?? "",
    name: item.name ?? fallbackName ?? item.symbol ?? "",
    price: toNumber(item.close ?? item.price),
    change: toNumber(item.change),
    changesPercentage: toNumber(item.percent_change),
  };
}

function pickIndex(items) {
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

async function main() {
  await loadLocalEnv();

  const apiKey = process.env.TWELVE_DATA_API_KEY;

  console.log("开始更新 market snapshot...");

  let allItems = await fetchYahooQuotes(ALL_SYMBOLS);
  let indexCandidate = pickIndex(allItems);

  if (!indexCandidate && apiKey) {
    console.log("Yahoo 数据不完整，切换 Twelve Data...");

    const raw1 = await fetchQuote(PHASE_1, apiKey);
    console.log("第一批行情完成");

    await sleep(65000);

    const raw2 = await fetchQuote(PHASE_2, apiKey);
    console.log("第二批行情完成");

    allItems = [...normalizeResponse(raw1), ...normalizeResponse(raw2)];
    indexCandidate = pickIndex(allItems);
  }

  if (!indexCandidate) {
    throw new Error("未能获取 ^NDX 或 QQQ 行情，快照未更新");
  }

  const stocks = STOCKS.map((meta) => {
    const raw = allItems.find(
      (item) => normalizeSymbol(item.symbol) === normalizeSymbol(meta.symbol) && !item.code
    );

    const mapped = raw
      ? mapQuote(raw, meta.name)
      : {
          symbol: meta.symbol,
          name: meta.name,
          price: 0,
          change: 0,
          changesPercentage: 0,
        };

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
  });

  const snapshot = {
    updatedAt: indexCandidate ? formatQuoteTime(indexCandidate.raw) : formatQuoteTime(),
    beijingUpdatedAt: indexCandidate
      ? formatBeijingQuoteTime(indexCandidate.raw)
      : formatBeijingQuoteTime(),
    index: indexCandidate
      ? {
          ...mapQuote(indexCandidate.raw, indexCandidate.meta.name),
          symbol: indexCandidate.meta.symbol,
          name: indexCandidate.meta.name,
        }
      : {
          symbol: INDEX_CANDIDATES[0].symbol,
          name: INDEX_CANDIDATES[0].name,
          price: 0,
          change: 0,
          changesPercentage: 0,
        },
    stocks,
  };

  await fs.writeFile(outputFile, `${JSON.stringify(snapshot, null, 2)}\n`, "utf-8");

  console.log("更新完成，已写入：", outputFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
