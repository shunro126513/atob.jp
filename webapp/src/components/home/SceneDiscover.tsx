"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GenreVisual } from "@/components/visuals/GenreVisual";
import { GENRE_COLORS } from "@/lib/genre-colors";
import { ArrowRight } from "lucide-react";

type Genre = "music" | "art" | "film" | "theater" | "dance";

const GENRES: { genre: Genre; label: string; sub: string }[] = [
  { genre: "music",   label: "音楽",   sub: "アルバム・ライブ・フェス" },
  { genre: "art",     label: "アート", sub: "絵画・インスタレーション" },
  { genre: "film",    label: "映像",   sub: "映画・ドキュメンタリー" },
  { genre: "theater", label: "演劇",   sub: "舞台・ミュージカル" },
  { genre: "dance",   label: "ダンス", sub: "コンテンポラリー・バレエ" },
];

function GenreCard({ genre, label, sub, index }: { genre: Genre; label: string; sub: string; index: number }) {
  const reduce = useReducedMotion();
  const colors = GENRE_COLORS[genre];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/projects?genre=${genre}`}
        className="group block relative overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-350 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        style={{
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Hover background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 70%)` }}
        />
        {/* Border glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
          style={{ boxShadow: `inset 0 0 0 1px ${colors.primary}40` }}
        />

        <div className="relative p-6 flex flex-col gap-4">
          {/* Visual */}
          <div className="flex justify-between items-start">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: colors.bg }}
            >
              <GenreVisual genre={genre} size={48} animated />
            </div>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-hidden
            >
              <ArrowRight className="w-4 h-4 mt-2" style={{ color: colors.primary }} />
            </motion.div>
          </div>

          {/* Text */}
          <div>
            <p className="font-display font-bold text-lg text-white leading-tight mb-1">{label}</p>
            <p className="text-xs text-white/40 font-medium">{sub}</p>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
            style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function SceneDiscover() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="discover"
      ref={ref}
      className="relative min-h-[100svh] flex items-center py-24 overflow-hidden"
      style={{ background: "#0D0D18" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(232,80,58,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="text-xs font-bold text-brand-400/70 uppercase tracking-[0.15em] mb-4">Discover</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight max-w-xl">
            あなたの応援を<br />
            <span className="text-gradient">待っている表現</span>がある
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md">
            ジャンルを選んで、今支援できるプロジェクトを探す
          </p>
        </motion.div>

        {/* Genre grid — 2+3 layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {GENRES.map((g, i) => (
            <GenreCard key={g.genre} {...g} index={i} />
          ))}
        </div>

        {/* All projects link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 font-medium transition-colors"
          >
            全ジャンルを見る
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
