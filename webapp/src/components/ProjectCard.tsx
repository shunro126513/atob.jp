import Link from "next/link";
import type { Project } from "@/types";
import HeatBadge from "./HeatBadge";
import CheerButton from "./CheerButton";
import { calcDaysLeft, formatAmount } from "@/lib/projects";

const GENRE_LABELS: Record<string, string> = {
  music: "音楽", art: "アート", film: "映像",
  theater: "演劇", dance: "ダンス", other: "その他",
};

const GENRE_COLORS: Record<string, string> = {
  music:   "bg-violet-50 text-violet-600",
  art:     "bg-pink-50 text-pink-600",
  film:    "bg-sky-50 text-sky-600",
  theater: "bg-amber-50 text-amber-600",
  dance:   "bg-emerald-50 text-emerald-600",
  other:   "bg-gray-100 text-gray-500",
};

const GENRE_ICONS: Record<string, string> = {
  music: "♪", art: "◼", film: "▶", theater: "★", dance: "●", other: "✦",
};

interface Props { project: Project }

export default function ProjectCard({ project }: Props) {
  const daysLeft   = calcDaysLeft(project.end_date);
  const achievement = Math.min(Math.round(project.achievement_rate), 999);
  const genre      = project.genre ?? "other";
  const cheerCount = (project as any).cheer_count ?? 0;

  return (
    <Link href={`/projects/${project.id}`}>
      <article className="card group cursor-pointer flex flex-col h-full">

        {/* Thumbnail */}
        <div className="relative aspect-[16/9] bg-gradient-to-br from-brand-100 via-purple-50 to-pink-50 overflow-hidden">
          {project.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl opacity-20 select-none">{GENRE_ICONS[genre]}</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3">
            <span className={`genre-badge ${GENRE_COLORS[genre]}`}>
              {GENRE_LABELS[genre]}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <HeatBadge score={project.heat_score} />
          </div>

          {/* Platform */}
          {project.platforms && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {project.platforms.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
            {project.title}
          </h3>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex items-end justify-between text-xs">
              <span className="text-gray-500 font-medium">{formatAmount(project.current_amount)}</span>
              <span className="font-extrabold text-brand-600 text-sm">{achievement}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
                style={{ width: `${Math.min(achievement, 100)}%` }}
              />
            </div>
          </div>

          {/* Stats + Cheer */}
          <div className="flex items-center justify-between mt-auto pt-1">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-medium text-gray-600">{project.backers_count.toLocaleString()}人</span>
              {daysLeft !== null && (
                <>
                  <span>·</span>
                  <span className={daysLeft <= 3 ? "text-red-500 font-semibold" : ""}>
                    {daysLeft > 0 ? `残り${daysLeft}日` : "終了"}
                  </span>
                </>
              )}
            </div>
            <CheerButton projectId={project.id} initialCount={cheerCount} size="sm" />
          </div>
        </div>

      </article>
    </Link>
  );
}
