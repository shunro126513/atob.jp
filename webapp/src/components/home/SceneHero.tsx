"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowDown } from "lucide-react";

const FloatingCards = dynamic(() => import("@/components/hero/FloatingCards"), { ssr: false });

export default function SceneHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
      style={{ background: "#0A0A10" }}
    >
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 65% 45%, rgba(232,80,58,0.10) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(167,139,250,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Perspective grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.028]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Depth glow dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "15%", y: "20%", size: 3, color: "rgba(167,139,250,0.5)" },
          { x: "80%", y: "15%", size: 2, color: "rgba(232,80,58,0.4)" },
          { x: "70%", y: "75%", size: 2.5, color: "rgba(56,189,248,0.3)" },
          { x: "25%", y: "65%", size: 2, color: "rgba(251,191,36,0.3)" },
          { x: "90%", y: "50%", size: 1.5, color: "rgba(52,211,153,0.3)" },
          { x: "45%", y: "88%", size: 2, color: "rgba(232,80,58,0.25)" },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ left: dot.x, top: dot.y, width: dot.size * 2, height: dot.size * 2, background: dot.color }}
            animate={reduce ? {} : { opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-5 py-20 md:py-0 grid md:grid-cols-2 gap-10 items-center relative">
        {/* Left: Text */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span className="text-xs font-bold text-white/50 uppercase tracking-[0.15em]">
              文化芸術の支援先を、一箇所で
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[2.8rem] md:text-[3.6rem] font-black leading-[1.04] mb-6 tracking-tight"
          >
            <span className="text-white">いま熱が生まれている</span>
            <br />
            <span className="text-white">文化芸術に、</span>
            <br />
            <span className="text-gradient">参加できる</span>
            <span className="text-white">。</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/45 text-base md:text-lg leading-relaxed mb-9 max-w-md"
          >
            CAMPFIRE・Bandcamp・READYFOR など複数プラットフォームのプロジェクトを横断比較。
            独自のヒートスコアで、今一番熱いプロジェクトがわかる。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-glow-sm hover:shadow-glow transition-all duration-200 active:scale-95"
            >
              プロジェクトを探す
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-brand-400/60 text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200"
            >
              今熱い支援を見る
            </Link>
          </motion.div>

          {/* Trust metrics inline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {[
              { val: "40+", label: "プロジェクト" },
              { val: "5",   label: "連携PF" },
              { val: "無料", label: "で使える" },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="font-display text-xl font-black text-brand-400">{val}</span>
                <span className="text-xs text-white/35 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex justify-center items-center"
        >
          <FloatingCards />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
