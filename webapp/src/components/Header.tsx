"use client";
import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/projects",  label: "プロジェクト" },
  { href: "/trending",  label: "🔥 トレンド" },
  { href: "/compare",   label: "PF比較" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm group-hover:shadow-glow transition-shadow">
            <span className="text-white text-xs font-black tracking-tighter">AB</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-extrabold text-gray-900 tracking-tight">A to B</span>
            <span className="hidden sm:block text-[10px] text-gray-400 font-medium mt-0.5">文化芸術支援比較</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-600
                         hover:text-brand-600 hover:bg-brand-50 transition-all"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
