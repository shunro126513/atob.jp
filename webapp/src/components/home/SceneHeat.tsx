"use client";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { HeatRingLarge } from "@/components/visuals/HeatRing";
import type { Project } from "@/types";
import { calcDaysLeft, formatAmount } from "@/lib/projects";
import { ArrowRight, Users, Clock, TrendingUp } from "lucide-react";

const HEAT_FACTORS = [
  { label: "支援額の伸び", weight: "30%", color: "#e8503a" },
  { label: "累計支援額",   weight: "30%", color: "#f97316" },
  { label: "SNS注目度",   weight: "20%", color: "#fb923c" },
  { label: "達成率の伸び", weight: "20%", color: "#fdba74" },
];

function HeatProjectCard({ project, rank, delay = 0 }: { project: Project; rank: number; delay?: number }) {
  const reduce = useReducedMotion();
  const achievement = Math.min(Math.round(project.achievement_rate), 999);
  const daysLeft = calcDaysLeft(project.end_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <Link href={`/projects/${project.id}`} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-2xl">
        <div
          className={`relative rounded-2xl overflow-hidden border transition-all duration-300 group-hover:border-brand-500/40 ${rank === 0 ? "border-brand-500/25 bg-gradient-to-br from-brand-500/8 to-transparent" : "border-white/[0.08] bg-white/[0.03]"}`}
          style={{ backdropFilter: "blur(16px)" }}
        >
          {/* Rank indicator */}
          {rank === 0 && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
          )}

          <div className="p-6">
            {/* Top: rank + heat ring */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <HeatRingLarge score={project.heat_score} rank={rank} />
                {project.platforms && (
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    {project.platforms.name}
                  </span>
                )}
              </div>
              {rank === 0 && (
                <span className="text-[10px] font-black text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  TOP
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-white text-sm leading-snug mb-4 line-clamp-2 group-hover:text-brand-300 transition-colors">
              {project.title}
            </h3>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs text-white/40">{formatAmount(project.current_amount)}</span>
                <span className="font-display font-black text-brand-400 text-sm">{achievement}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(achievement, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-white/35">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {project.backers_count.toLocaleString()}人
              </span>
              {daysLeft !== null && (
                <span className={`flex items-center gap-1 ${daysLeft <= 3 && daysLeft > 0 ? "text-brand-400" : ""}`}>
                  <Clock className="w-3 h-3" />
                  {daysLeft > 0 ? `残り${daysLeft}日` : "終了"}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface Props {
  trending: Project[];
}

export default function SceneHeat({ trending }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const top3 = trending.slice(0, 3);

  return (
    <section
      id="heat"
      ref={ref}
      className="relative min-h-[100svh] flex items-center py-24 overflow-hidden"
      style={{ background: "#0F0A0A" }}
    >
      {/* Heat glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(232,80,58,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 20%, rgba(249,115,22,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <p className="text-xs font-bold text-brand-400/70 uppercase tracking-[0.15em] mb-4">Heat</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight">
              今、熱が生まれている
              <br />
              <span className="text-gradient">場所がある</span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-md">
              ヒートスコアは支援の勢い・達成率・SNS注目度を独自に統合した数値です
            </p>
          </div>
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-brand-400 font-medium transition-colors whitespace-nowrap"
          >
            すべてのトレンドを見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Heat factors mini-explanation */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {HEAT_FACTORS.map(({ label, weight, color }) => (
            <div key={label} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              <span className="text-xs text-white/60">{label}</span>
              <span className="text-xs font-black" style={{ color }}>{weight}</span>
            </div>
          ))}
        </motion.div>

        {/* Top 3 grid */}
        {top3.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {top3.map((p, i) => (
              <HeatProjectCard key={p.id} project={p} rank={i} delay={i * 0.1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-white/30 text-sm">
            現在表示できるトレンドプロジェクトがありません
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-brand-500/40 text-white/50 hover:text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:bg-white/[0.03]"
          >
            <TrendingUp className="w-4 h-4" />
            ヒートスコアランキングを見る
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
