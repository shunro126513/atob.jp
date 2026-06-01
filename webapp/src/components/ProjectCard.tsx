import Link from "next/link";
import type { Project } from "@/types";
import HeatBadge from "./HeatBadge";
import CheerButton from "./CheerButton";
import { calcDaysLeft, formatAmount } from "@/lib/projects";

const GENRE_LABELS: Record<string, string> = {
  music: "音楽", art: "アート", film: "映像",
  theater: "演劇", dance: "ダンス", other: "その他",
};
const GENRE_BG: Record<string, string> = {
  music:   "bg-violet-50 text-violet-600",
  art:     "bg-rose-50 text-rose-600",
  film:    "bg-sky-50 text-sky-600",
  theater: "bg-amber-50 text-amber-700",
  dance:   "bg-emerald-50 text-emerald-600",
  other:   "bg-stone-100 text-stone-500",
};
const GENRE_PATTERNS: Record<string, string> = {
  music:   "from-violet-100 to-rose-100",
  art:     "from-rose-100 to-orange-100",
  film:    "from-sky-100 to-indigo-100",
  theater: "from-amber-100 to-yellow-100",
  dance:   "from-emerald-100 to-teal-100",
  other:   "from-stone-100 to-stone-200",
};
const GENRE_ICONS: Record<string, string> = {
  music: "♪", art: "◼", film: "▶", theater: "★", dance: "◉", other: "✦",
};

interface Props { project: Project }

export default function ProjectCard({ project }: Props) {
  const daysLeft    = calcDaysLeft(project.end_date);
  const achievement = Math.min(Math.round(project.achievement_rate), 999);
  const genre       = project.genre ?? "other";
  const cheerCount  = project.cheer_count ?? 0;
  const urgent      = daysLeft !== null && daysLeft <= 3 && daysLeft > 0;

  return (
    <Link href={`/projects/${project.id}`}>
      <article className="card group cursor-pointer flex flex-col h-full">

        {/* Thumbnail */}
        <div className={`relative aspect-[16/9] bg-gradient-to-br ${GENRE_PATTERNS[genre]} overflow-hidden`}>
          {project.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image_url} alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl opacity-15 select-none">{GENRE_ICONS[genre]}</span>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* ジャンルバッジ */}
          <div className="absolute top-3 left-3">
            <span className={`genre-badge ${GENRE_BG[genre]}`}>{GENRE_LABELS[genre]}</span>
          </div>

          {/* ヒートバッジ */}
          <div className="absolute top-3 right-3">
            <HeatBadge score={project.heat_score} />
          </div>

          {/* プラットフォーム */}
          {project.platforms && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-ink/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                {project.platforms.name}
              </span>
            </div>
          )}

          {/* 残り日数（緊急） */}
          {urgent && (
            <div className="absolute bottom-3 right-3">
              <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                残り{daysLeft}日!
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          <h3 className="font-display font-bold text-ink text-sm leading-snug line-clamp-2
                         group-hover:text-brand-600 transition-colors">
            {project.title}
          </h3>

          {/* 進捗 */}
          <div className="space-y-1.5">
            <div className="flex items-end justify-between">
              <span className="text-xs text-ink/50 font-medium">{formatAmount(project.current_amount)}</span>
              <span className="font-display font-black text-brand-500 text-sm">{achievement}%</span>
            </div>
            <div className="h-1.5 bg-brand-50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
                style={{ width: `${Math.min(achievement, 100)}%` }}
              />
            </div>
          </div>

          {/* Stats + Cheer */}
          <div className="flex items-center justify-between mt-auto pt-1">
            <div className="flex items-center gap-2 text-xs text-ink/40">
              <span className="font-semibold text-ink/60">{project.backers_count.toLocaleString()}人</span>
              {daysLeft !== null && !urgent && (
                <><span>·</span><span>{daysLeft > 0 ? `残り${daysLeft}日` : "終了"}</span></>
              )}
            </div>
            <CheerButton projectId={project.id} initialCount={cheerCount} size="sm" />
          </div>
        </div>

      </article>
    </Link>
  );
}
