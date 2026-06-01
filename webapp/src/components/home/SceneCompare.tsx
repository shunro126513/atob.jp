"use client";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

const PLATFORMS = [
  {
    name: "CAMPFIRE",
    fee: "17%",
    type: "AoN / KiA",
    genre: "音楽・アート・幅広く",
    color: "#e8503a",
    url: "https://camp-fire.jp",
  },
  {
    name: "Bandcamp",
    fee: "5〜15%",
    type: "常時販売型",
    genre: "音楽・アルバム特化",
    color: "#38bdf8",
    url: "https://bandcamp.com",
  },
  {
    name: "ENjiNE",
    fee: "15%",
    type: "All-or-Nothing",
    genre: "エンタメ・芸能",
    color: "#fbbf24",
    url: "https://enjine.co.jp",
  },
  {
    name: "READYFOR",
    fee: "12%",
    type: "AoN / KiA",
    genre: "医療・教育・芸術",
    color: "#34d399",
    url: "https://readyfor.jp",
  },
  {
    name: "MOTION GALLERY",
    fee: "20%",
    type: "All-or-Nothing",
    genre: "映像・演劇特化",
    color: "#a78bfa",
    url: "https://www.motiongallery.net",
  },
];

function PlatformCard({ p, index }: { p: typeof PLATFORMS[0]; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-300 hover:border-opacity-40 cursor-pointer"
      style={{ background: "rgba(255,255,255,0.025)" }}
    >
      {/* Top accent */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${p.color}60, ${p.color}30, transparent)` }} />

      <div className="p-5">
        {/* Name + fee */}
        <div className="flex items-start justify-between mb-4">
          <span className="font-display font-bold text-sm text-white">{p.name}</span>
          <span
            className="text-xs font-black px-2.5 py-1 rounded-lg"
            style={{ color: p.color, background: `${p.color}15` }}
          >
            {p.fee}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="text-[10px] text-white/30 font-medium w-14 shrink-0">形式</span>
            <span className="text-[10px] text-white/60">{p.type}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] text-white/30 font-medium w-14 shrink-0">得意</span>
            <span className="text-[10px] text-white/60">{p.genre}</span>
          </div>
        </div>

        {/* External link indicator */}
        <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
      style={{ background: "#10101A" }}
    >
      {/* Accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 10% 50%, rgba(167,139,250,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <p className="text-xs font-bold text-white/30 uppercase tracking-[0.15em] mb-4">Compare</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight">
              どこで支援する？
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-lg">
              プラットフォームごとに手数料・対応ジャンル・資金調達の仕組みが異なります。
              A to B なら一画面で比較できます。
            </p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
          >
            詳細比較を見る
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Platform cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {PLATFORMS.map((p, i) => (
            <PlatformCard key={p.name} p={p} index={i} />
          ))}
        </div>

        {/* Comparison note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-white/20 mt-8"
        >
          手数料・サービス内容は変更される場合があります。最新情報は各プラットフォームでご確認ください。
        </motion.p>
      </div>
    </section>
  );
}
