import { Suspense } from "react";
import { getProjects } from "@/lib/projects";
import { MOCK_PLATFORMS } from "@/lib/mock-data";
import ProjectCard from "@/components/ProjectCard";
import type { Genre, SearchFilters } from "@/types";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { FilterPanel, ActiveFilters } from "@/components/projects/FilterPanel";
import { Search } from "lucide-react";

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

  const currentGenre    = searchParams.genre ?? "";
  const currentPlatform = searchParams.platform ?? "";
  const currentSort     = searchParams.sort ?? "heat";
  const hasFilters      = !!(currentGenre || currentPlatform);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A10" }}>
      {/* Page header */}
      <div className="relative border-b border-white/[0.07]" style={{ background: "#0D0D18" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(232,80,58,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-5 py-10 relative">
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs text-white/30 font-medium mb-5">
              <a href="/" className="hover:text-brand-400 transition-colors">ホーム</a>
              <span>/</span>
              <span className="text-white/50">プロジェクト一覧</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-black text-white mb-2">
                  いま支援できる表現を見つける
                </h1>
                <p className="text-white/40 text-sm">
                  <span className="font-bold text-white text-base">{projects.length}</span>
                  <span className="text-white/40">件のプロジェクト</span>
                  {currentGenre && (
                    <span className="ml-2 text-brand-400">
                      · {({ music:"音楽",art:"アート",film:"映像",theater:"演劇",dance:"ダンス" } as Record<string,string>)[currentGenre] ?? currentGenre}
                    </span>
                  )}
                </p>
              </div>

              {/* Filter trigger */}
              <Suspense fallback={null}>
                <FilterPanel
                  platforms={platforms}
                  currentGenre={currentGenre}
                  currentPlatform={currentPlatform}
                  currentSort={currentSort}
                />
              </Suspense>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="mt-4">
                <Suspense fallback={null}>
                  <ActiveFilters
                    genre={currentGenre}
                    platform={currentPlatform}
                    sort={currentSort}
                    platforms={platforms}
                  />
                </Suspense>
              </div>
            )}
          </FadeIn>
        </div>
      </div>

      {/* Project grid */}
      <div className="max-w-6xl mx-auto px-5 py-10">
        {projects.length === 0 ? (
          <FadeIn>
            <div className="text-center py-28">
              <div className="w-20 h-20 rounded-2xl border border-white/[0.07] flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                <Search className="w-9 h-9 text-white/20" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                該当するプロジェクトが見つかりません
              </h3>
              <p className="text-white/40 text-sm mb-8">
                フィルター条件を変更してお試しください
              </p>
              <a
                href="/projects"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-brand-400/50 text-white/60 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              >
                フィルターをリセット
              </a>
            </div>
          </FadeIn>
        ) : (
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.04}>
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
