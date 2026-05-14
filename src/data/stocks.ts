export type NdxStock = {
  symbol: string;
  name: string;
  role: string;
  themes: string[];
  risks: string[];
};

export const ndxStocks: NdxStock[] = [
  {
    symbol: "AAPL",
    name: "苹果",
    role: "消费电子、服务生态和高端硬件需求的观察窗口。",
    themes: ["iPhone 周期", "服务收入", "端侧 AI", "供应链效率"],
    risks: ["硬件换机周期放缓", "监管压力", "中国市场竞争"],
  },
  {
    symbol: "MSFT",
    name: "微软",
    role: "企业软件、云计算和 AI 基础设施的核心权重。",
    themes: ["Azure", "Copilot", "企业软件续费", "AI 算力资本开支"],
    risks: ["云增长放缓", "AI 投入回报周期", "估值消化"],
  },
  {
    symbol: "NVDA",
    name: "英伟达",
    role: "AI 算力周期和数据中心资本开支的高敏感度代表。",
    themes: ["GPU 需求", "数据中心", "AI 训练与推理", "毛利率"],
    risks: ["供需错配", "客户集中", "竞争芯片", "出口限制"],
  },
  {
    symbol: "AMZN",
    name: "亚马逊",
    role: "电商消费、云服务 AWS 和广告业务的混合观察对象。",
    themes: ["AWS", "广告收入", "物流效率", "消费韧性"],
    risks: ["云竞争", "零售利润率", "监管与反垄断"],
  },
  {
    symbol: "META",
    name: "Meta",
    role: "社交广告、推荐算法和 AI 内容分发效率的代表。",
    themes: ["广告周期", "AI 推荐", "Reels", "资本开支"],
    risks: ["广告景气波动", "隐私监管", "元宇宙投入不确定"],
  },
  {
    symbol: "GOOGL",
    name: "谷歌",
    role: "搜索广告、YouTube、云服务和 AI 搜索转型的核心公司。",
    themes: ["搜索广告", "YouTube", "Google Cloud", "AI 搜索"],
    risks: ["搜索份额变化", "反垄断", "AI 产品商业化节奏"],
  },
  {
    symbol: "AVGO",
    name: "博通",
    role: "半导体、网络芯片和企业软件现金流的组合代表。",
    themes: ["AI 网络芯片", "VMware 整合", "现金流", "数据中心需求"],
    risks: ["并购整合", "客户集中", "周期性库存"],
  },
  {
    symbol: "TSLA",
    name: "特斯拉",
    role: "电动车需求、自动驾驶预期和高波动成长股风险偏好的代表。",
    themes: ["交付量", "毛利率", "FSD", "储能"],
    risks: ["价格战", "需求波动", "监管安全", "估值波动"],
  },
];
