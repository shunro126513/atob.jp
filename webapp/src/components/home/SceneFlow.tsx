"use client";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, BarChart2, Heart, ExternalLink } from "lucide-react";

const STEPS = [
  { step: "01", icon: Search,      title: "探す",    desc: "複数プラットフォームを横断して気になるプロジェクトを見つける", badge: "A to B",  color: "#A78BFA" },
  { step: "02", icon: BarChart2,   title: "比較する", desc: "ヒートスコアで熱量を確認し、PF間の条件を比較する",           badge: "A to B",  color: "#60A5FA" },
  { step: "03", icon: Heart,       title: "応援する", desc: "A to B 上で1日1回の応援。ヒートスコアを後押しする",          badge: "A to B",  color: "#34D399" },
  { step: "04", icon: ExternalLink, title: "支援する", desc: "元のプラットフォームへ移動して、実際の支援・購入を行う",      badge: "元PF",    color: "#F97316", badgeVariant: "external" },
];

function StepCard({ s, index }: { s: typeof STEPS[0]; index: number }) {
  const reduce = useReducedMotion();
  const Icon = s.icon;
  const isExternal = s.badgeVariant === "external";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connecting line */}
      {index < STEPS.length - 1 && (
        <div className="hidden md:block absolute top-8 left-[calc(50%+30px)] w-[calc(100%-60px)] pointer-events-none">
          <motion.div
            className="h-px"
            style={{ background: `linear-gradient(90deg, ${s.color}50, ${STEPS[index + 1].color}35)` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.14 + 0.25, ease: "easeOut" }}
          />
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: "2.5px solid transparent",
              borderBottom: "2.5px solid transparent",
              borderLeft: `4px solid ${STEPS[index + 1].color}35`,
            }}
          />
        </div>
      )}

      {/* Icon */}
      <div
        className="relative w-13 h-13 rounded-xl flex items-center justify-center mb-4 border"
        style={{
          background: `${s.color}0D`,
          borderColor: `${s.color}20`,
          width: "52px",
          height: "52px",
        }}
      >
        <Icon className="w-5 h-5" style={{ color: s.color }} />
        <span
          className="absolute -top-2 -right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border"
          style={{ color: s.color, background: "#090A12", borderColor: `${s.color}35` }}
        >
          {s.step}
        </span>
      </div>

      {/* Badge */}
      <span
        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider ${
          isExternal
            ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
            : "bg-white/[0.04] text-white/32 border border-white/[0.08]"
        }`}
      >
        {s.badge}
      </span>

      <p className="font-display font-bold text-white text-sm mb-2">{s.title}</p>
      <p className="text-white/35 text-xs leading-[1.7] max-w-[145px]">{s.desc}</p>
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
      style={{ background: "#090A12" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.08), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-3">Action</p>
          <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-white leading-[1.1] mb-5">
            探す→比較する→応援する→
            <span className="text-gradient">支援する</span>
          </h2>
          <p className="text-white/38 text-sm max-w-lg mx-auto leading-[1.8]">
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
          transition={{ delay: 0.75 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/22" />
              <span className="text-[11px] text-white/38">ステップ1〜3: A to B 上で完結</span>
            </div>
            <div className="w-px h-4 bg-white/[0.09]" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
              <span className="text-[11px] text-white/38">ステップ4: 元のPFへ移動して支援</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
