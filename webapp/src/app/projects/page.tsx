import { getProjects } from "@/lib/projects";
import { MOCK_PLATFORMS } from "@/lib/mock-data";
import ProjectCard from "@/components/ProjectCard";
import type { Genre, SearchFilters } from "@/types";

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
  { value: "",        label: "すべて" },
  { value: "music",   label: "音楽" },
  { value: "art",     label: "アート" },
  { value: "film",    label: "映像" },
  { value: "theater", label: "演劇" },
  { value: "dance",   label: "ダンス" },
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">プロジェクト一覧</h1>

      <form className="flex flex-wrap gap-3 mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">ジャンル</label>
          <select name="genre" defaultValue={searchParams.genre ?? ""}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300">
            {GENRE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">プラットフォーム</label>
          <select name="platform" defaultValue={searchParams.platform ?? ""}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300">
            <option value="">すべて</option>
            {platforms.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">並び順</label>
          <select name="sort" defaultValue={searchParams.sort ?? "heat"}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="flex items-end">
          <button type="submit" className="btn-primary text-sm">絞り込む</button>
        </div>
      </form>

      <p className="text-sm text-gray-400 mb-5">{projects.length}件のプロジェクト</p>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">&#128269;</p>
          <p>該当するプロジェクトが見つかりません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </div>
  );
}
