import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById, calcDaysLeft, formatAmount } from "@/lib/projects";
import HeatBadge from "@/components/HeatBadge";
import CheerButton from "@/components/CheerButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { Music, Palette, Film, Mic, Zap, HelpCircle } from "lucide-react";

export const revalidate = 3600;

const GENRE_LABELS: Record<string, string> = {
  music: "音楽", art: "アート", film: "映像",
  theater: "演劇", dance: "ダンス", other: "その他",
};

const GENRE_PATTERNS: Record<string, string> = {
  music:   "from-violet-100 to-rose-100",
  art:     "from-rose-100 to-orange-100",
  film:    "from-sky-100 to-indigo-100",
  theater: "from-amber-100 to-yellow-100",
  dance:   "from-emerald-100 to-teal-100",
  other:   "from-stone-100 to-stone-200",
};

const GENRE_ICON_COLOR: Record<string, string> = {
  music:   "text-violet-400",
  art:     "text-rose-400",
  film:    "text-sky-400",
  theater: "text-amber-400",
  dance:   "text-emerald-400",
  other:   "text-stone-400",
};

const GENRE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  music:   Music,
  art:     Palette,
  film:    Film,
  theater: Mic,
  dance:   Zap,
  other:   HelpCircle,
};

interface Props {
  params: { id: string };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectById(Number(params.id));
  if (!project) notFound();

  const daysLeft = calcDaysLeft(project.end_date);
  const achievement = Math.round(project.achievement_rate);
  const genre = project.genre ?? "other";
  const isUrgent = daysLeft !== null && daysLeft <= 3 && daysLeft > 0;
  const GenreIcon = GENRE_ICONS[genre] ?? HelpCircle;

  return (
    <div className="min-h-screen bg-canvas">
      {/* Breadcrumb */}
      <div className="bg-canvas-warm border-b border-brand-50 py-4">
        <div className="max-w-5xl mx-auto px-5">
          <nav className="flex items-center gap-2 text-xs text-ink/40 font-medium">
            <Link href="/" className="hover:text-brand-500 transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-brand-500 transition-colors">プロジェクト一覧</Link>
            <span>/</span>
            <span className="text-ink/60 truncate max-w-[200px]">{project.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid md:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Main content */}
          <FadeIn>
            <article>
              {/* Hero image */}
              <div className={`relative aspect-video rounded-2xl bg-gradient-to-br ${GENRE_PATTERNS[genre]} overflow-hidden mb-6`}>
                {project.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <GenreIcon className={`w-24 h-24 opacity-15 ${GENRE_ICON_COLOR[genre]}`} />
                  </div>
                )}

                {isUrgent && (
                  <div className="absolute top-4 right-4 bg-brand-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                    残り{daysLeft}日
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.platforms && (
                  <span className="bg-ink/10 text-ink/70 text-xs font-semibold px-3 py-1.5 rounded-full border border-ink/10">
                    {project.platforms.name}
                  </span>
                )}
                {project.genre && (
                  <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-brand-200 flex items-center gap-1">
                    <GenreIcon className="w-3 h-3" />
                    {GENRE_LABELS[project.genre]}
                  </span>
                )}
                <HeatBadge score={project.heat_score} />
              </div>

              {/* Title */}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-ink leading-tight mb-4">
                {project.title}
              </h1>

              {/* Description */}
              {project.description && (
                <div className="prose prose-sm max-w-none text-ink/70 leading-relaxed mb-6">
                  <p>{project.description}</p>
                </div>
              )}

              {/* Artist */}
              {project.artists && (
                <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100 mb-6">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold text-sm">
                    {project.artists.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-ink">{project.artists.name}</p>
                    {project.artists.description && (
                      <p className="text-xs text-ink/50 mt-0.5 line-clamp-1">{project.artists.description}</p>
                    )}
                  </div>
                </div>
              )}
            </article>
          </FadeIn>

          {/* Sticky sidebar */}
          <div className="md:sticky md:top-24">
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-2xl shadow-card border border-stone-100 overflow-hidden">
                {/* Progress section */}
                <div className="p-6 border-b border-stone-50">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="font-display text-2xl font-black text-ink">
                        {formatAmount(project.current_amount)}
                      </p>
                      {project.goal_amount && (
                        <p className="text-xs text-ink/40 mt-0.5">目標: {formatAmount(project.goal_amount)}</p>
                      )}
                    </div>
                    <p className="font-display text-3xl font-black text-brand-500">{achievement}%</p>
                  </div>

                  <div className="w-full bg-stone-100 rounded-full h-2 mb-4">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
                      style={{ width: `${Math.min(achievement, 100)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-stone-50 rounded-xl p-2.5">
                      <p className="font-bold text-sm text-ink">{project.backers_count.toLocaleString()}</p>
                      <p className="text-[10px] text-ink/40 font-medium mt-0.5">支援者数</p>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-2.5">
                      <p className="font-bold text-sm text-ink">{achievement}%</p>
                      <p className="text-[10px] text-ink/40 font-medium mt-0.5">達成率</p>
                    </div>
                    <div className={`rounded-xl p-2.5 ${isUrgent ? "bg-brand-50" : "bg-stone-50"}`}>
                      <p className={`font-bold text-sm ${isUrgent ? "text-brand-600" : "text-ink"}`}>
                        {daysLeft === null ? "—" : daysLeft > 0 ? `${daysLeft}日` : "終了"}
                      </p>
                      <p className="text-[10px] text-ink/40 font-medium mt-0.5">残り日数</p>
                    </div>
                  </div>
                </div>

                {/* Heat score */}
                <div className="px-6 py-4 border-b border-stone-50 flex items-center justify-between">
                  <span className="text-sm text-ink/60 font-medium">ヒートスコア</span>
                  <HeatBadge score={project.heat_score} />
                </div>

                {/* Cheer */}
                <div className="px-6 py-4 border-b border-stone-50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-ink">このプロジェクトを応援</p>
                    <p className="text-xs text-ink/40 mt-0.5">1日1回スコアを後押しできます</p>
                  </div>
                  <CheerButton projectId={project.id} initialCount={project.cheer_count} size="md" />
                </div>

                {/* CTA */}
                <div className="p-6">
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-base !py-3.5"
                  >
                    {project.platforms?.name ?? "元サイト"}で支援する
                  </a>
                  <p className="text-[10px] text-ink/40 text-center mt-3">
                    外部サービスに遷移します
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
