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
    price: "2.046",
    premium: 3.74,
    scale: "260亿",
    trackingError: "0.28%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "513300",
    name: "华夏纳指100ETF",
    price: "2.485",
    premium: 3.27,
    scale: "220亿",
    trackingError: "0.32%",
    subscribeStatus: "限购",
    dailyLimit: "1000元",
  },
  {
    code: "159941",
    name: "广发纳指100ETF",
    price: "1.514",
    premium: 2.23,
    scale: "120亿",
    trackingError: "0.35%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "513110",
    name: "华泰柏瑞纳指100ETF",
    price: "2.297",
    premium: 2.94,
    scale: "90亿",
    trackingError: "0.31%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159659",
    name: "招商纳指100ETF",
    price: "2.156",
    premium: 2.41,
    scale: "60亿",
    trackingError: "0.45%",
    subscribeStatus: "限购",
    dailyLimit: "500元",
  },
  {
    code: "159501",
    name: "嘉实纳指100ETF",
    price: "1.900",
    premium: 3.76,
    scale: "55亿",
    trackingError: "0.33%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159660",
    name: "汇添富纳指100ETF",
    price: "2.189",
    premium: 3.8,
    scale: "50亿",
    trackingError: "0.42%",
    subscribeStatus: "正常",
    dailyLimit: "不限",
  },
  {
    code: "159696",
    name: "易方达纳指100ETF",
    price: "1.885",
    premium: 3.7,
    scale: "45亿",
    trackingError: "0.48%",
    subscribeStatus: "限购",
    dailyLimit: "500元",
  },
  {
    code: "159632",
    name: "华安纳指100ETF",
    price: "2.269",
    premium: 2.74,
    scale: "30亿",
    trackingError: "0.60%",
    subscribeStatus: "限购",
    dailyLimit: "300元",
  },
  {
    code: "159513",
    name: "大成纳指100ETF",
    price: "1.689",
    premium: 3.76,
    scale: "25亿",
    trackingError: "0.75%",
    subscribeStatus: "暂停",
    dailyLimit: "-",
  },
];

export const usdCny = "7.23";
