export type ResearchPrompt = {
  id: string;
  question: string;
  scope: "home" | "constituents" | "etf" | "news";
};

export const researchPrompts: ResearchPrompt[] = [
  {
    id: "market-status",
    question: "今天纳指整体状态怎么样？",
    scope: "home",
  },
  {
    id: "home-valuation",
    question: "当前估值适合加仓吗？",
    scope: "home",
  },
  {
    id: "home-risks",
    question: "现在主要风险在哪里？",
    scope: "home",
  },
  {
    id: "nvda-valuation",
    question: "NVDA现在估值贵吗？",
    scope: "constituents",
  },
  {
    id: "meta-strength",
    question: "META最近表现为什么强？",
    scope: "constituents",
  },
  {
    id: "constituents-ai-chain",
    question: "AI主线下哪几只最值得关注？",
    scope: "constituents",
  },
  {
    id: "etf-513100-513300",
    question: "513100和513300哪个更适合买？",
    scope: "etf",
  },
  {
    id: "etf-premium",
    question: "现在溢价率高，还能买吗？",
    scope: "etf",
  },
  {
    id: "etf-limit",
    question: "限购状态下怎么处理？",
    scope: "etf",
  },
  {
    id: "news-events",
    question: "未来30天最重要的事件是什么？",
    scope: "news",
  },
  {
    id: "news-nvda-earnings",
    question: "NVDA 财报重点看什么？",
    scope: "news",
  },
  {
    id: "news-cpi-fed",
    question: "CPI 和美联储会怎样影响纳指？",
    scope: "news",
  },
];
