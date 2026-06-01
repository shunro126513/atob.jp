import Link from "next/link";
import type { Project } from "@/types";
import HeatBadge from "./HeatBadge";
import CheerButton from "./CheerButton";
import { calcDaysLeft, formatAmount } from "@/lib/projects";
import { GenreVisual } from "@/components/visuals/GenreVisual";
import { GENRE_COLORS } from "@/lib/genre-colors";

const GENRE_LABELS: Record<string, string> = {
  music: "音楽", art: "アート", film: "映像",
  theater: "演劇", dance: "ダンス", other: "その他",
};

interface Props { project: Project }

export default function ProjectCard({ project }: Props) {
  const daysLeft    = calcDaysLeft(project.end_date);
  const achievement = Math.min(Math.round(project.achievement_rate), 999);
  const genre       = (project.genre ?? "other") as "music" | "art" | "film" | "theater" | "dance" | "other";
  const cheerCount  = project.cheer_count ?? 0;
  const urgent      = daysLeft !== null && daysLeft <= 3 && daysLeft > 0;
  const colors      = GENRE_COLORS[genre];

  return (
    <Link href={`/projects/${project.id}`} className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-2xl">
      <article
        className="flex flex-col h-full rounded-2xl overflow-hidden border border-white/[0.07] transition-all duration-350 group-hover:border-white/[0.15]"
        style={{
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {project.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, #0D0D18 0%, ${colors.bg} 60%, #0A0A10 100%)`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse at center, ${colors.glow} 0%, transparent 65%)` }}
              />
              <div className="relative opacity-35 group-hover:opacity-55 transition-opacity duration-300">
                <GenreVisual genre={genre} size={64} animated />
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Genre badge */}
          <div className="absolute top-3 left-3">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg"
              style={{
                background: `${colors.bg}`,
                color: colors.primary,
                border: `1px solid ${colors.primary}30`,
              }}
            >
              {GENRE_LABELS[genre]}
            </span>
          </div>

          {/* Heat badge */}
          <div className="absolute top-2.5 right-2.5">
            <HeatBadge score={project.heat_score} />
          </div>

          {/* Platform */}
          {project.platforms && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-black/50 backdrop-blur-sm text-white/70 text-[9px] font-bold px-2.5 py-1 rounded-full border border-white/[0.1]">
                {project.platforms.name}
              </span>
            </div>
          )}

          {/* Urgent badge */}
          {urgent && (
            <div className="absolute bottom-3 right-3">
              <span className="bg-brand-500 text-white text-[9px] font-black px-2 py-1 rounded-full animate-pulse shadow-glow-sm">
                残り{daysLeft}日
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          <h3 className="font-display font-bold text-white/90 text-sm leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex items-end justify-between">
              <span className="text-xs text-white/35">{formatAmount(project.current_amount)}</span>
              <span className="font-display font-black text-brand-400 text-sm">{achievement}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
                style={{ width: `${Math.min(achievement, 100)}%` }}
              />
            </div>
          </div>

          {/* Stats + Cheer */}
          <div className="flex items-center justify-between mt-auto pt-1">
            <div className="flex items-center gap-2 text-xs text-white/35">
              <span className="font-semibold text-white/55">{project.backers_count.toLocaleString()}人</span>
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
