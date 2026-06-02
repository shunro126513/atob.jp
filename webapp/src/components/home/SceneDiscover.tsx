"use client";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
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
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/projects?genre=${genre}`}
        className="group block relative overflow-hidden rounded-xl border border-white/[0.07] hover:border-white/[0.14] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        style={{ background: "#161728" }}
      >
        {/* Top accent bar */}
        <div
          className="h-0.5 w-full opacity-60"
          style={{ background: `linear-gradient(90deg, ${colors.primary}70, ${colors.primary}30, transparent)` }}
        />

        <div className="px-4 pt-4 pb-5 flex flex-col gap-3.5">
          {/* Icon + arrow */}
          <div className="flex justify-between items-start">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ background: colors.bg }}
            >
              <GenreVisual genre={genre} size={38} animated />
            </div>
            <ArrowRight
              className="w-3.5 h-3.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: colors.primary }}
            />
          </div>

          {/* Text */}
          <div>
            <p className="font-display font-bold text-sm text-white leading-snug mb-1">{label}</p>
            <p className="text-[11px] text-white/35 font-medium leading-snug">{sub}</p>
          </div>
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
      style={{ background: "#0F1020" }}
    >
      {/* Subtle top divider glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.10), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-5 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="eyebrow mb-3">Discover</p>
          <h2 className="font-display text-3xl md:text-[2.6rem] font-extrabold text-white leading-[1.1] max-w-lg">
            あなたの応援を待っている<br />
            <span className="text-gradient">表現</span>がある
          </h2>
          <p className="text-white/38 text-sm mt-5 max-w-sm leading-[1.8]">
            ジャンルを選んで、今支援できるプロジェクトを探す
          </p>
        </motion.div>

        {/* Genre grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {GENRES.map((g, i) => (
            <GenreCard key={g.genre} {...g} index={i} />
          ))}
        </div>

        {/* All projects link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/38 hover:text-white/65 font-medium transition-colors"
          >
            全ジャンルを見る
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
