"use client";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

const PLATFORMS = [
  { name: "CAMPFIRE",       fee: "17%",   type: "AoN / KiA",        genre: "音楽・アート・幅広く", color: "#F97316", url: "https://camp-fire.jp" },
  { name: "Bandcamp",       fee: "5〜15%", type: "常時販売型",        genre: "音楽・アルバム特化",   color: "#38BDF8", url: "https://bandcamp.com" },
  { name: "ENjiNE",         fee: "15%",   type: "All-or-Nothing",    genre: "エンタメ・芸能",       color: "#FBBF24", url: "https://enjine.co.jp" },
  { name: "READYFOR",       fee: "12%",   type: "AoN / KiA",        genre: "医療・教育・芸術",     color: "#34D399", url: "https://readyfor.jp" },
  { name: "MOTION GALLERY", fee: "20%",   type: "All-or-Nothing",    genre: "映像・演劇特化",       color: "#A78BFA", url: "https://www.motiongallery.net" },
];

function PlatformCard({ p, index }: { p: typeof PLATFORMS[0]; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl border border-white/[0.07] hover:border-white/[0.13] overflow-hidden transition-all duration-300 cursor-pointer"
      style={{ background: "#161728" }}
    >
      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 bottom-0 w-0.5"
        style={{ background: `linear-gradient(180deg, ${p.color}80, ${p.color}30)` }}
      />

      <div className="pl-5 pr-4 py-5">
        {/* Name + fee */}
        <div className="flex items-start justify-between mb-4">
          <span className="font-display font-bold text-sm text-white">{p.name}</span>
          <span
            className="text-xs font-extrabold px-2 py-0.5 rounded-md"
            style={{ color: p.color, background: `${p.color}14` }}
          >
            {p.fee}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex gap-2">
            <span className="text-[10px] text-white/28 font-medium w-10 shrink-0">形式</span>
            <span className="text-[10px] text-white/55">{p.type}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] text-white/28 font-medium w-10 shrink-0">得意</span>
            <span className="text-[10px] text-white/55">{p.genre}</span>
          </div>
        </div>

        {/* External link indicator */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink className="w-3 h-3" style={{ color: p.color }} />
          <span className="text-[10px]" style={{ color: p.color }}>詳細を見る</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SceneCompare() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="compare"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "#0F1020" }}
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
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <p className="eyebrow mb-4">Compare</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight">
              どこで支援する？
            </h2>
            <p className="text-white/38 text-sm mt-4 max-w-lg">
              プラットフォームごとに手数料・対応ジャンル・資金調達の仕組みが異なります。
              A to B なら一画面で比較できます。
            </p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 border border-white/[0.09] hover:border-brand-400/40 text-white/55 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-brand-500/[0.05] whitespace-nowrap"
          >
            詳細比較を見る
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Platform cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {PLATFORMS.map((p, i) => (
            <PlatformCard key={p.name} p={p} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-white/18 mt-8"
        >
          手数料・サービス内容は変更される場合があります。最新情報は各プラットフォームでご確認ください。
        </motion.p>
      </div>
    </section>
  );
}
