import { getProjects } from "@/lib/projects";
import { MOCK_PLATFORMS } from "@/lib/mock-data";
import ProjectCard from "@/components/ProjectCard";
import type { Genre, SearchFilters } from "@/types";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";

export const revalidate = 1800;

function isMockMode() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return !url || url.includes("placeholder");
}

async function getPlatforms() {
  if (isMockMode()) return MOCK_PLATFORMS;
  try {
    const { supabase } = await import("@/lib/supabase");
    const { data } = await supabase.from("platforms").select("id, name");
    return data ?? MOCK_PLATFORMS;
  } catch {
    return MOCK_PLATFORMS;
  }
}

const GENRE_OPTIONS = [
  { value: "",        label: "すべて",   emoji: "🌟" },
  { value: "music",   label: "音楽",     emoji: "🎵" },
  { value: "art",     label: "アート",   emoji: "🎨" },
  { value: "film",    label: "映像",     emoji: "🎬" },
  { value: "theater", label: "演劇",     emoji: "🎭" },
  { value: "dance",   label: "ダンス",   emoji: "💃" },
];

const SORT_OPTIONS = [
  { value: "heat",        label: "ヒート順" },
  { value: "achievement", label: "達成率順" },
  { value: "end_date",    label: "終了間近" },
  { value: "newest",      label: "新着順" },
];

interface PageProps {
  searchParams: { genre?: string; sort?: string; platform?: string };
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const [platforms, projects] = await Promise.all([
    getPlatforms(),
    getProjects({
      genre: (searchParams.genre as Genre) || undefined,
      sort: (searchParams.sort as SearchFilters["sort"]) || "heat",
      platform_id: searchParams.platform ? Number(searchParams.platform) : undefined,
    }),
  ]);

  const currentGenre = searchParams.genre ?? "";

  return (
    <div className="min-h-screen bg-canvas">
      {/* Page header */}
      <div className="bg-canvas-warm border-b border-brand-100/60 py-10">
        <div className="max-w-6xl mx-auto px-5">
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs text-ink/40 font-medium mb-4">
              <a href="/" className="hover:text-brand-500 transition-colors">ホーム</a>
              <span>/</span>
              <span className="text-ink/60">プロジェクト一覧</span>
            </nav>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink">プロジェクト一覧</h1>
            <p className="text-ink/50 text-sm mt-2">文化芸術クラウドファンディングプロジェクトを横断検索</p>
          </FadeIn>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-stone-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 py-3">
          <form className="flex flex-wrap gap-3 items-end">
            {/* Genre */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-ink/40 uppercase tracking-wider">ジャンル</label>
              <select
                name="genre"
                defaultValue={currentGenre}
                className="text-sm border border-stone-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 text-ink font-medium"
              >
                {GENRE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.emoji} {o.label}</option>
                ))}
              </select>
            </div>

            {/* Platform */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-ink/40 uppercase tracking-wider">プラットフォーム</label>
              <select
                name="platform"
                defaultValue={searchParams.platform ?? ""}
                className="text-sm border border-stone-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 text-ink font-medium"
              >
                <option value="">すべて</option>
                {platforms.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-ink/40 uppercase tracking-wider">並び順</label>
              <select
                name="sort"
                defaultValue={searchParams.sort ?? "heat"}
                className="text-sm border border-stone-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 text-ink font-medium"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary text-sm !py-2 !px-5"
            >
              絞り込む
            </button>

            {/* Active filters indicator */}
            {(currentGenre || searchParams.platform) && (
              <a
                href="/projects"
                className="flex items-center gap-1 text-xs text-ink/50 hover:text-brand-500 transition-colors mt-auto mb-0.5"
              >
                ✕ フィルターをクリア
              </a>
            )}
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Genre pill filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {GENRE_OPTIONS.map(({ value, label, emoji }) => (
            <a
              key={value}
              href={value ? `/projects?genre=${value}` : "/projects"}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                currentGenre === value
                  ? "bg-brand-500 text-white border-brand-500 shadow-glow-sm"
                  : "bg-white text-ink/60 border-stone-200 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {emoji} {label}
            </a>
          ))}
        </div>

        {/* Result count */}
        <FadeIn>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-ink/50 font-medium">
              <span className="font-bold text-ink text-base">{projects.length}</span>件のプロジェクト
              {currentGenre && (
                <span className="ml-2 text-brand-500">
                  （{GENRE_OPTIONS.find(g => g.value === currentGenre)?.label}）
                </span>
              )}
            </p>
          </div>
        </FadeIn>

        {/* Projects grid or empty state */}
        {projects.length === 0 ? (
          <FadeIn>
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                🔍
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">
                該当するプロジェクトが見つかりません
              </h3>
              <p className="text-ink/50 text-sm mb-6">
                フィルター条件を変更してお試しください
              </p>
              <a href="/projects" className="btn-outline text-sm">
                すべて表示
              </a>
            </div>
          </FadeIn>
        ) : (
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.05}>
            {projects.map((project) => (
              <FadeInItem key={project.id}>
                <ProjectCard project={project} />
              </FadeInItem>
            ))}
          </FadeInStagger>
        )}
      </div>
    </div>
  );
}
