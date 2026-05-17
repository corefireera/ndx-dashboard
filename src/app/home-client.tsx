"use client";

import { BarChart3 } from "lucide-react";
import {
  macroIndicators,
  valuationSnapshot,
} from "@/data/home-observation";
import { buildMarketConclusion } from "@/lib/home-observation";

type StockItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changesPercentage: number;
  weight?: number;
  contribution?: number;
};

type MarketData = {
  updatedAt: string;
  beijingUpdatedAt?: string;
  index: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changesPercentage: number;
  } | null;
  stocks: StockItem[];
};

function formatMarketTime(value: string | undefined, label: string) {
  if (!value) {
    return `${label} --`;
  }

  const match = value.match(/(\d{4})[/-](\d{2})[/-](\d{2})\s+(\d{2}):(\d{2})/);

  if (!match) {
    return `${label} ${value}`;
  }

  const [, , month, day, hour, minute] = match;
  return `${label} ${month}/${day} ${hour}:${minute}`;
}

export default function HomeClient({ marketData }: { marketData: MarketData }) {
  const index = marketData.index;
  const stocks = marketData.stocks || [];
  const topDrivers = [...stocks]
    .sort((a, b) => Math.abs(b.contribution ?? 0) - Math.abs(a.contribution ?? 0))
    .slice(0, 10);
  const risingCount = stocks.filter((stock) => stock.changesPercentage > 0).length;
  const risingTotal = stocks.length;
  const risingLabel = risingTotal >= 100 ? "上涨家数" : "核心样本上涨";
  const marketMood = "中性";
  const marketPhase = "震荡";
  const statusLabel = index
    ? index.changesPercentage > 0
      ? "收涨"
      : index.changesPercentage < 0
        ? "收跌"
        : "收平"
    : "收盘";
  const statusClass =
    index && index.changesPercentage > 0
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : index && index.changesPercentage < 0
        ? "bg-rose-50 text-rose-600 ring-rose-100"
        : "bg-slate-50 text-slate-600 ring-slate-100";
  const conclusion = buildMarketConclusion({
    index,
    macroIndicators,
    valuation: valuationSnapshot,
  });

  const formatSigned = (num: number, digits = 2) =>
    `${num >= 0 ? "+" : ""}${num.toFixed(digits)}%`;
  const formatPrice = (num: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getColor = (num: number) =>
    num >= 0 ? "text-emerald-600" : "text-rose-600";

  const getStateColor = (tone: "neutral" | "warning" | "risk") => {
    if (tone === "risk") return "text-rose-500";
    if (tone === "warning") return "text-orange-400";
    return "text-slate-400";
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-2 pb-4 sm:px-6 sm:pt-3 sm:pb-5">
        <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.035)]">
          <div className="grid lg:grid-cols-[1fr_1fr]">
            <div className="p-6 sm:p-7 lg:border-r lg:border-stone-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] tracking-[0.28em] text-slate-400 sm:text-xs">
                  NASDAQ 100 INDEX
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${statusClass}`}>
                  {statusLabel}
                </span>
              </div>

              <div className="mt-5 text-6xl font-semibold tracking-tight text-slate-950 sm:text-7xl">
                {index ? formatPrice(index.price) : "--"}
              </div>

              <div className="mt-3 flex items-center gap-3 text-sm font-semibold">
                <span className={index && index.change >= 0 ? "text-emerald-700" : "text-rose-600"}>
                  {index ? `${index.change >= 0 ? "+" : ""}${index.change.toFixed(2)}` : "--"}
                </span>
                <span className={index && index.changesPercentage >= 0 ? "text-emerald-700" : "text-rose-600"}>
                  {index ? `${index.changesPercentage >= 0 ? "+" : ""}${index.changesPercentage.toFixed(2)}%` : "--"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-xs leading-5 text-slate-400 sm:text-[13px]">
                <div>{formatMarketTime(marketData.updatedAt, "纽约时间")}</div>
                <div>{formatMarketTime(marketData.beijingUpdatedAt, "北京时间")}</div>
              </div>
            </div>

            <div className="border-t border-stone-200/80 p-6 sm:p-7 lg:border-t-0">
              <div className="text-sm text-slate-400">市场状态</div>

              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <div className="text-slate-400">主要驱动</div>
                  <div className="mt-1 text-base font-semibold leading-6 text-slate-950 sm:text-lg">
                    {topDrivers[0]?.name ?? "--"}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400">{risingLabel}</div>
                  <div className="mt-1 text-base font-semibold leading-6 text-slate-950 sm:text-lg">
                    <span className="text-emerald-700">{risingCount}</span> / {risingTotal || "--"}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-4">
                <div className="text-sm text-slate-400">市场情绪</div>
                <div className="mt-2.5 flex flex-wrap gap-4">
                  <span className="rounded-full bg-stone-100 px-5 py-1.5 text-sm font-medium text-slate-700">
                    情绪：{marketMood}
                  </span>
                  <span className="rounded-full bg-amber-50 px-5 py-1.5 text-sm font-medium text-amber-700">
                    阶段：{marketPhase}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200/80 bg-amber-50/30 px-5 py-3 sm:flex sm:items-start sm:gap-5 sm:px-7">
            <div className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-amber-700 ring-1 ring-amber-200">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              当前策略：{conclusion.status}
            </div>

            <div className="mt-2.5 text-sm leading-6 text-slate-600 sm:mt-0">
              {conclusion.desc}
            </div>
          </div>
        </div>
      </section>

      <section id="daily-drivers" className="mx-auto mt-2 max-w-6xl scroll-mt-28 px-4 sm:px-6">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 size={17} strokeWidth={1.8} className="text-slate-500" />
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              今日驱动 TOP10
            </h2>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            按权重 × 涨跌幅估算，对纳指100当日涨跌贡献较大的成分股。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {topDrivers.map((stock) => (
            <div
              key={stock.symbol}
              className="rounded-2xl border border-stone-200/80 bg-white px-4 py-4 transition-shadow hover:shadow-sm"
            >
              <div className="text-xs text-slate-400">{stock.name}</div>

              <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                {stock.symbol}
              </div>

              <div className="mt-3 space-y-1 text-sm">
                <div className="flex items-center justify-between text-slate-500">
                  <span>权重</span>
                  <span>{(stock.weight ?? 0).toFixed(2)}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">涨跌</span>
                  <span className={getColor(stock.changesPercentage)}>
                    {formatSigned(stock.changesPercentage)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">贡献</span>
                  <span className={`font-medium ${getColor(stock.contribution ?? 0)}`}>
                    {formatSigned(stock.contribution ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 mb-8 text-sm text-slate-400">
          剩余成分股对指数影响更分散，完整结构可在「成分股」页面继续查看。
        </div>
      </section>

      <section className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {macroIndicators.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border border-stone-200/80 bg-white px-5 py-4"
            >
              <div className="text-xs text-slate-400">{item.label}</div>
              <div className="mt-1 text-sm font-medium text-slate-700">{item.symbol}</div>
              <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                {item.value}
              </div>
              <div className={`mt-2 text-sm ${getColor(item.change)}`}>
                {formatSigned(item.change)}
              </div>
              <div className={`mt-1 text-xs ${getStateColor(item.stateTone)}`}>
                {item.state}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-slate-400">
          宏观数据：每日美股收盘后更新，仅用于市场环境观察。
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4 pb-3 sm:mt-12 sm:px-6 sm:pb-4">
        <div className="rounded-3xl border border-stone-200/80 bg-white p-5 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              纳指估值观察
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              当前位置更适合判断“贵不贵”，而不是只看涨跌。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {valuationSnapshot.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-sm text-slate-400">{metric.label}</div>
                <div className="mt-2 text-2xl font-semibold text-slate-950">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
            <div className="text-sm text-slate-400">一句话判断</div>
            <div className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              {valuationSnapshot.summary}
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-400">
            估值数据：每周更新，仅用于结构观察
          </div>
        </div>
      </section>


      <footer className="mt-1 px-4 py-2 text-center text-xs text-slate-400">
        本页面仅用于市场结构观察，不构成投资建议。
      </footer>

    </main>
  );
}
