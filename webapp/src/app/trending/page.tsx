import { getTrendingProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export const revalidate = 1800;

export default async function TrendingPage() {
  const projects = await getTrendingProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-red-500">&#9650;</span> 今熱いプロジェクト
        </h1>
        <p className="text-sm text-gray-500">
          ヒートスコア 70以上のプロジェクトを掲載。支援の勢い・達成率・注目度を総合評価しています。
        </p>
      </div>

      {/* ヒートスコア説明 */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-8 text-sm text-amber-800">
        <p className="font-semibold mb-2">ヒートスコアとは？</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { label: "支援額の伸び", weight: "30%" },
            { label: "支援額", weight: "30%" },
            { label: "SNS注目度", weight: "20%" },
            { label: "達成率の伸び", weight: "20%" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-lg px-3 py-2 text-center">
              <p className="font-bold text-amber-700">{item.weight}</p>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-gray-400 py-20">現在トレンドのプロジェクトはありません</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <div key={project.id} className="relative">
              {i < 3 && (
                <div className="absolute -top-2 -left-2 z-10 bg-red-500 text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow">
                  {i + 1}
                </div>
              )}
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
