"use client";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { HeatRingLarge } from "@/components/visuals/HeatRing";
import type { Project } from "@/types";
import { calcDaysLeft, formatAmount } from "@/lib/projects";
import { ArrowRight, Users, Clock, TrendingUp } from "lucide-react";

const HEAT_FACTORS = [
  { label: "支援額の伸び", weight: "30%", color: "#F97316" },
  { label: "累計支援額",   weight: "30%", color: "#FBBF24" },
  { label: "SNS注目度",   weight: "20%", color: "#FB923C" },
  { label: "達成率の伸び", weight: "20%", color: "#FDE68A" },
];

function HeatProjectCard({ project, rank, delay = 0 }: { project: Project; rank: number; delay?: number }) {
  const reduce = useReducedMotion();
  const achievement = Math.min(Math.round(project.achievement_rate), 999);
  const daysLeft = calcDaysLeft(project.end_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <Link href={`/projects/${project.id}`} className="block group focus-ring rounded-xl">
        <div
          className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
            rank === 0
              ? "border-brand-500/30 hover:border-brand-500/50"
              : "border-white/[0.07] hover:border-white/[0.13]"
          }`}
          style={{ background: rank === 0 ? "#1A1B2E" : "#161728" }}
        >
          {/* Top rank accent */}
          {rank === 0 && (
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
          )}

          <div className="p-5">
            {/* Rank + heat ring */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <HeatRingLarge score={project.heat_score} rank={rank} />
                {project.platforms && (
                  <span className="text-[10px] font-bold text-white/28 uppercase tracking-widest">
                    {project.platforms.name}
                  </span>
                )}
              </div>
              {rank === 0 && (
                <span className="text-[10px] font-extrabold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
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
                <span className="text-xs text-white/38">{formatAmount(project.current_amount)}</span>
                <span className="font-display font-extrabold text-brand-400 text-sm">{achievement}%</span>
              </div>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
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
            <div className="flex items-center gap-4 text-xs text-white/32">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {project.backers_count.toLocaleString()}人
              </span>
              {daysLeft !== null && (
                <span className={`flex items-center gap-1 ${daysLeft <= 3 && daysLeft > 0 ? "text-orange-400" : ""}`}>
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

interface Props { trending: Project[] }

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
      style={{ background: "#090A12" }}
    >
      {/* Heat ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(249,115,22,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <p className="eyebrow mb-4">Heat</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight">
              今、熱が生まれている
              <br />
              <span className="text-gradient">場所がある</span>
            </h2>
            <p className="text-white/38 text-sm mt-4 max-w-md">
              ヒートスコアは支援の勢い・達成率・SNS注目度を独自に統合した数値です
            </p>
          </div>
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-brand-400 font-medium transition-colors whitespace-nowrap"
          >
            すべてのトレンドを見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Heat factors */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2.5 mb-10"
        >
          {HEAT_FACTORS.map(({ label, weight, color }) => (
            <div key={label} className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span className="text-xs text-white/55">{label}</span>
              <span className="text-xs font-extrabold" style={{ color }}>{weight}</span>
            </div>
          ))}
        </motion.div>

        {/* Top 3 grid */}
        {top3.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {top3.map((p, i) => (
              <HeatProjectCard key={p.id} project={p} rank={i} delay={i * 0.1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-white/28 text-sm">
            現在表示できるトレンドプロジェクトがありません
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 border border-white/[0.09] hover:border-brand-500/35 text-white/45 hover:text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-brand-500/[0.05]"
          >
            <TrendingUp className="w-4 h-4" />
            ヒートスコアランキングを見る
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
