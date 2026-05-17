import { usdCny as fallbackUsdCny } from "@/data/etfs";

type FrankfurterLatestResponse = {
  date?: string;
  rates?: {
    CNY?: number;
  };
};

export type FxRate = {
  value: string;
  date?: string;
  source: "live" | "fallback";
};

const USD_CNY_URL = "https://api.frankfurter.dev/v1/latest?base=USD&symbols=CNY";

export async function getUsdCnyRate(): Promise<FxRate> {
  try {
    const response = await fetch(USD_CNY_URL, {
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["usd-cny-rate"],
      },
    });

    if (!response.ok) {
      throw new Error(`Frankfurter responded with ${response.status}`);
    }

    const data = (await response.json()) as FrankfurterLatestResponse;
    const rate = data.rates?.CNY;

    if (typeof rate !== "number" || !Number.isFinite(rate)) {
      throw new Error("Frankfurter response did not include USD/CNY.");
    }

    return {
      value: rate.toFixed(2),
      date: data.date,
      source: "live",
    };
  } catch (error) {
    console.warn("Using local USD/CNY fallback.", error);

    return {
      value: fallbackUsdCny,
      source: "fallback",
    };
  }
}
