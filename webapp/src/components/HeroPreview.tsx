"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Flame, BarChart2, Sparkles } from "lucide-react";

const MOCK_ITEMS = [
  { rank: 1, title: "音楽×映像 新作アルバム制作", platform: "CAMPFIRE", genre: "音楽", score: 94, pct: 186 },
  { rank: 2, title: "アートブック出版プロジェクト", platform: "ENjiNE",   genre: "アート", score: 88, pct: 143 },
  { rank: 3, title: "舞台演劇「彷徨の詩」公演",  platform: "READYFOR",  genre: "演劇", score: 81, pct: 102 },
];

const PLATFORMS = ["CAMPFIRE", "Bandcamp", "ENjiNE", "READYFOR"];

export default function HeroPreview() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 28, scale: shouldReduce ? 1 : 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative select-none"
    >
      {/* Card container */}
      <div className="bg-white rounded-3xl shadow-[0_24px_64px_0_rgba(28,25,23,0.14),0_0_0_1px_rgba(232,80,58,0.08)] p-5 max-w-sm w-full">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-brand-500" />
            <span className="font-display font-bold text-sm text-ink">今熱いプロジェクト</span>
          </div>
          <span className="text-[10px] font-semibold text-ink/40 bg-stone-50 px-2 py-0.5 rounded-full">LIVE</span>
        </div>

        {/* Rankings */}
        <div className="space-y-3">
          {MOCK_ITEMS.map((item, i) => (
            <motion.div
              key={item.rank}
              initial={{ opacity: 0, x: shouldReduce ? 0 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.55 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 hover:bg-brand-50/50 transition-colors cursor-pointer group"
            >
              {/* Rank */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                item.rank === 1 ? "bg-brand-500 text-white" :
                item.rank === 2 ? "bg-ink/80 text-white" :
                "bg-stone-300 text-white"
              }`}>
                {item.rank}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink truncate group-hover:text-brand-700 transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-ink/40 font-medium">{item.platform}</span>
                  <span className="text-[10px] text-ink/20">·</span>
                  <span className="text-[10px] font-bold text-brand-500">{item.pct}%</span>
                </div>
              </div>

              {/* Heat score */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-0.5 bg-brand-50 text-brand-600 ring-1 ring-brand-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <Flame className="w-2.5 h-2.5" />
                  {item.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform badges */}
        <div className="mt-4 pt-4 border-t border-stone-100">
          <p className="text-[10px] text-ink/40 font-medium mb-2">連携プラットフォーム</p>
          <div className="flex flex-wrap gap-1.5">
            {PLATFORMS.map((pf, i) => (
              <motion.span
                key={pf}
                initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
                className="text-[10px] font-semibold bg-white border border-brand-200 text-brand-600 px-2.5 py-1 rounded-full"
              >
                {pf}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        animate={shouldReduce ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 bg-brand-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-glow-sm flex items-center gap-1"
      >
        <Sparkles className="w-3 h-3" />
        無料で使える
      </motion.div>

      <motion.div
        animate={shouldReduce ? {} : { y: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-2 -left-6 bg-white border border-brand-100 text-ink/60 text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-card flex items-center gap-1"
      >
        <BarChart2 className="w-3 h-3" />
        日次更新
      </motion.div>
    </motion.div>
  );
}
