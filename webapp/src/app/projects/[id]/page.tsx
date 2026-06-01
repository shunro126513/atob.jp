import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById, calcDaysLeft, formatAmount } from "@/lib/projects";
import HeatBadge from "@/components/HeatBadge";
import CheerButton from "@/components/CheerButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { GenreVisual } from "@/components/visuals/GenreVisual";
import { GENRE_COLORS } from "@/lib/genre-colors";
import { HeatRing } from "@/components/visuals/HeatRing";
import { ExternalLink, Users, Clock, Target, ArrowLeft } from "lucide-react";

export const revalidate = 3600;

const GENRE_LABELS: Record<string, string> = {
  music: "音楽", art: "アート", film: "映像",
  theater: "演劇", dance: "ダンス", other: "その他",
};

interface Props {
  params: { id: string };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectById(Number(params.id));
  if (!project) notFound();

  const daysLeft    = calcDaysLeft(project.end_date);
  const achievement = Math.round(project.achievement_rate);
  const genre       = (project.genre ?? "other") as "music" | "art" | "film" | "theater" | "dance" | "other";
  const isUrgent    = daysLeft !== null && daysLeft <= 3 && daysLeft > 0;
  const colors      = GENRE_COLORS[genre];
  const displayAchievement = Math.min(achievement, 999);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A10" }}>
      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06]" style={{ background: "#0D0D18" }}>
        <div className="max-w-5xl mx-auto px-5 py-4">
          <nav className="flex items-center gap-2 text-xs text-white/30 font-medium">
            <Link href="/" className="hover:text-brand-400 transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-brand-400 transition-colors">プロジェクト一覧</Link>
            <span>/</span>
            <span className="text-white/50 truncate max-w-[200px]">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "320px" }}
      >
        {project.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div
            className="w-full h-80 flex items-center justify-center relative"
            style={{ background: `linear-gradient(135deg, #0D0D18 0%, ${colors.bg} 60%, #0A0A10 100%)` }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse 60% 70% at 50% 60%, ${colors.glow} 0%, transparent 65%)` }}
            />
            <div className="relative opacity-40">
              <GenreVisual genre={genre} size={160} animated />
            </div>
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(10,10,16,0.8) 70%, #0A0A10 100%)" }}
        />
        {/* Back button */}
        <div className="absolute top-5 left-5">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 px-3 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            一覧へ戻る
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 -mt-10 pb-20 relative z-10">
        <div className="grid md:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Main */}
          <FadeIn>
            <article>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {project.platforms && (
                  <span className="bg-white/[0.08] text-white/60 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                    {project.platforms.name}
                  </span>
                )}
                {project.genre && (
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{
                      background: colors.bg,
                      color: colors.primary,
                      border: `1px solid ${colors.primary}30`,
                    }}
                  >
                    <GenreVisual genre={genre} size={12} animated={false} />
                    {GENRE_LABELS[project.genre]}
                  </span>
                )}
                <HeatBadge score={project.heat_score} />
                {isUrgent && (
                  <span className="bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold px-3 py-1.5 rounded-full">
                    残り{daysLeft}日
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-5">
                {project.title}
              </h1>

              {/* Description */}
              {project.description && (
                <div className="text-white/60 text-sm leading-relaxed mb-7 border-l-2 border-white/10 pl-4">
                  {project.description}
                </div>
              )}

              {/* Artist / Creator */}
              {project.artists && (
                <div
                  className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.07] mb-7"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ background: colors.bg, color: colors.primary, border: `1px solid ${colors.primary}30` }}
                  >
                    {project.artists.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{project.artists.name}</p>
                    {project.artists.description && (
                      <p className="text-xs text-white/45 mt-0.5 leading-relaxed line-clamp-2">{project.artists.description}</p>
                    )}
                    {project.artists.genre && (
                      <span className="inline-block mt-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                        {GENRE_LABELS[project.artists.genre] ?? project.artists.genre}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Note */}
              <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                <ExternalLink className="w-4 h-4 text-white/25 shrink-0 mt-0.5" />
                <p className="text-xs text-white/35 leading-relaxed">
                  A to B は「探す・比較する・応援する」のための場所です。
                  実際の支援・購入は、右側のボタンから{project.platforms?.name ?? "元のプラットフォーム"}に移動して行ってください。
                </p>
              </div>
            </article>
          </FadeIn>

          {/* Sticky sidebar */}
          <div className="md:sticky md:top-24">
            <FadeIn delay={0.15}>
              <div
                className="rounded-2xl border border-white/[0.08] overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Progress section */}
                <div className="p-6 border-b border-white/[0.06]">
                  {/* Amount + achievement */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-display text-2xl font-black text-white">
                        {formatAmount(project.current_amount)}
                      </p>
                      {project.goal_amount && (
                        <p className="text-xs text-white/35 mt-1">
                          目標: {formatAmount(project.goal_amount)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-display text-3xl font-black text-brand-400">{displayAchievement}%</p>
                      <p className="text-[10px] text-white/30 mt-0.5">達成率</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-white/[0.06] rounded-full h-2 mb-5 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
                      style={{ width: `${Math.min(displayAchievement, 100)}%` }}
                    />
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/[0.04] rounded-xl p-3 text-center border border-white/[0.05]">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Users className="w-3 h-3 text-white/30" />
                      </div>
                      <p className="font-bold text-sm text-white">{project.backers_count.toLocaleString()}</p>
                      <p className="text-[10px] text-white/35 mt-0.5">支援者</p>
                    </div>
                    <div className="bg-white/[0.04] rounded-xl p-3 text-center border border-white/[0.05]">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Target className="w-3 h-3 text-white/30" />
                      </div>
                      <p className="font-bold text-sm text-white">{displayAchievement}%</p>
                      <p className="text-[10px] text-white/35 mt-0.5">達成率</p>
                    </div>
                    <div className={`rounded-xl p-3 text-center border ${isUrgent ? "bg-brand-500/10 border-brand-500/25" : "bg-white/[0.04] border-white/[0.05]"}`}>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className={`w-3 h-3 ${isUrgent ? "text-brand-400" : "text-white/30"}`} />
                      </div>
                      <p className={`font-bold text-sm ${isUrgent ? "text-brand-400" : "text-white"}`}>
                        {daysLeft === null ? "—" : daysLeft > 0 ? `${daysLeft}日` : "終了"}
                      </p>
                      <p className="text-[10px] text-white/35 mt-0.5">残り日数</p>
                    </div>
                  </div>
                </div>

                {/* Heat score */}
                <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/70">ヒートスコア</p>
                    <p className="text-[10px] text-white/30 mt-0.5">独自アルゴリズムで算出</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <HeatRing score={project.heat_score} size={52} />
                    <HeatBadge score={project.heat_score} />
                  </div>
                </div>

                {/* Cheer */}
                <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white/70">このプロジェクトを応援</p>
                    <p className="text-xs text-white/30 mt-0.5">1日1回、スコアを後押しできます</p>
                  </div>
                  <CheerButton projectId={project.id} initialCount={project.cheer_count} size="md" />
                </div>

                {/* CTA */}
                <div className="p-6">
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-glow-sm hover:shadow-glow active:scale-[0.98] w-full"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {project.platforms?.name ?? "元サイト"}で支援する
                  </a>
                  <p className="text-[10px] text-white/25 text-center mt-3">
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
