"use client";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

function BackgroundOrbs() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(232,80,58,0.15) 0%, transparent 70%)", filter: "blur(40px)" }}
        animate={reduce ? {} : { scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Abstract floating cards convergence - decorative */}
      {[
        { x: "5%",  y: "20%", rotate: -12, delay: 0 },
        { x: "85%", y: "15%", rotate: 8,   delay: 0.3 },
        { x: "10%", y: "70%", rotate: -6,  delay: 0.6 },
        { x: "80%", y: "72%", rotate: 10,  delay: 0.9 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-28 h-16 rounded-xl border border-white/[0.05] bg-white/[0.02]"
          style={{ left: pos.x, top: pos.y, rotate: pos.rotate }}
          animate={reduce ? {} : {
            x: [0, (50 - Number(pos.x.replace("%", ""))) * 0.3, 0],
            y: [0, (50 - Number(pos.y.replace("%", ""))) * 0.3, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
        />
      ))}
    </div>
  );
}

export default function SceneCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="cta"
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ background: "#0A0A10" }}
    >
      <BackgroundOrbs />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Arc decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full opacity-[0.07]" viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path d="M0 300 Q720 50 1440 300" stroke="#e8503a" strokeWidth="2" fill="none" />
          <path d="M0 300 Q720 100 1440 300" stroke="#e8503a" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-bold text-brand-400/60 uppercase tracking-[0.15em] mb-8">Participate</p>

          <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-[1.05] mb-8 tracking-tight">
            支援ではなく、
            <br />
            <span className="text-gradient">参加。</span>
          </h2>

          <p className="text-white/40 text-base leading-relaxed mb-12 max-w-lg mx-auto">
            文化芸術の熱量を可視化し、あなたが応援したい表現との出会いをつくる。
            <br />
            A to B は、文化芸術への参加体験をつくるプラットフォームです。
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-glow transition-all duration-200 active:scale-95"
            >
              プロジェクトを探す
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/60 hover:text-white bg-transparent font-semibold text-sm px-6 py-4 rounded-2xl transition-all duration-200"
            >
              トレンドを見る
            </Link>
          </div>

          <p className="text-white/20 text-xs mt-10">無料で使える · 登録不要</p>
        </motion.div>
      </div>
    </section>
  );
}
