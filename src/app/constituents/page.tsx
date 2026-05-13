"use client";

import snapshot from "@/data/market-snapshot.json";
import { Layers3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

type StockItem = {
  symbol: string;
  name: string;
  weight?: number;
  changesPercentage: number;
  contribution?: number;
};

function SectionCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {title}
        </h2>
        {desc && <p className="mt-2 text-sm text-slate-500">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function ConstituentsPage() {
  const stocks: StockItem[] = (snapshot.stocks || []).slice(0, 15);

  const top15 = [...stocks].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));

  const yearlyData = [
    { year: "1985", value: 0 },
    { year: "1986", value: 7 },
    { year: "1987", value: -11 },
    { year: "1988", value: 9 },
    { year: "1989", value: 27 },
    { year: "1990", value: -10 },
    { year: "1991", value: 35 },
    { year: "1992", value: 15 },
    { year: "1993", value: 10 },
    { year: "1994", value: 1 },
    { year: "1995", value: 42 },
    { year: "1996", value: 22 },
    { year: "1997", value: 21 },
    { year: "1998", value: 40 },
    { year: "1999", value: 86 },
    { year: "2000", value: -36 },
    { year: "2001", value: -32 },
    { year: "2002", value: -37 },
    { year: "2003", value: 50 },
    { year: "2004", value: 11 },
    { year: "2005", value: 1 },
    { year: "2006", value: 7 },
    { year: "2007", value: 19 },
    { year: "2008", value: -41 },
    { year: "2009", value: 54 },
    { year: "2010", value: 20 },
    { year: "2011", value: 2 },
    { year: "2012", value: 17 },
    { year: "2013", value: 37 },
    { year: "2014", value: 19 },
    { year: "2015", value: 9 },
    { year: "2016", value: 7 },
    { year: "2017", value: 32 },
    { year: "2018", value: -1 },
    { year: "2019", value: 39 },
    { year: "2020", value: 48 },
    { year: "2021", value: 27 },
    { year: "2022", value: -33 },
    { year: "2023", value: 55 },
    { year: "2024", value: 30 },
    { year: "2025", value: 17 },
  ];

  const peHistoryData = [
    { year: "2010", pe: 18.5 },
    { year: "2011", pe: 17.2 },
    { year: "2012", pe: 16.8 },
    { year: "2013", pe: 19.4 },
    { year: "2014", pe: 21.1 },
    { year: "2015", pe: 20.2 },
    { year: "2016", pe: 19.6 },
    { year: "2017", pe: 23.4 },
    { year: "2018", pe: 22.1 },
    { year: "2019", pe: 24.8 },
    { year: "2020", pe: 28.9 },
    { year: "2021", pe: 31.5 },
    { year: "2022", pe: 21.7 },
    { year: "2023", pe: 26.8 },
    { year: "2024", pe: 28.4 },
    { year: "2025", pe: 27.6 },
  ];

  const valuationBuckets = [
    {
      range: "0-30%（低估）",
      samples: 18,
      winRate: "78%",
      medianReturn: "+22%",
      avgReturn: "+24%",
      best: "+65%",
      worst: "-18%",
      highlight: false,
    },
    {
      range: "30-60%（合理）",
      samples: 27,
      winRate: "64%",
      medianReturn: "+14%",
      avgReturn: "+16%",
      best: "+48%",
      worst: "-28%",
      highlight: false,
    },
    {
      range: "60-80%（偏高）",
      samples: 19,
      winRate: "51%",
      medianReturn: "+8%",
      avgReturn: "+10%",
      best: "+38%",
      worst: "-35%",
      highlight: true,
    },
    {
      range: "80-100%（高估）",
      samples: 16,
      winRate: "38%",
      medianReturn: "+3%",
      avgReturn: "+5%",
      best: "+32%",
      worst: "-48%",
      highlight: false,
    },
  ];

  const indexCompareData = [
    { year: "2015", nasdaq: 100, sp500: 100, dow: 100 },
    { year: "2016", nasdaq: 108, sp500: 106, dow: 105 },
    { year: "2017", nasdaq: 132, sp500: 124, dow: 121 },
    { year: "2018", nasdaq: 129, sp500: 118, dow: 116 },
    { year: "2019", nasdaq: 167, sp500: 149, dow: 143 },
    { year: "2020", nasdaq: 214, sp500: 176, dow: 161 },
    { year: "2021", nasdaq: 262, sp500: 227, dow: 194 },
    { year: "2022", nasdaq: 213, sp500: 186, dow: 176 },
    { year: "2023", nasdaq: 289, sp500: 238, dow: 207 },
    { year: "2024", nasdaq: 332, sp500: 271, dow: 228 },
    { year: "2025", nasdaq: 356, sp500: 288, dow: 237 },
  ];

  const peMedian = 22.5;
  const currentPe = 28.4;

  const formatSigned = (num: number, digits = 2) =>
    `${num >= 0 ? "+" : ""}${num.toFixed(digits)}%`;

  const getColor = (num: number) =>
    num >= 0 ? "text-emerald-600" : "text-rose-600";

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-4 sm:px-6">
        <div className="mb-8">
          <div className="text-[11px] tracking-[0.28em] text-slate-400 sm:text-xs">
            CONSTITUENTS & STRUCTURE
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            成分股结构
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
            看清谁在真正驱动指数
          </p>

          <div className="mt-3 text-sm text-slate-400">
            更新于：{snapshot.updatedAt} / {snapshot.beijingUpdatedAt}
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2">
          <Layers3 size={17} strokeWidth={1.8} className="text-slate-500" />
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            核心驱动 TOP15
          </h2>
        </div>

        <p className="mb-6 text-sm text-slate-500">
          按对指数贡献排序，快速看清当前最核心的权重驱动结构。
        </p>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {top15.map((stock) => (
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
                  <span
                    className={`font-medium ${getColor(stock.contribution ?? 0)}`}
                  >
                    {formatSigned(stock.contribution ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 mb-2 text-sm text-slate-400">
          剩余成分股对指数影响更分散，这里只保留最关键的核心驱动层。
        </div>
      </section>

      <section className="mx-auto mt-2 max-w-6xl px-4 sm:px-6">
        <SectionCard
          title="纳指成立以来年度涨跌幅"
          desc="用一条线看清纳指长期波动结构。"
        >
          <div className="relative h-[320px] w-full">
            <LineChart
              data={yearlyData}
              responsive
              style={{ width: "100%", height: "100%" }}
            >
                <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
                <ReferenceLine y={0} stroke="#e5e7eb" />
                <XAxis
                  dataKey="year"
                  interval="preserveStartEnd"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis
                  domain={[-60, 100]}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => {
                    const num = Number(value);
                    return [`${num}%`, "年度涨跌"];
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e7e5e4",
                    backgroundColor: "#ffffff",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#334155"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  activeDot={{ r: 4 }}
                />
            </LineChart>

            <div className="absolute right-2 top-2 text-xs text-slate-400">
              单位：%
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <SectionCard
          title="PE历史趋势图"
          desc="用来看当前位置在长期估值区间中的高低。"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">估值区间</div>
            <div className="text-xs text-slate-400">
              当前 PE：{currentPe} / 中位数：{peMedian}
            </div>
          </div>

          <div className="h-[320px] w-full">
            <LineChart
              data={peHistoryData}
              responsive
              style={{ width: "100%", height: "100%" }}
              margin={{ top: 10, right: 12, left: -24, bottom: 6 }}
            >
                <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[10, 35]}
                />
                <Tooltip
                  formatter={(value) => [Number(value), "PE(TTM)"]}
                  labelFormatter={(label) => `${label} 年`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e7e5e4",
                    backgroundColor: "#ffffff",
                    fontSize: "12px",
                  }}
                />
                <ReferenceLine
                  y={peMedian}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  label={{
                    value: "中位数",
                    position: "insideTopRight",
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pe"
                  stroke="#334155"
                  strokeWidth={2}
                  dot={{ r: 2.5 }}
                  isAnimationActive={false}
                  activeDot={{ r: 4 }}
                />
            </LineChart>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
            <div className="text-sm text-slate-400">一句话判断</div>
            <div className="mt-2 text-sm leading-7 text-slate-700">
              当前PE高于长期中位数，说明估值处于偏高区间，更适合结合利率环境与盈利增长一起判断，而不是只看价格涨跌。
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <SectionCard
          title="相似估值区间表现"
          desc="看当前估值分位在历史上对应的1年后收益表现。"
        >
          <div className="mb-4 text-sm text-slate-500">
            当前PE分位约为{" "}
            <span className="font-medium text-slate-900">78%</span>
            ，对应历史上的
            <span className="font-medium text-slate-900">
              {" "}
              偏高区间（60%-80%）
            </span>
            。
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-stone-200/80 bg-white md:block">
            <div className="grid grid-cols-[1.4fr_0.8fr_1fr_1fr_1fr_1fr_1fr] gap-4 border-b border-stone-200/70 px-5 py-4 text-sm font-medium text-slate-500">
              <div>当前PE分位</div>
              <div>样本数</div>
              <div>1年后正收益概率</div>
              <div>中位数收益</div>
              <div>平均收益</div>
              <div>最好情况</div>
              <div>最差情况</div>
            </div>

            {valuationBuckets.map((item) => (
              <div
                key={item.range}
                className={`grid grid-cols-[1.4fr_0.8fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-4 text-sm ${
                  item.highlight ? "bg-amber-50/40" : "bg-white"
                } border-b border-stone-200/60 last:border-b-0`}
              >
                <div className="font-medium text-slate-900">{item.range}</div>
                <div className="text-slate-700">{item.samples}次</div>
                <div className="text-slate-700">{item.winRate}</div>
                <div className="text-slate-700">{item.medianReturn}</div>
                <div className="text-slate-700">{item.avgReturn}</div>
                <div className="text-emerald-600">{item.best}</div>
                <div className="text-rose-500">{item.worst}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {valuationBuckets.map((item) => (
              <div
                key={item.range}
                className={`rounded-2xl border border-stone-200/80 px-4 py-4 ${
                  item.highlight ? "bg-amber-50/40" : "bg-white"
                }`}
              >
                <div className="text-base font-semibold text-slate-900">
                  {item.range}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">样本数</div>
                    <div className="mt-1 text-slate-900">{item.samples}次</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">正收益概率</div>
                    <div className="mt-1 text-slate-900">{item.winRate}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">中位数收益</div>
                    <div className="mt-1 text-slate-900">
                      {item.medianReturn}
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">平均收益</div>
                    <div className="mt-1 text-slate-900">{item.avgReturn}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">最好情况</div>
                    <div className="mt-1 text-emerald-600">{item.best}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">最差情况</div>
                    <div className="mt-1 text-rose-500">{item.worst}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
            <div className="text-sm text-slate-400">一句话判断</div>
            <div className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              当前PE处于历史78%分位，对应偏高区间。历史上在类似位置买入后，
              1年正收益概率并不高，中位数收益也明显回落。不是不能涨，而是赔率开始下降。
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <SectionCard
          title="纳指 vs 标普 vs 道指"
          desc="用来观察纳指相对其他核心指数的长期强弱位置。"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-500">指数对比（2015 = 100）</div>

            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-800"></span>
                纳指
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-500"></span>
                标普
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                道指
              </div>
            </div>
          </div>

          <div className="h-[320px] w-full">
            <LineChart
              data={indexCompareData}
              responsive
              style={{ width: "100%", height: "100%" }}
              margin={{ top: 10, right: 12, left: -12, bottom: 6 }}
            >
                <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value, name) => {
                    const map: Record<string, string> = {
                      nasdaq: "纳指",
                      sp500: "标普",
                      dow: "道指",
                    };

                    const num = Number(value);
                    const label = map[String(name)] || String(name);

                    return [isNaN(num) ? "-" : num, label];
                  }}
                  labelFormatter={(label) => `${label} 年`}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e7e5e4",
                    backgroundColor: "#ffffff",
                    fontSize: "12px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="nasdaq"
                  stroke="#0f172a"
                  strokeWidth={2.4}
                  dot={false}
                  isAnimationActive={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="sp500"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="dow"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  activeDot={{ r: 4 }}
                />
            </LineChart>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
            <div className="text-sm text-slate-400">一句话判断</div>
            <div className="mt-2 text-sm leading-7 text-slate-700">
              长期看，纳指的收益弹性明显强于标普和道指，但波动也更大。它不是更稳的指数，而是更依赖科技成长与估值扩张的指数。
            </div>
          </div>
        </SectionCard>
      </section>
    </main>
  );
}
