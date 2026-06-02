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
      style={{ background: "#090A12" }}
    >
      {/* Precision dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Brand focal glow — top-right, single source */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-5%",
          width: "55%",
          height: "70%",
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.10) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle left accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          left: "-5%",
          width: "35%",
          height: "40%",
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.05) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Structural border line — horizontal rule */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "72px",
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.12) 30%, rgba(99,102,241,0.12) 70%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-5 py-20 md:py-0 grid md:grid-cols-2 gap-10 items-center relative">
        {/* Left: Text */}
        <div className="relative z-10">
          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-brand-500/20 bg-brand-500/[0.07]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500" />
            </span>
            <span className="text-[11px] font-bold text-brand-300/80 uppercase tracking-[0.14em]">
              文化芸術の支援先を、一箇所で
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[2.5rem] md:text-[3.2rem] font-extrabold leading-[1.08] mb-7 tracking-tight"
          >
            <span className="text-white">いま熱が生まれている文化芸術に、</span>
            <br />
            <span className="text-gradient">参加できる</span>
            <span className="text-white">。</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/48 text-sm md:text-base leading-[1.8] mb-8 max-w-[420px]"
          >
            CAMPFIRE・Bandcamp・READYFOR など複数プラットフォームの
            プロジェクトを横断比較。独自のヒートスコアで、今一番熱いプロジェクトがわかる。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-glow-sm hover:shadow-glow transition-all duration-200 active:scale-[0.98]"
            >
              プロジェクトを探す
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-400/40 text-white/55 hover:text-white bg-white/[0.03] hover:bg-brand-500/[0.07] font-semibold text-sm px-6 py-3.5 rounded-lg transition-all duration-200"
            >
              今熱い支援を見る
            </Link>
          </motion.div>

          {/* Trust metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-8 mt-10 pt-6 border-t border-white/[0.06]"
          >
            {[
              { val: "40+", label: "プロジェクト" },
              { val: "5",   label: "連携PF" },
              { val: "無料", label: "で使える" },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-baseline gap-1">
                <span className="font-display text-lg font-extrabold text-brand-400">{val}</span>
                <span className="text-[11px] text-white/32 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
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
          animate={reduce ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/18" />
        </motion.div>
      </motion.div>
    </section>
  );
}
