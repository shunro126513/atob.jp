import Link from "next/link";
import { getFeaturedProjects, getTrendingProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export const revalidate = 3600;

const GENRES = [
  { genre: "music",   label: "音楽",  icon: "🎵" },
  { genre: "art",     label: "アート", icon: "🎨" },
  { genre: "film",    label: "映像",  icon: "🎬" },
  { genre: "theater", label: "演劇",  icon: "🎭" },
  { genre: "dance",   label: "ダンス", icon: "💃" },
];

export default async function HomePage() {
  const [featured, trending] = await Promise.all([
    getFeaturedProjects(),
    getTrendingProjects(),
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-950/80 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                          border border-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <span className="text-yellow-300">✦</span>
            <span>文化芸術支援プロジェクト 比較プラットフォーム</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-5 leading-[1.1] tracking-tight">
            支援ではなく、<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              参加。
            </span>
          </h1>

          <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-xl mx-auto">
            CAMPFIRE・Bandcamp・ENjiNE など複数プラットフォームの
            文化芸術プロジェクトを一括検索・比較・応援。
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/projects" className="btn-primary text-base px-7 py-3">
              プロジェクトを探す
            </Link>
            <Link href="/compare"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30
                         hover:border-white/60 text-white font-semibold px-7 py-3 rounded-xl
                         transition-all duration-200 backdrop-blur-sm hover:bg-white/10 text-base">
              PF比較を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ── Genre tabs ── */}
      <section className="bg-white border-b border-gray-100 py-4 px-4 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex gap-2 justify-center flex-wrap">
          {GENRES.map(({ genre, label, icon }) => (
            <Link
              key={genre}
              href={`/projects?genre=${genre}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200
                         hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700
                         text-sm font-semibold text-gray-600 transition-all"
            >
              {icon} {label}
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-14 space-y-16">

        {/* ── Trending ── */}
        {trending.length > 0 && (
          <section>
            <div className="section-header">
              <h2 className="section-title">
                🔥 <span>今熱いプロジェクト</span>
              </h2>
              <Link href="/trending" className="section-link">
                もっと見る <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trending.slice(0, 6).map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>
        )}

        {/* ── Featured ── */}
        {featured.length > 0 && (
          <section>
            <div className="section-header">
              <h2 className="section-title">⭐ 注目プロジェクト</h2>
              <Link href="/projects" className="section-link">すべて見る →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>
        )}

        {/* ── Compare CTA ── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 text-white text-center">
          <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" />
          <div className="relative">
            <p className="text-2xl font-extrabold mb-2">どのプラットフォームで支援すればいい？</p>
            <p className="text-white/70 mb-6 text-sm">手数料・対応ジャンル・サポート体制を一覧で比較</p>
            <Link href="/compare" className="inline-flex items-center gap-2 bg-white text-brand-700
                                              font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors">
              プラットフォームを比較する
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
