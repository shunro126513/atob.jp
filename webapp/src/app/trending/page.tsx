import { getTrendingProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";

export const revalidate = 1800;

const HEAT_FACTORS = [
  { label: "支援額の伸び", weight: "30%", icon: "📈" },
  { label: "累計支援額",  weight: "30%", icon: "💰" },
  { label: "SNS注目度",  weight: "20%", icon: "📣" },
  { label: "達成率の伸び", weight: "20%", icon: "🎯" },
];

export default async function TrendingPage() {
  const projects = await getTrendingProjects();
  const top3 = projects.slice(0, 3);
  const rest = projects.slice(3);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Page header */}
      <div className="bg-canvas-warm border-b border-brand-100/60 py-10">
        <div className="max-w-6xl mx-auto px-5">
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs text-ink/40 font-medium mb-4">
              <a href="/" className="hover:text-brand-500 transition-colors">ホーム</a>
              <span>/</span>
              <span className="text-ink/60">トレンド</span>
            </nav>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">🔥</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-ink">今熱いプロジェクト</h1>
            </div>
            <p className="text-ink/50 text-sm max-w-lg">
              ヒートスコア70以上のプロジェクト。支援の勢い・達成率の伸び・SNS注目度を総合評価。
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Heat score explanation */}
        <FadeIn>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🌡️</span>
              <p className="font-display font-bold text-amber-900">ヒートスコアとは？</p>
            </div>
            <p className="text-sm text-amber-800/70 mb-4 leading-relaxed">
              複数の指標を独自アルゴリズムで統合した、プロジェクトの「熱量」を示すスコアです。
              0〜100のスケールで、80以上が高熱・50〜79が中熱・49以下が低熱と分類されます。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {HEAT_FACTORS.map((item) => (
                <div key={item.label} className="bg-white rounded-xl px-4 py-3 text-center border border-amber-100">
                  <span className="text-xl mb-1 block">{item.icon}</span>
                  <p className="font-display font-black text-amber-600 text-base">{item.weight}</p>
                  <p className="text-xs text-ink/60 font-medium mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn>
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                🔥
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">
                現在トレンドのプロジェクトはありません
              </h3>
              <p className="text-ink/50 text-sm mb-6">しばらくしてから再度ご確認ください</p>
              <a href="/projects" className="btn-primary text-sm">すべて見る</a>
            </div>
          </FadeIn>
        ) : (
          <>
            {/* Top 3 */}
            {top3.length > 0 && (
              <section className="mb-8">
                <FadeIn>
                  <h2 className="font-display text-lg font-bold text-ink flex items-center gap-2 mb-5">
                    <span className="w-7 h-7 bg-brand-500 text-white text-xs font-black rounded-full flex items-center justify-center">TOP</span>
                    今週のトップ3
                  </h2>
                </FadeIn>
                <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
                  {top3.map((project, i) => (
                    <FadeInItem key={project.id}>
                      <div className="relative">
                        <div className={`absolute -top-2 -left-2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-md ${
                          i === 0 ? "bg-yellow-400 text-yellow-900" :
                          i === 1 ? "bg-stone-400 text-white" :
                          "bg-amber-700 text-white"
                        }`}>
                          {i + 1}
                        </div>
                        <ProjectCard project={project} />
                      </div>
                    </FadeInItem>
                  ))}
                </FadeInStagger>
              </section>
            )}

            {/* Divider */}
            {rest.length > 0 && (
              <>
                <FadeIn>
                  <div className="flex items-center gap-4 my-10">
                    <div className="flex-1 h-px bg-stone-200" />
                    <span className="text-xs font-semibold text-ink/40 uppercase tracking-wider">その他のトレンド</span>
                    <div className="flex-1 h-px bg-stone-200" />
                  </div>
                </FadeIn>

                <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.05}>
                  {rest.map((project) => (
                    <FadeInItem key={project.id}>
                      <ProjectCard project={project} />
                    </FadeInItem>
                  ))}
                </FadeInStagger>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
