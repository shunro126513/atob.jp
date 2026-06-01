import Link from "next/link";
import { getFeaturedProjects, getTrendingProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import HeroIllustration from "@/components/illustrations/HeroIllustration";

export const revalidate = 3600;

const GENRES = [
  { genre: "music",   label: "音楽",  emoji: "🎵" },
  { genre: "art",     label: "アート", emoji: "🎨" },
  { genre: "film",    label: "映像",  emoji: "🎬" },
  { genre: "theater", label: "演劇",  emoji: "🎭" },
  { genre: "dance",   label: "ダンス", emoji: "💃" },
];

export default async function HomePage() {
  const [featured, trending] = await Promise.all([
    getFeaturedProjects(),
    getTrendingProjects(),
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-canvas-warm">
        {/* 装飾：アーク */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute -bottom-16 left-0 w-full opacity-[0.07]" viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path d="M0 200 Q720 0 1440 200" stroke="#e8503a" strokeWidth="3" fill="none" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-5 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          {/* テキスト */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600
                            border border-brand-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              🔥 文化芸術支援を、もっとシンプルに
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-black text-ink leading-[1.05] mb-5">
              支援ではなく、<br />
              <span className="text-brand-500 italic">参加。</span>
            </h1>

            <p className="text-ink/60 text-lg leading-relaxed mb-8 max-w-md">
              CAMPFIRE・Bandcamp・ENjiNE など複数プラットフォームの
              文化芸術プロジェクトを一括検索・比較・応援。
              ヒートスコアで今一番熱いプロジェクトがわかる。
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="btn-primary text-base">
                プロジェクトを探す →
              </Link>
              <Link href="/trending" className="btn-outline text-base">
                🔥 トレンドを見る
              </Link>
            </div>

            {/* 統計 */}
            <div className="flex gap-8 mt-10 pt-8 border-t border-brand-100">
              {[
                { n: "40+",   label: "掲載プロジェクト" },
                { n: "5",     label: "連携プラットフォーム" },
                { n: "独自",  label: "ヒートスコア" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl font-black text-brand-500">{n}</p>
                  <p className="text-xs text-ink/50 font-medium mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* イラスト */}
          <div className="hidden md:block">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ── ジャンルフィルター ── */}
      <section className="bg-canvas-card border-y border-brand-100/60 py-4 px-5">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap justify-center">
          {GENRES.map(({ genre, label, emoji }) => (
            <Link key={genre} href={`/projects?genre=${genre}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-ink/10
                         hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700
                         text-sm font-semibold text-ink/60 transition-all bg-white">
              {emoji} {label}
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-14 space-y-16">

        {/* ── トレンド ── */}
        {trending.length > 0 && (
          <section>
            <div className="section-header">
              <h2 className="section-title">🔥 今熱いプロジェクト</h2>
              <Link href="/trending" className="section-link">すべて見る →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trending.slice(0, 6).map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>
        )}

        {/* ── 注目 ── */}
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

        {/* ── PF比較 CTA ── */}
        <section className="relative overflow-hidden rounded-3xl bg-ink text-white p-10 text-center">
          {/* アーク装飾 */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice">
            <path d="M0 200 Q400 0 800 200" stroke="#e8503a" strokeWidth="4" fill="none" />
            <g transform="translate(368, 60)" fill="#e8503a">
              {[0,9,18,27,36].map((x, i) => (
                <rect key={i} x={x} y={[8,2,-4,2,8][i]} width="5" height={[16,24,30,24,16][i]} rx="2.5" />
              ))}
            </g>
          </svg>

          <div className="relative">
            <p className="font-display text-2xl font-bold mb-2">どのプラットフォームで支援すればいい？</p>
            <p className="text-white/60 mb-6 text-sm">手数料・対応ジャンル・サポート体制を一覧で比較</p>
            <Link href="/compare"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600
                         text-white font-bold px-7 py-3 rounded-xl transition-colors shadow-glow-sm">
              プラットフォームを比較する →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
