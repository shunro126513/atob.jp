"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const NAV = [
  { href: "/projects",  label: "プロジェクト" },
  { href: "/trending",  label: "トレンド" },
  { href: "/compare",   label: "PF比較" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(232,80,58,0.08),0_4px_24px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <Logo size="sm" variant={scrolled ? "dark" : "light"} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all group
                ${scrolled
                  ? "text-ink/70 hover:text-brand-600 hover:bg-brand-50"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
            >
              {label}
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
            </Link>
          ))}
          <Link
            href="/projects"
            className="ml-3 inline-flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-glow-sm hover:shadow-glow transition-all active:scale-95"
          >
            プロジェクトを探す
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors
            ${scrolled ? "text-ink/60 hover:bg-brand-50" : "text-white/80 hover:bg-white/10"}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
        >
          {open
            ? <X className="w-5 h-5" />
            : <Menu className="w-5 h-5" />
          }
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-brand-100/60`}
      >
        <div className="px-5 py-3 flex flex-col gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-ink/70 hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="mt-1 btn-primary text-sm !py-2.5 text-center"
          >
            プロジェクトを探す
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
