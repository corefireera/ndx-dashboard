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
      date: "5月28日",
      event: "PCE物价与个人支出",
      level: "高",
      previous: "3月数据",
      expected: "关注核心PCE",
    },
    {
      date: "5月28日",
      event: "美国一季度GDP二次估计",
      level: "中",
      previous: "初值",
      expected: "二次估计",
    },
    {
      date: "6月5日",
      event: "非农就业数据",
      level: "高",
      previous: "4月就业",
      expected: "关注就业降温",
    },
    {
      date: "6月10日",
      event: "CPI通胀数据",
      level: "高",
      previous: "4月CPI",
      expected: "关注核心通胀",
    },
    {
      date: "6月11日",
      event: "PPI生产者价格指数",
      level: "中",
      previous: "4月PPI",
      expected: "观察成本压力",
    },
    {
      date: "6月16-17日",
      event: "美联储利率决议与点阵图",
      level: "高",
      previous: "当前目标区间",
      expected: "关注点阵图",
    },
  ];

  const earnings: EarningsItem[] = [
    {
      company: "英伟达",
      ticker: "NVDA",
      date: "5月20日",
      focus: "数据中心收入、Blackwell/Rubin需求、毛利率和下季指引",
    },
    {
      company: "Intuit",
      ticker: "INTU",
      date: "5月20日",
      focus: "税务季表现、中小企业软件、Credit Karma与AI助手渗透",
    },
    {
      company: "Costco",
      ticker: "COST",
      date: "5月28日",
      focus: "同店销售、会员续费率、消费韧性和毛利率变化",
    },
    {
      company: "Palo Alto Networks",
      ticker: "PANW",
      date: "6月2日",
      focus: "安全平台化、RPO增长、CyberArk整合和全年指引",
    },
    {
      company: "Broadcom",
      ticker: "AVGO",
      date: "6月3日",
      focus: "AI网络芯片、定制加速器、VMware整合和下季指引",
    },
    {
      company: "Adobe",
      ticker: "ADBE",
      date: "6月11日",
      focus: "AI功能变现、Creative Cloud续费、数字媒体ARR和全年指引",
    },
  ];

  const eventInterpretations = [
    {
      title: "PCE与GDP",
      data: "5月28日同时公布PCE物价、个人支出和一季度GDP二次估计",
      logic: "通胀与消费韧性 → 利率预期变化 → 估值折现率变化",
      impact: "如果核心PCE偏强，利率压力可能重新抬升；如果消费和企业利润走弱，盈利预期会成为更大变量。",
    },
    {
      title: "非农与CPI",
      data: "6月5日非农就业，6月10日CPI通胀数据",
      logic: "就业与通胀决定降息空间 → 影响美债收益率 → 影响成长股估值",
      impact: "就业过强或核心通胀偏黏，都会压制纳指估值扩张；反之有利于风险偏好修复。",
    },
    {
      title: "美联储利率决议",
      data: "6月16-17日FOMC会议，并更新点阵图",
      logic: "政策声明与点阵图 → 市场重定价降息路径 → 影响风险资产节奏",
      impact: "若点阵图释放更谨慎信号，科技股可能承压；若降息路径更清晰，估值支撑会增强。",
    },
  ];

  const insights: InsightItem[] = [
    {
      title: "通胀偏强",
      chain:
        "PCE/CPI高于预期 → 降息节奏后移 → 美债收益率上行 → 成长股估值承压",
      impact: "对纳指偏负面，尤其压制高估值、远期盈利占比高的科技股。",
    },
    {
      title: "就业降温",
      chain:
        "就业放缓 → 经济降温确认 → 降息预期升温 → 同时观察盈利预期",
      impact: "温和降温有利估值修复，若衰退担忧升温，则会压制风险偏好。",
    },
    {
      title: "点阵图偏鹰",
      chain:
        "降息预期下修 → 利率维持更久 → 风险偏好回落 → 成长股估值收缩",
      impact: "短期偏压制，重点看会后声明和发布会是否继续强化谨慎信号。",
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
