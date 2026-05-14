import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AskNdxAssistant from "@/components/ask-ndx-assistant";
import SiteHeader from "@/components/site-header";
import { getMarketData } from "@/lib/market";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NDX100观察",
  description: "面向中国投资者的纳指结构化观察工具",
  icons: {
    icon: [
      { url: "/favicon.ico?v=n", sizes: "any" },
      { url: "/icon.png?v=n", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=n",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const marketData = await getMarketData();
  const index = marketData.index;
  const stripPrice = index
    ? index.price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "--";
  const stripChange = index
    ? `${index.changesPercentage >= 0 ? "+" : ""}${index.changesPercentage.toFixed(2)}%`
    : "--";
  const stripChangeClass =
    index && index.changesPercentage < 0 ? "text-rose-600" : "text-green-600";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-24">
        <SiteHeader/>
        <div className="fixed top-16 left-0 right-0 z-40 border-b border-slate-100 bg-slate-50/70 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-2 flex items-center justify-between text-xs text-slate-600">
            
            <div className="flex items-center gap-3">
              <span>纳指</span>
              <span className="font-medium text-slate-900">{stripPrice}</span>
              <span className={stripChangeClass}>{stripChange}</span>
            </div>

            <div>情绪：中性</div>

            <div>阶段：震荡</div>

          </div>
        </div>
        {children}
        <AskNdxAssistant />
      </body>
    </html>
  );
}
