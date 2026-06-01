"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Flame, TrendingUp, Users, ArrowUpRight } from "lucide-react";

const FEATURED = {
  title: "短編映画集「都市の断片」",
  platform: "CAMPFIRE",
  achievement: 120,
  heat: 97.4,
  backers: 134,
  amount: "420,000",
};

export default function FloatingCards() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ perspective: "1200px", minHeight: "380px" }}>

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-brand-500/20 blur-[80px] animate-glow-pulse" />
      </div>

      {/* Connecting lines SVG */}
      <svg className="absolute inset-0 w-full h-full -z-10 opacity-20 pointer-events-none" viewBox="0 0 400 380">
        <line x1="200" y1="190" x2="340" y2="60" stroke="#e8503a" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="190" x2="60" y2="290" stroke="#e8503a" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="190" x2="340" y2="300" stroke="#e8503a" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="200" cy="190" r="4" fill="#e8503a" />
        <circle cx="340" cy="60" r="3" fill="#e8503a" opacity="0.6" />
        <circle cx="60" cy="290" r="3" fill="#e8503a" opacity="0.6" />
        <circle cx="340" cy="300" r="3" fill="#e8503a" opacity="0.6" />
      </svg>

      {/* MAIN CARD - center, tilted */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-64"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={shouldReduce ? {} : { y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass rounded-2xl p-5 shadow-[0_8px_40px_rgba(232,80,58,0.25)]">
          {/* Card header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
              {FEATURED.platform}
            </span>
            <span className="flex items-center gap-1 bg-brand-500/20 text-brand-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Flame className="w-2.5 h-2.5" />
              {FEATURED.heat}
            </span>
          </div>

          {/* Genre bar */}
          <div className="h-1 w-full rounded-full bg-white/10 mb-4 overflow-hidden">
            <div className="h-full w-[80%] bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full" />
          </div>

          <h3 className="text-white font-display font-bold text-sm leading-snug mb-4">
            {FEATURED.title}
          </h3>

          {/* Progress */}
          <div className="space-y-1.5 mb-3">
            <div className="flex justify-between text-xs">
              <span className="text-white/50">¥{FEATURED.amount}</span>
              <span className="font-black text-brand-400">{FEATURED.achievement}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
                style={{ width: `${Math.min(FEATURED.achievement, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40">{FEATURED.backers}人が支援</span>
            <span className="flex items-center gap-1 text-white/60 text-[10px] hover:text-brand-400 transition-colors cursor-pointer">
              詳細 <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.div>

      {/* MINI CARD 1 - top right */}
      <motion.div
        className="absolute top-4 right-0 w-36"
        animate={shouldReduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="glass rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3 h-3 text-brand-400" />
            <span className="text-[9px] text-white/50 font-semibold uppercase tracking-widest">Trending</span>
          </div>
          <p className="font-black text-white text-xl leading-none">40+</p>
          <p className="text-[9px] text-white/40 mt-0.5">掲載プロジェクト</p>
        </div>
      </motion.div>

      {/* MINI CARD 2 - bottom left */}
      <motion.div
        className="absolute bottom-8 left-0 w-40"
        animate={shouldReduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="glass rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <p className="text-[9px] text-white/50 font-semibold mb-1.5 uppercase tracking-widest">Platforms</p>
          <div className="flex gap-1.5 flex-wrap">
            {["CAMPFIRE", "Bandcamp", "ENjiNE"].map((p) => (
              <span key={p} className="text-[8px] font-bold bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
                {p}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MINI CARD 3 - bottom right */}
      <motion.div
        className="absolute bottom-0 right-4 w-32"
        animate={shouldReduce ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="glass rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] text-white/50 font-semibold">日次更新</span>
          </div>
          <p className="text-[9px] text-white/60">スクレイピング自動更新</p>
        </div>
      </motion.div>

      {/* MINI CARD 4 - top left */}
      <motion.div
        className="absolute top-16 left-0 w-28"
        animate={shouldReduce ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div className="glass rounded-xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="w-3 h-3 text-emerald-400" />
            <span className="text-[9px] text-white/50 font-semibold">支援者</span>
          </div>
          <p className="font-black text-white text-lg leading-none">1.2k+</p>
        </div>
      </motion.div>
    </div>
  );
}
