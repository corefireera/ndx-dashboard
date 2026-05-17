"use client";

import { CalendarDays, FileText, Sparkles } from "lucide-react";

type EventItem = {
  date: string;
  event: string;
  level: "高" | "中" | "低";
  previous: string;
  expected: string;
};

type EarningsItem = {
  company: string;
  ticker: string;
  date: string;
  focus: string;
};

type InsightItem = {
  title: string;
  chain: string;
  impact: string;
};

export default function NewsPage() {
  const macroEvents: EventItem[] = [
    {
      date: "5月7日",
      event: "美联储利率决议",
      level: "高",
      previous: "5.25%-5.50%",
      expected: "维持不变",
    },
    {
      date: "5月10日",
      event: "CPI通胀数据",
      level: "高",
      previous: "3.4%",
      expected: "3.2%",
    },
    {
      date: "5月17日",
      event: "PCE物价指数",
      level: "高",
      previous: "2.8%",
      expected: "2.7%",
    },
    {
      date: "5月24日",
      event: "GDP修正值",
      level: "中",
      previous: "2.1%",
      expected: "2.0%",
    },
    {
      date: "6月7日",
      event: "非农就业数据",
      level: "高",
      previous: "22.8万",
      expected: "18万",
    },
  ];

  const earnings: EarningsItem[] = [
    {
      company: "苹果",
      ticker: "AAPL",
      date: "5月2日",
      focus: "iPhone销售与回购力度",
    },
    {
      company: "微软",
      ticker: "MSFT",
      date: "5月3日",
      focus: "云业务增长与AI收入进展",
    },
    {
      company: "英伟达",
      ticker: "NVDA",
      date: "5月22日",
      focus: "AI算力需求与未来指引",
    },
    {
      company: "谷歌",
      ticker: "GOOGL",
      date: "4月26日",
      focus: "广告恢复、云业务与资本开支",
    },
    {
      company: "Meta",
      ticker: "META",
      date: "4月25日",
      focus: "广告效率与AI投入节奏",
    },
    {
      company: "特斯拉",
      ticker: "TSLA",
      date: "4月24日",
      focus: "交付、毛利率与新车型预期",
    },
    {
      company: "亚马逊",
      ticker: "AMZN",
      date: "5月1日",
      focus: "电商利润率与AWS增长",
    },
  ];

  const eventInterpretations = [
    {
      title: "非农就业数据",
      data: "新增就业 22.8万，高于预期 18万",
      logic: "就业强 → 经济韧性更强 → 降息压力下降",
      impact: "利率可能维持高位，对高估值科技股短期偏压制。",
    },
    {
      title: "CPI通胀数据",
      data: "同比 3.4%，高于预期 3.2%",
      logic: "通胀回落慢 → 美联储更谨慎 → 宽松预期降温",
      impact: "估值扩张受限，纳指短期更依赖盈利兑现而不是情绪推动。",
    },
    {
      title: "美联储利率决议",
      data: "维持 5.25%-5.50% 不变",
      logic: "符合预期 → 关键不在结果，而在会后措辞",
      impact: "短期中性，重点关注鲍威尔讲话是否偏鹰或偏鸽。",
    },
  ];

  const insights: InsightItem[] = [
    {
      title: "非农超预期",
      chain:
        "非农强于预期 → 经济韧性更强 → 降息预期降温 → 利率维持更久",
      impact: "对高估值资产形成压制，纳指短期承压概率上升。",
    },
    {
      title: "CPI低于预期",
      chain:
        "通胀回落 → 市场对降息预期升温 → 长端利率压力缓解 → 估值支撑增强",
      impact: "对纳指偏正面，尤其利好高估值科技股。",
    },
    {
      title: "美联储表态偏鹰",
      chain:
        "政策更偏谨慎 → 市场下修宽松预期 → 风险偏好回落 → 成长股估值收缩",
      impact: "短期中性偏空，关注随后鲍威尔措辞是否继续偏鹰。",
    },
  ];

  const getLevelTone = (level: EventItem["level"]) => {
    if (level === "高") {
      return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
    }
    if (level === "中") {
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
    }
    return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="mb-5 flex items-center gap-2">
          <CalendarDays size={17} strokeWidth={1.8} className="text-slate-500" />
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            未来30天关键事件
          </h2>
        </div>

        <div className="hidden overflow-hidden rounded-3xl border border-stone-200/80 bg-white lg:block">
          <div className="grid grid-cols-[0.9fr_1.6fr_0.7fr_0.9fr_0.9fr] gap-4 border-b border-stone-200/80 px-6 py-4 text-sm font-medium text-slate-500">
            <div>时间</div>
            <div>事件</div>
            <div>重要程度</div>
            <div>上次数值</div>
            <div>预期值</div>
          </div>

          {macroEvents.map((item, index) => (
            <div
              key={`${item.date}-${item.event}`}
              className={`grid grid-cols-[0.9fr_1.6fr_0.7fr_0.9fr_0.9fr] gap-4 px-6 py-5 text-sm ${
                index !== macroEvents.length - 1 ? "border-b border-stone-200/70" : ""
              }`}
            >
              <div className="text-slate-700">{item.date}</div>
              <div className="font-medium text-slate-900">{item.event}</div>
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${getLevelTone(
                    item.level
                  )}`}
                >
                  {item.level}
                </span>
              </div>
              <div className="text-slate-700">{item.previous}</div>
              <div className="text-slate-700">{item.expected}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {macroEvents.map((item) => (
            <div
              key={`${item.date}-${item.event}`}
              className="rounded-3xl border border-stone-200/80 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-400">{item.date}</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">
                    {item.event}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${getLevelTone(
                    item.level
                  )}`}
                >
                  {item.level}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-50 px-3 py-3">
                  <div className="text-slate-400">上次数值</div>
                  <div className="mt-1 font-medium text-slate-900">{item.previous}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 px-3 py-3">
                  <div className="text-slate-400">预期值</div>
                  <div className="mt-1 font-medium text-slate-900">{item.expected}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 sm:mt-16 sm:px-6">
      <div className="mb-5 flex items-center gap-2">
       <Sparkles size={17} strokeWidth={1.8} className="text-slate-500" />
       <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
      关键事件解读
      </h2>
      </div>

     <p className="mb-6 text-sm leading-7 text-slate-500">
    不只是看数据本身，更重要的是理解它对利率预期、估值和纳指节奏意味着什么。
     </p>

     <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
    {eventInterpretations.map((item) => (
      <div
        key={item.title}
        className="rounded-3xl border border-stone-200/80 bg-white p-6"
      >
        <div className="text-lg font-semibold text-slate-900">{item.title}</div>

        <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
          <div className="text-sm text-slate-400">数据</div>
          <div className="mt-2 text-sm leading-7 text-slate-700">
            {item.data}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-4">
          <div className="text-sm text-slate-400">解读</div>
          <div className="mt-2 text-sm leading-7 text-slate-700">
            {item.logic}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-4">
          <div className="text-sm text-slate-400">对纳指的影响</div>
          <div className="mt-2 text-sm leading-7 text-slate-700">
            {item.impact}
          </div>
        </div>
      </div>
    ))}
  </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 sm:mt-16 sm:px-6">
        <div className="mb-5 flex items-center gap-2">
          <FileText size={17} strokeWidth={1.8} className="text-slate-500" />
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            核心财报日历
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {earnings.map((item) => (
            <div
              key={item.ticker}
              className="rounded-3xl border border-stone-200/80 bg-white p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold text-slate-900">{item.ticker}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.company}</div>
                </div>

                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200">
                  {item.date}
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
                <div className="text-sm text-slate-400">关注点</div>
                <div className="mt-2 text-sm leading-7 text-slate-700">{item.focus}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 pb-16 sm:mt-16 sm:px-6 sm:pb-20">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles size={17} strokeWidth={1.8} className="text-slate-500" />
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            一句话逻辑解读
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {insights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-stone-200/80 bg-white p-6"
            >
              <div className="text-sm text-slate-400">{item.title}</div>
              <div className="mt-3 text-base font-medium leading-8 text-slate-900">
                {item.chain}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                {item.impact}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
