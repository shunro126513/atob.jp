"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "/projects",  label: "プロジェクト" },
  { href: "/trending",  label: "トレンド" },
  { href: "/compare",   label: "PF比較" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-canvas-card/90 backdrop-blur-xl border-b border-brand-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo size="sm" useImage={false} />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-ink/70
                         hover:text-brand-600 hover:bg-brand-50 transition-all"
            >
              {label}
            </Link>
          ))}
          <Link href="/trending"
            className="ml-2 btn-primary !py-2 !px-4 !text-sm">
            🔥 今熱い
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg text-ink/60 hover:bg-brand-50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-canvas-card border-t border-brand-100 px-5 py-3 flex flex-col gap-1 animate-fade-in">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-ink/70 hover:bg-brand-50 hover:text-brand-600 transition-colors">
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
