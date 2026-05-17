import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AskNdxAssistant from "@/components/ask-ndx-assistant";
import SiteHeader from "@/components/site-header";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#f5f5f7] antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f5f7] pt-14">
        <SiteHeader/>
        {children}
        <AskNdxAssistant />
      </body>
    </html>
  );
}
