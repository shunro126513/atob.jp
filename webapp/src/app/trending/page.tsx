import { getTrendingProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { TrendingUp, DollarSign, Megaphone, Target } from "lucide-react";

export const revalidate = 1800;

const HEAT_FACTORS = [
  { label: "支援額の伸び", weight: "30%", icon: TrendingUp,  color: "#e8503a" },
  { label: "累計支援額",   weight: "30%", icon: DollarSign,  color: "#f97316" },
  { label: "SNS注目度",   weight: "20%", icon: Megaphone,   color: "#fb923c" },
  { label: "達成率の伸び", weight: "20%", icon: Target,      color: "#fdba74" },
];

export default async function TrendingPage() {
  const projects = await getTrendingProjects();
  const top3 = projects.slice(0, 3);
  const rest  = projects.slice(3);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A10" }}>
      {/* Header */}
      <div className="relative border-b border-white/[0.07]" style={{ background: "#0F0A0A" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(232,80,58,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-6xl mx-auto px-5 py-10 relative">
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs text-white/30 font-medium mb-5">
              <a href="/" className="hover:text-brand-400 transition-colors">ホーム</a>
              <span>/</span>
              <span className="text-white/50">トレンド</span>
            </nav>
            <h1 className="font-display text-2xl md:text-3xl font-black text-white mb-3">
              今熱いプロジェクト
            </h1>
            <p className="text-white/40 text-sm max-w-lg">
              ヒートスコア70以上のプロジェクト。支援の勢い・達成率の伸び・SNS注目度を総合評価。
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Heat score explanation */}
        <FadeIn>
          <div
            className="rounded-2xl border border-white/[0.07] p-6 mb-10"
            style={{ background: "rgba(232,80,58,0.04)" }}
          >
            <p className="font-display font-bold text-white/80 text-sm mb-4">ヒートスコアとは？</p>
            <p className="text-xs text-white/45 mb-5 leading-relaxed max-w-lg">
              複数の指標を独自アルゴリズムで統合した「熱量」スコアです。
              0〜100のスケールで、80以上が高熱・50〜79が中熱・49以下が低熱。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {HEAT_FACTORS.map(({ label, weight, icon: Icon, color }) => (
                <div key={label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <p className="font-display font-black text-base" style={{ color }}>{weight}</p>
                  <p className="text-[10px] text-white/45 font-medium mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn>
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-2xl border border-white/[0.07] flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(255,255,255,0.03)" }}>
                <TrendingUp className="w-9 h-9 text-white/20" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                現在トレンドのプロジェクトはありません
              </h3>
              <p className="text-white/40 text-sm mb-6">しばらくしてから再度ご確認ください</p>
              <a href="/projects" className="btn-primary text-sm">すべて見る</a>
            </div>
          </FadeIn>
        ) : (
          <>
            {top3.length > 0 && (
              <section className="mb-10">
                <FadeIn>
                  <p className="text-xs font-bold text-brand-400/70 uppercase tracking-[0.12em] mb-5">Top 3</p>
                </FadeIn>
                <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.1}>
                  {top3.map((project, i) => (
                    <FadeInItem key={project.id}>
                      <div className="relative">
                        <div
                          className="absolute -top-2.5 -left-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg"
                          style={{
                            background: i === 0 ? "#eab308" : i === 1 ? "#94a3b8" : "#b45309",
                            color: i === 0 ? "#713f12" : "#fff",
                          }}
                        >
                          {i + 1}
                        </div>
                        <ProjectCard project={project} />
                      </div>
                    </FadeInItem>
                  ))}
                </FadeInStagger>
              </section>
            )}

            {rest.length > 0 && (
              <>
                <FadeIn>
                  <div className="flex items-center gap-4 my-10">
                    <div className="flex-1 h-px bg-white/[0.07]" />
                    <span className="text-[10px] font-bold text-white/25 uppercase tracking-widest">その他のトレンド</span>
                    <div className="flex-1 h-px bg-white/[0.07]" />
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
