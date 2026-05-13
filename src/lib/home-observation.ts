import type {
  MacroIndicator,
  ValuationSnapshot,
} from "@/data/home-observation";

type IndexSnapshot = {
  symbol: string;
  changesPercentage: number;
} | null;

export function getIndexCardTitle(index: IndexSnapshot) {
  if (index?.symbol === "QQQ") {
    return "纳指100ETF参考（QQQ）";
  }

  return "纳斯达克100指数";
}

export function buildMarketConclusion({
  index,
  macroIndicators,
  valuation,
}: {
  index: IndexSnapshot;
  macroIndicators: MacroIndicator[];
  valuation: ValuationSnapshot;
}) {
  const us10y = macroIndicators.find((item) => item.key === "us10y");
  const vix = macroIndicators.find((item) => item.key === "vix");
  const messages: string[] = [];

  if (valuation.percentile10y >= 85) {
    messages.push("估值处于高位区间");
  } else if (valuation.percentile10y >= 75) {
    messages.push("估值处于中高位区间");
  } else {
    messages.push(`估值处于${valuation.zone}区间`);
  }

  if (us10y && (us10y.stateTone === "warning" || us10y.change > 0)) {
    messages.push("美债收益率仍有压力");
  }

  if (vix && toNumber(vix.value) < 16 && index && index.changesPercentage > 1.5) {
    messages.push("短期追高风险上升");
  }

  if (vix && vix.change > 0 && index && index.changesPercentage < 0) {
    messages.push("波动风险上升，适合控制仓位");
  }

  return {
    status: "适合观察",
    desc: `${messages.join("，")}。当前更适合等待更好的风险收益比，不适合一次性重仓追高。`,
  };
}

function toNumber(value: string) {
  const normalized = value.replace("%", "");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}
