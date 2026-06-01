"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, Check, Flame, TrendingUp, Timer, Sparkles } from "lucide-react";
import { GenreVisual } from "@/components/visuals/GenreVisual";
import { GENRE_COLORS } from "@/lib/genre-colors";
import type { Platform } from "@/types";

type Genre = "music" | "art" | "film" | "theater" | "dance" | "";

const GENRES: { value: Genre; label: string; sub: string }[] = [
  { value: "music",   label: "音楽",   sub: "アルバム・ライブ" },
  { value: "art",     label: "アート", sub: "絵画・インスタレーション" },
  { value: "film",    label: "映像",   sub: "映画・ドキュメンタリー" },
  { value: "theater", label: "演劇",   sub: "舞台・ミュージカル" },
  { value: "dance",   label: "ダンス", sub: "コンテンポラリー" },
];

const SORT_OPTIONS = [
  { value: "heat",        label: "いま熱い",        icon: Flame,       desc: "ヒートスコア順" },
  { value: "achievement", label: "達成が近い",       icon: TrendingUp,  desc: "達成率の高い順" },
  { value: "end_date",    label: "まもなく終了",     icon: Timer,       desc: "終了日が近い順" },
  { value: "newest",      label: "新しく始まった",   icon: Sparkles,    desc: "最近追加された順" },
];

interface Props {
  platforms: Pick<Platform, "id" | "name">[];
  currentGenre: string;
  currentPlatform: string;
  currentSort: string;
}

export function FilterPanel({ platforms, currentGenre, currentPlatform, currentSort }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [genre, setGenre]     = useState(currentGenre);
  const [platform, setPlatform] = useState(currentPlatform);
  const [sort, setSort]       = useState(currentSort || "heat");

  // Sync with URL changes
  useEffect(() => {
    setGenre(currentGenre);
    setPlatform(currentPlatform);
    setSort(currentSort || "heat");
  }, [currentGenre, currentPlatform, currentSort]);

  const hasActiveFilters = !!(currentGenre || (currentPlatform && currentPlatform !== ""));
  const activeCount = [currentGenre, currentPlatform].filter(Boolean).length;

  function apply() {
    const params = new URLSearchParams();
    if (genre) params.set("genre", genre);
    if (platform) params.set("platform", platform);
    if (sort && sort !== "heat") params.set("sort", sort);
    router.push(`/projects${params.toString() ? `?${params.toString()}` : ""}`);
    setIsOpen(false);
  }

  function clearAll() {
    setGenre("");
    setPlatform("");
    setSort("heat");
    router.push("/projects");
    setIsOpen(false);
  }

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 border border-white/[0.12] hover:border-brand-500/50 bg-white/[0.04] hover:bg-white/[0.07] text-white/70 hover:text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        <SlidersHorizontal className="w-4 h-4" />
        フィルター
        {activeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={close}
            />

            {/* Desktop: right panel */}
            <motion.div
              key="panel-desktop"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed right-0 top-0 bottom-0 z-[51] w-full max-w-sm hidden md:flex flex-col"
              style={{ background: "#13131F", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              <PanelContent
                genres={GENRES} platforms={platforms} sortOptions={SORT_OPTIONS}
                genre={genre} platform={platform} sort={sort}
                setGenre={setGenre} setPlatform={setPlatform} setSort={setSort}
                onApply={apply} onClear={clearAll} onClose={close}
              />
            </motion.div>

            {/* Mobile: bottom sheet */}
            <motion.div
              key="panel-mobile"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed bottom-0 left-0 right-0 z-[51] md:hidden rounded-t-3xl overflow-hidden"
              style={{ background: "#13131F", borderTop: "1px solid rgba(255,255,255,0.08)", maxHeight: "90svh" }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <PanelContent
                genres={GENRES} platforms={platforms} sortOptions={SORT_OPTIONS}
                genre={genre} platform={platform} sort={sort}
                setGenre={setGenre} setPlatform={setPlatform} setSort={setSort}
                onApply={apply} onClear={clearAll} onClose={close}
                mobile
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function PanelContent({
  genres, platforms, sortOptions,
  genre, platform, sort,
  setGenre, setPlatform, setSort,
  onApply, onClear, onClose, mobile,
}: {
  genres: typeof GENRES;
  platforms: Pick<Platform, "id" | "name">[];
  sortOptions: typeof SORT_OPTIONS;
  genre: string; platform: string; sort: string;
  setGenre: (v: string) => void;
  setPlatform: (v: string) => void;
  setSort: (v: string) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
  mobile?: boolean;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
        <span className="font-display font-bold text-white text-base">フィルター</span>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
        {/* Genre */}
        <div>
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.12em] mb-3">ジャンル</p>
          <div className={`grid gap-2 ${mobile ? "grid-cols-3" : "grid-cols-2"}`}>
            {genres.map((g) => {
              const isActive = genre === g.value;
              const colors = GENRE_COLORS[g.value as keyof typeof GENRE_COLORS];
              return (
                <button
                  key={g.value}
                  onClick={() => setGenre(isActive ? "" : g.value)}
                  className="relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  style={{
                    background: isActive ? `${colors.bg}` : "rgba(255,255,255,0.03)",
                    borderColor: isActive ? `${colors.primary}50` : "rgba(255,255,255,0.07)",
                    boxShadow: isActive ? `0 0 16px ${colors.glow}` : "none",
                  }}
                >
                  {isActive && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: colors.primary }}>
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  <GenreVisual genre={g.value as any} size={36} animated={isActive} />
                  <span className="text-xs font-semibold" style={{ color: isActive ? colors.primary : "rgba(255,255,255,0.55)" }}>
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Platform */}
        <div>
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.12em] mb-3">プラットフォーム</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPlatform("")}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              style={{
                background: !platform ? "rgba(232,80,58,0.15)" : "rgba(255,255,255,0.04)",
                borderColor: !platform ? "rgba(232,80,58,0.4)" : "rgba(255,255,255,0.08)",
                color: !platform ? "#e8503a" : "rgba(255,255,255,0.5)",
              }}
            >
              すべて
            </button>
            {platforms.map((p) => {
              const isActive = platform === String(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => setPlatform(isActive ? "" : String(p.id))}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  style={{
                    background: isActive ? "rgba(232,80,58,0.15)" : "rgba(255,255,255,0.04)",
                    borderColor: isActive ? "rgba(232,80,58,0.4)" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#e8503a" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort */}
        <div>
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.12em] mb-3">並び順</p>
          <div className="grid grid-cols-2 gap-2">
            {sortOptions.map((s) => {
              const isActive = sort === s.value;
              const Icon = s.icon;
              return (
                <button
                  key={s.value}
                  onClick={() => setSort(s.value)}
                  className="flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  style={{
                    background: isActive ? "rgba(232,80,58,0.12)" : "rgba(255,255,255,0.03)",
                    borderColor: isActive ? "rgba(232,80,58,0.4)" : "rgba(255,255,255,0.07)",
                  }}
                >
                  <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: isActive ? "#e8503a" : "rgba(255,255,255,0.4)" }} />
                  <div>
                    <p className="text-xs font-bold" style={{ color: isActive ? "#e8503a" : "rgba(255,255,255,0.6)" }}>
                      {s.label}
                    </p>
                    <p className="text-[10px] text-white/30 mt-0.5">{s.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/[0.07] flex gap-3">
        <button
          onClick={onClear}
          className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white text-sm font-semibold transition-colors"
        >
          クリア
        </button>
        <button
          onClick={onApply}
          className="flex-[2] py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm transition-colors shadow-glow-sm"
        >
          適用する
        </button>
      </div>
    </div>
  );
}

export function ActiveFilters({ genre, platform, sort, platforms }: {
  genre: string;
  platform: string;
  sort: string;
  platforms: Pick<Platform, "id" | "name">[];
}) {
  const router = useRouter();
  const GENRE_LABELS: Record<string, string> = {
    music: "音楽", art: "アート", film: "映像", theater: "演劇", dance: "ダンス",
  };
  const SORT_LABELS: Record<string, string> = {
    heat: "ヒート順", achievement: "達成が近い", end_date: "終了間近", newest: "新着順",
  };

  const chips: { label: string; clearKey: string }[] = [];
  if (genre) chips.push({ label: GENRE_LABELS[genre] ?? genre, clearKey: "genre" });
  if (platform) {
    const pName = platforms.find((p) => String(p.id) === platform)?.name ?? platform;
    chips.push({ label: pName, clearKey: "platform" });
  }
  if (sort && sort !== "heat") {
    chips.push({ label: SORT_LABELS[sort] ?? sort, clearKey: "sort" });
  }

  if (chips.length === 0) return null;

  function removeFilter(key: string) {
    const params = new URLSearchParams();
    if (key !== "genre" && genre) params.set("genre", genre);
    if (key !== "platform" && platform) params.set("platform", platform);
    if (key !== "sort" && sort && sort !== "heat") params.set("sort", sort);
    router.push(`/projects${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {chips.map((chip) => (
        <span
          key={chip.clearKey}
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/25 px-3 py-1 rounded-full"
        >
          {chip.label}
          <button
            onClick={() => removeFilter(chip.clearKey)}
            className="hover:text-brand-100 transition-colors focus-visible:outline-none"
            aria-label={`${chip.label}を解除`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={() => router.push("/projects")}
        className="text-xs text-white/30 hover:text-white/60 transition-colors underline-offset-2 hover:underline"
      >
        すべて解除
      </button>
    </div>
  );
}
