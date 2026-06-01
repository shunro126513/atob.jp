"use client";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, BarChart2, Heart, ExternalLink } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "探す",
    desc: "複数プラットフォームを横断して気になるプロジェクトを見つける",
    badge: "A to B",
    color: "#a78bfa",
  },
  {
    step: "02",
    icon: BarChart2,
    title: "比較する",
    desc: "ヒートスコアで熱量を確認し、PF間の条件を比較する",
    badge: "A to B",
    color: "#38bdf8",
  },
  {
    step: "03",
    icon: Heart,
    title: "応援する",
    desc: "A to B 上で1日1回の応援。ヒートスコアを後押しする",
    badge: "A to B",
    color: "#fb7185",
  },
  {
    step: "04",
    icon: ExternalLink,
    title: "支援する",
    desc: "元のプラットフォームへ移動して、実際の支援・購入を行う",
    badge: "元PF",
    badgeVariant: "external",
    color: "#e8503a",
  },
];

function StepCard({ s, index }: { s: typeof STEPS[0]; index: number }) {
  const reduce = useReducedMotion();
  const Icon = s.icon;
  const isExternal = s.badgeVariant === "external";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connecting line (between cards) */}
      {index < STEPS.length - 1 && (
        <div className="hidden md:block absolute top-9 left-[calc(50%+32px)] w-[calc(100%-64px)] pointer-events-none">
          <motion.div
            className="h-px"
            style={{ background: `linear-gradient(90deg, ${s.color}60, ${STEPS[index + 1].color}40)` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: "easeOut" }}
          />
          {/* Arrow head */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: "3px solid transparent",
              borderBottom: "3px solid transparent",
              borderLeft: `5px solid ${STEPS[index + 1].color}40`,
            }}
          />
        </div>
      )}

      {/* Icon circle */}
      <motion.div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border"
        style={{
          background: `${s.color}10`,
          borderColor: `${s.color}25`,
          boxShadow: `0 0 20px ${s.color}15`,
        }}
        whileInView={reduce ? {} : { boxShadow: [`0 0 10px ${s.color}10`, `0 0 24px ${s.color}25`, `0 0 10px ${s.color}10`] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        viewport={{ once: false }}
      >
        <Icon className="w-7 h-7" style={{ color: s.color }} />
        {/* Step number */}
        <span
          className="absolute -top-2.5 -right-2.5 text-[9px] font-black px-1.5 py-0.5 rounded-full border"
          style={{ color: s.color, background: "#0A0A10", borderColor: `${s.color}40` }}
        >
          {s.step}
        </span>
      </motion.div>

      {/* Badge */}
      <span
        className={`text-[9px] font-black px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider ${
          isExternal
            ? "bg-brand-500/15 text-brand-400 border border-brand-500/30"
            : "bg-white/[0.05] text-white/40 border border-white/10"
        }`}
      >
        {s.badge}
      </span>

      <p className="font-display font-bold text-white text-lg mb-2">{s.title}</p>
      <p className="text-white/40 text-xs leading-relaxed max-w-[160px]">{s.desc}</p>
    </motion.div>
  );
}

export default function SceneFlow() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="flow"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "#080B14" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(56,189,248,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-white/30 uppercase tracking-[0.15em] mb-4">Action</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            探す→比較する→応援する→
            <span className="text-gradient">支援する</span>
          </h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto">
            A to B は「探す・比較する・応援する」の場所です。実際の支援・購入は元のプラットフォームで行います。
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
          {STEPS.map((s, i) => (
            <StepCard key={s.step} s={s} index={i} />
          ))}
        </div>

        {/* Clarification note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/25" />
              <span className="text-[11px] text-white/40">ステップ1〜3: A to B 上で完結</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-500/70" />
              <span className="text-[11px] text-white/40">ステップ4: 元のPFへ移動して支援</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
