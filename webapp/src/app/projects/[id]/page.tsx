import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById, calcDaysLeft, formatAmount } from "@/lib/projects";
import HeatBadge from "@/components/HeatBadge";

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

  const daysLeft = calcDaysLeft(project.end_date);
  const achievement = Math.round(project.achievement_rate);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/projects" className="text-sm text-brand-600 hover:underline mb-6 inline-block">
        ← プロジェクト一覧に戻る
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* サムネイル */}
        <div className="aspect-video bg-gradient-to-br from-brand-100 to-purple-100 relative">
          {project.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-300 text-6xl">
              {project.genre === "music" ? "♪" :
               project.genre === "art" ? "◻" :
               project.genre === "film" ? "▶" :
               project.genre === "theater" ? "★" : "✦"}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.platforms && (
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                {project.platforms.name}
              </span>
            )}
            {project.genre && (
              <span className="bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1 rounded-full">
                {GENRE_LABELS[project.genre]}
              </span>
            )}
            <HeatBadge score={project.heat_score} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h1>

          {project.description && (
            <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
          )}

          {/* 進捗 */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-black text-gray-900">{formatAmount(project.current_amount)}</p>
                {project.goal_amount && (
                  <p className="text-sm text-gray-400">目標: {formatAmount(project.goal_amount)}</p>
                )}
              </div>
              <p className="text-3xl font-black text-brand-600">{achievement}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-500 h-2 rounded-full"
                style={{ width: `${Math.min(achievement, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{project.backers_count}人が支援</span>
              {daysLeft !== null && (
                <span>{daysLeft > 0 ? `残り${daysLeft}日` : "終了"}</span>
              )}
            </div>
          </div>

          {/* 外部リンク */}
          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-base w-full justify-center py-3"
          >
            {project.platforms?.name ?? "元サイト"}で支援する &#8599;
          </a>

          <p className="text-xs text-gray-400 text-center mt-3">
            ※ 上記リンクは外部サービスに遷移します
          </p>
        </div>
      </div>
    </div>
  );
}
