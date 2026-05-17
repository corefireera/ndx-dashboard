export type SubscribeStatus = "正常" | "限购" | "暂停";

export type EtfItem = {
  code: string;
  name: string;
  price: string;
  premium: number;
  scale: string;
  trackingError: string;
  subscribeStatus: SubscribeStatus;
  dailyLimit: string;
};

export const etfs: EtfItem[] = [
  {
    code: "513100",
    name: "国泰纳指100ETF",
    price: "1.623",
    premium: 0.8,
    scale: "260亿",
    trackingError: "0.28%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "513300",
    name: "华夏纳指100ETF",
    price: "1.214",
    premium: 1.6,
    scale: "220亿",
    trackingError: "0.32%",
    subscribeStatus: "限购",
    dailyLimit: "1000元",
  },
  {
    code: "159941",
    name: "广发纳指100ETF",
    price: "1.488",
    premium: 1.2,
    scale: "120亿",
    trackingError: "0.35%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "513110",
    name: "华泰柏瑞纳指100ETF",
    price: "1.267",
    premium: 0.9,
    scale: "90亿",
    trackingError: "0.31%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159659",
    name: "招商纳指100ETF",
    price: "1.392",
    premium: 2.4,
    scale: "60亿",
    trackingError: "0.45%",
    subscribeStatus: "限购",
    dailyLimit: "500元",
  },
  {
    code: "159660",
    name: "汇添富纳指100ETF",
    price: "1.305",
    premium: 1.9,
    scale: "50亿",
    trackingError: "0.42%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159696",
    name: "易方达纳指100ETF",
    price: "1.276",
    premium: 2.8,
    scale: "45亿",
    trackingError: "0.48%",
    subscribeStatus: "限购",
    dailyLimit: "500元",
  },
  {
    code: "159632",
    name: "华安纳指100ETF",
    price: "1.188",
    premium: 3.6,
    scale: "30亿",
    trackingError: "0.60%",
    subscribeStatus: "限购",
    dailyLimit: "300元",
  },
  {
    code: "159501",
    name: "嘉实纳指100ETF",
    price: "0.982",
    premium: 1.1,
    scale: "55亿",
    trackingError: "0.33%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159513",
    name: "大成纳指100ETF",
    price: "1.105",
    premium: 4.5,
    scale: "25亿",
    trackingError: "0.75%",
    subscribeStatus: "暂停",
    dailyLimit: "-",
  },
];

export const usdCny = "7.23";
