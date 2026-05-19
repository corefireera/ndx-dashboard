"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
  `px-3 py-1.5 text-sm font-medium transition
   ${
     pathname === href
       ? "text-slate-950"
       : "text-slate-600 hover:text-slate-900"
   }`;

  const mobileLinkClass = (href: string) =>
  pathname === href
    ? "px-3 py-2 font-medium text-slate-950"
    : "px-3 py-2 font-medium text-slate-600 hover:text-slate-900";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#f5f5f7]">
      <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium tracking-tight text-slate-900"
        >
          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-slate-950 text-[9px] font-semibold leading-none text-white">
            N
          </span>
          <span>NDX100.COM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>首页</Link>
          <Link href="/constituents" className={linkClass("/constituents")}>成分股</Link>
          <Link href="/etf" className={linkClass("/etf")}>ETF</Link>
          <Link href="/news" className={linkClass("/news")}>资讯</Link>
          <Link href="/about" className={linkClass("/about")}>关于</Link>
        </nav>

        <button
          type="button"
          className="md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-900"
          onClick={() => setOpen(!open)}
          aria-label="打开菜单"
        >
          <span className="text-2xl leading-none">≡</span>
        </button>
      </div>


        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white">
           <div className="flex flex-col px-4 py-3 space-y-3 text-sm">
           <Link href="/" className={mobileLinkClass("/")} onClick={() => setOpen(false)}>
            首页
           </Link>
           <Link href="/constituents" className={mobileLinkClass("/constituents")} onClick={() => setOpen(false)}>
            成分股
           </Link>
           <Link href="/etf" className={mobileLinkClass("/etf")} onClick={() => setOpen(false)}>
            ETF
           </Link>
           <Link href="/news" className={mobileLinkClass("/news")} onClick={() => setOpen(false)}>
            资讯
           </Link>
           <Link href="/about" className={mobileLinkClass("/about")} onClick={() => setOpen(false)}>
            关于
           </Link>
           </div>
          </div>
        )}
    </header>

    
  );
}
