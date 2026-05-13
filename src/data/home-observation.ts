export type MacroIndicator = {
  key: "vix" | "us10y" | "dxy";
  label: string;
  symbol: string;
  value: string;
  change: number;
  state: string;
  stateTone: "neutral" | "warning" | "risk";
};

export type ValuationMetric = {
  label: string;
  value: string;
};

export type ValuationSnapshot = {
  peTtm: number;
  percentile10y: number;
  zone: string;
  median10y: number;
  summary: string;
  metrics: ValuationMetric[];
};

export const macroIndicators: MacroIndicator[] = [
  {
    key: "vix",
    label: "恐慌指数",
    symbol: "VIX",
    value: "18.2",
    change: -3.1,
    state: "中性",
    stateTone: "neutral",
  },
  {
    key: "us10y",
    label: "利率水平",
    symbol: "美债10Y",
    value: "4.21%",
    change: 0.05,
    state: "偏压制",
    stateTone: "warning",
  },
  {
    key: "dxy",
    label: "美元强弱",
    symbol: "美元指数",
    value: "104.3",
    change: -0.2,
    state: "偏压制",
    stateTone: "warning",
  },
];

export const valuationSnapshot: ValuationSnapshot = {
  peTtm: 28.4,
  percentile10y: 78,
  zone: "中高位",
  median10y: 22.5,
  summary:
    "当前估值处于中高位区间，后续更适合观察盈利兑现、利率变化和风险偏好的配合。",
  metrics: [
    { label: "当前 PE(TTM)", value: "28.4" },
    { label: "近10年历史分位", value: "78%" },
    { label: "当前区间", value: "中高位" },
    { label: "近10年中位数", value: "22.5" },
  ],
};

export const updateNotes = [
  "行情数据：每日美股收盘后更新，后续可升级为 15 分钟延迟",
  "宏观数据：每日美股收盘后更新，仅用于市场环境观察。",
  "估值数据：每周更新，仅用于结构观察",
  "成分股权重：定期更新",
  "本页面仅用于市场结构观察，不构成投资建议",
];
