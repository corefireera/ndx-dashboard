import { etfs, type EtfItem } from "@/data/etfs";
import { getUsdCnyRate } from "@/lib/fx";
import { CircleAlert, Globe2, WalletCards } from "lucide-react";

export default async function EtfPage() {
  const usdCnyRate = await getUsdCnyRate();

  const getPremiumTone = (premium: number) => {
    if (premium < 1) {
      return {
        text: "正常",
        className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      };
    }
    if (premium < 3) {
      return {
        text: "偏高",
        className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
      };
    }
    return {
      text: "高风险",
      className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    };
  };

  const getStatusTone = (status: EtfItem["subscribeStatus"]) => {
    if (status === "正常") {
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
    }
    if (status === "限购") {
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
    }
    return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="mb-5 flex items-center gap-2">
          <WalletCards size={17} strokeWidth={1.8} className="text-slate-500" />
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            国内ETF总览
          </h2>
        </div>

        {/* 桌面端表格 */}
        <div className="hidden overflow-hidden rounded-3xl border border-stone-200/80 bg-white lg:block">
          <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.95fr_0.95fr_0.8fr_0.8fr] gap-4 border-b border-stone-200/80 px-6 py-4 text-sm font-medium text-slate-500">
            <div>基金代码 + 名称</div>
            <div>实时价格</div>
            <div>溢价率</div>
            <div>基金规模</div>
            <div>跟踪误差</div>
            <div>申购状态</div>
            <div>单日限额</div>
          </div>

          {etfs.map((etf, index) => {
            const premiumTone = getPremiumTone(etf.premium);
            return (
              <div
                key={etf.code}
                className={`grid grid-cols-[1.6fr_0.8fr_0.8fr_0.95fr_0.95fr_0.8fr_0.8fr] gap-4 px-6 py-5 text-sm ${
                  index !== etfs.length - 1 ? "border-b border-stone-200/70" : ""
                }`}
              >
                <div>
                  <div className="text-base font-semibold text-slate-900">{etf.code}</div>
                  <div className="mt-1 text-slate-500">{etf.name}</div>
                </div>

                <div className="font-medium text-slate-900">{etf.price}</div>

                <div>
                  <div className="font-medium text-slate-900">{etf.premium}%</div>
                  <div
                    className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs ${premiumTone.className}`}
                  >
                    {premiumTone.text}
                  </div>
                </div>

                <div className="text-slate-700">{etf.scale}</div>
                <div className="text-slate-700">{etf.trackingError}</div>

                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${getStatusTone(
                      etf.subscribeStatus
                    )}`}
                  >
                    {etf.subscribeStatus}
                  </span>
                </div>

                <div className="text-slate-700">{etf.dailyLimit}</div>
              </div>
            );
          })}
        </div>

        {/* 移动端卡片 */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {etfs.map((etf) => {
            const premiumTone = getPremiumTone(etf.premium);
            return (
              <div
                key={etf.code}
                className="rounded-3xl border border-stone-200/80 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-slate-900">{etf.code}</div>
                    <div className="mt-1 text-sm text-slate-500">{etf.name}</div>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${getStatusTone(
                      etf.subscribeStatus
                    )}`}
                  >
                    {etf.subscribeStatus}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">实时价格</div>
                    <div className="mt-1 font-medium text-slate-900">{etf.price}</div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">溢价率</div>
                    <div className="mt-1 font-medium text-slate-900">{etf.premium}%</div>
                    <div
                      className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs ${premiumTone.className}`}
                    >
                      {premiumTone.text}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">基金规模</div>
                    <div className="mt-1 font-medium text-slate-900">{etf.scale}</div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">跟踪误差</div>
                    <div className="mt-1 font-medium text-slate-900">
                      {etf.trackingError}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="text-slate-400">单日限额</div>
                    <div className="mt-1 font-medium text-slate-900">{etf.dailyLimit}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-7 max-w-6xl px-4 pb-16 sm:mt-8 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-7">
            <div className="mb-3 flex items-center gap-2">
              <CircleAlert size={17} strokeWidth={1.8} className="text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                买入前重点看什么
              </h3>
            </div>

            <div className="space-y-3 text-sm leading-7 text-slate-600">
              <p>
                对中国投资者来说，除指数方向外，还要看溢价、可买性、规模和跟踪误差。
              </p>
              <p>
                溢价越高，场内买入成本越高；申购状态影响可买性，拥挤时更容易限购或暂停。
              </p>
              <p>
                规模影响流动性，跟踪误差反映贴合度。
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-7">
            <div className="mb-3 flex items-center gap-2">
              <Globe2 size={17} strokeWidth={1.8} className="text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-900">
                汇率提示
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4">
              <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                <span>USD/CNY</span>
                <span>日更参考</span>
              </div>
              <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {usdCnyRate.value}
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              汇率会影响你的最终收益，但不决定纳指100本身的走势。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
