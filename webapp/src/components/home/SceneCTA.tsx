"use client";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function SceneCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="cta"
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ background: "#0F1020" }}
    >
      {/* Precision dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Brand focal glow — center */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "50%",
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Top/bottom structural lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.10), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.10), transparent)" }}
      />

      <div className="relative max-w-3xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-5">Participate</p>

          <h2 className="font-display text-4xl md:text-[3.75rem] font-extrabold text-white leading-[1.06] mb-6 tracking-tight">
            支援ではなく、
            <br />
            <span className="text-gradient">参加。</span>
          </h2>

          <p className="text-white/42 text-[0.95rem] leading-[1.85] mb-10 max-w-[480px] mx-auto">
            文化芸術の熱量を可視化し、あなたが応援したい表現との出会いをつくる。
            <br />
            A to B は、文化芸術への参加体験をつくるプラットフォームです。
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-base px-8 py-4 rounded-xl shadow-glow transition-all duration-200 active:scale-[0.98]"
            >
              プロジェクトを探す
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-400/40 text-white/55 hover:text-white bg-transparent font-semibold text-sm px-6 py-4 rounded-xl transition-all duration-200"
            >
              トレンドを見る
            </Link>
          </div>

          <p className="text-white/18 text-xs mt-10">無料で使える · 登録不要</p>
        </motion.div>
      </div>
    </section>
  );
}
