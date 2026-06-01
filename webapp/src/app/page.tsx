import Link from "next/link";
import { getFeaturedProjects, getTrendingProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import HeroPreview from "@/components/HeroPreview";
import { FadeIn, FadeInStagger, FadeInItem, SlideInLeft, SlideInRight, ScaleIn } from "@/components/motion/FadeIn";

export const revalidate = 3600;

const GENRES = [
  { genre: "music",   label: "音楽",   emoji: "🎵", color: "hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700" },
  { genre: "art",     label: "アート", emoji: "🎨", color: "hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700" },
  { genre: "film",    label: "映像",   emoji: "🎬", color: "hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700" },
  { genre: "theater", label: "演劇",   emoji: "🎭", color: "hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700" },
  { genre: "dance",   label: "ダンス", emoji: "💃", color: "hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700" },
];

const HOW_IT_WORKS = [
  { step: "01", icon: "🔍", title: "探す",    desc: "複数プラットフォームのプロジェクトを一括検索・フィルタリング" },
  { step: "02", icon: "📊", title: "比較する", desc: "ヒートスコアで各プロジェクトの熱量・達成率を可視化" },
  { step: "03", icon: "💛", title: "応援する", desc: "1日1回の応援でヒートスコアを後押し" },
  { step: "04", icon: "🔗", title: "支援する", desc: "元のプラットフォームへ直接アクセスして支援" },
];

const TRUST_METRICS = [
  { value: "40+",  label: "プロジェクト掲載", icon: "📁" },
  { value: "5",    label: "連携プラットフォーム", icon: "🔗" },
  { value: "日次", label: "データ更新",        icon: "🔄" },
  { value: "無料", label: "で使える",          icon: "✨" },
];

export default async function HomePage() {
  const [featured, trending] = await Promise.all([
    getFeaturedProjects(),
    getTrendingProjects(),
  ]);

  return (
    <>
      {/* ── A. Hero Section ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFBF9 0%, #FFF5F3 60%, #FFF8F6 100%)" }}>
        {/* Background arc decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute -bottom-20 left-0 w-full opacity-[0.06]"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
          >
            <path d="M0 300 Q720 0 1440 300" stroke="#e8503a" strokeWidth="3" fill="none" />
            <path d="M0 300 Q720 60 1440 300" stroke="#e8503a" strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50 rounded-full opacity-30 translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center relative">
          {/* Left: Text */}
          <div>
            <SlideInLeft delay={0}>
              <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600
                              border border-brand-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-7">
                🔥 文化芸術支援をもっとシンプルに
              </div>
            </SlideInLeft>

            <SlideInLeft delay={0.1}>
              <h1 className="font-display text-[2.6rem] md:text-[3.2rem] font-black text-ink leading-[1.08] mb-6 tracking-tight">
                文化芸術の支援先を、<br />
                <span className="text-brand-500 italic">ひとつの場所で</span><br />
                比較する。
              </h1>
            </SlideInLeft>

            <SlideInLeft delay={0.2}>
              <p className="text-ink/60 text-lg leading-relaxed mb-9 max-w-lg">
                40以上のプロジェクトをCAMPFIRE・Bandcamp・ENjiNEなど
                複数プラットフォームから横断検索。ヒートスコアで今一番熱いプロジェクトがわかる。
              </p>
            </SlideInLeft>

            <SlideInLeft delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <Link href="/projects" className="btn-primary text-base">
                  プロジェクトを探す →
                </Link>
                <Link href="/compare" className="btn-outline text-base">
                  PF比較を見る
                </Link>
              </div>
            </SlideInLeft>
          </div>

          {/* Right: UI Preview */}
          <SlideInRight delay={0.15} className="hidden md:flex justify-center">
            <HeroPreview />
          </SlideInRight>
        </div>
      </section>

      {/* ── B. Trust Metrics Bar ── */}
      <section className="bg-stone-50 border-y border-stone-100">
        <FadeIn>
          <div className="max-w-6xl mx-auto px-5 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-stone-200">
              {TRUST_METRICS.map(({ value, label, icon }) => (
                <div key={label} className="flex items-center justify-center gap-3 px-6 py-4">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="font-display text-xl font-black text-brand-500 leading-none">{value}</p>
                    <p className="text-xs text-ink/50 font-medium mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── C. Category Discovery ── */}
      <section className="py-16 bg-canvas">
        <div className="max-w-6xl mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-3">ジャンルから探す</h2>
              <p className="text-ink/50 text-sm">気になるカテゴリのプロジェクトを一覧で</p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-2 md:grid-cols-5 gap-4" staggerDelay={0.08}>
            {GENRES.map(({ genre, label, emoji, color }) => (
              <FadeInItem key={genre}>
                <Link
                  href={`/projects?genre=${genre}`}
                  className={`group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white
                              border-2 border-transparent hover:border-current shadow-card hover:shadow-card-hover
                              transition-all duration-250 cursor-pointer ${color}`}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{emoji}</span>
                  <span className="font-display font-bold text-base text-ink/80 group-hover:text-current transition-colors">{label}</span>
                </Link>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── D. Hot Projects ── */}
      {trending.length > 0 && (
        <section className="py-16 bg-canvas-warm border-t border-brand-100/40">
          <div className="max-w-6xl mx-auto px-5">
            <FadeIn>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-ink flex items-center gap-2">
                    🔥 今熱いプロジェクト
                  </h2>
                  <p className="text-sm text-ink/50 mt-1">ヒートスコア上位・支援の勢いがあるプロジェクト</p>
                </div>
                <Link href="/trending" className="btn-ghost text-sm">すべて見る →</Link>
              </div>
            </FadeIn>

            <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
              {trending.slice(0, 6).map((p) => (
                <FadeInItem key={p.id}>
                  <ProjectCard project={p} />
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      {/* ── E. How It Works ── */}
      <section className="py-20 bg-ink text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-0 left-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
            <path d="M0 400 Q720 100 1440 400" stroke="#e8503a" strokeWidth="3" fill="none" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-5 relative">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">使い方は4ステップ</h2>
              <p className="text-white/50 text-sm">シンプルに、直感的に</p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-4 gap-8" staggerDelay={0.1}>
            {HOW_IT_WORKS.map(({ step, icon, title, desc }) => (
              <FadeInItem key={step}>
                <div className="text-center">
                  <div className="inline-flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-white/10">
                        {icon}
                      </div>
                      <span className="absolute -top-2 -right-2 font-display text-[10px] font-black text-brand-400 bg-ink px-1.5 py-0.5 rounded-full border border-brand-800">
                        {step}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-white mb-1.5">{title}</p>
                      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── F. Platform CTA Banner ── */}
      <section className="py-10 bg-canvas">
        <div className="max-w-6xl mx-auto px-5">
          <ScaleIn>
            <div className="relative overflow-hidden rounded-3xl p-10 text-center"
                 style={{ background: "linear-gradient(135deg, #e8503a 0%, #d43820 100%)" }}>
              {/* Decoration */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full" />
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice">
                  <path d="M0 200 Q400 0 800 200" stroke="white" strokeWidth="3" fill="none" />
                  <g transform="translate(368, 60)" fill="white">
                    {[0,9,18,27,36].map((x, i) => (
                      <rect key={i} x={x} y={[8,2,-4,2,8][i]} width="5" height={[16,24,30,24,16][i]} rx="2.5" />
                    ))}
                  </g>
                </svg>
              </div>

              <div className="relative">
                <p className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  どのプラットフォームがいい？
                </p>
                <p className="text-white/70 mb-7 text-sm">手数料・対応ジャンル・サポート体制を一覧で比較</p>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 bg-white hover:bg-brand-50
                             text-brand-600 font-bold px-8 py-3 rounded-xl transition-colors shadow-glow"
                >
                  プラットフォームを比較する →
                </Link>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ── G. Featured Projects ── */}
      {featured.length > 0 && (
        <section className="py-16 bg-canvas-card border-t border-brand-50">
          <div className="max-w-6xl mx-auto px-5">
            <FadeIn>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-ink flex items-center gap-2">
                    ⭐ 注目プロジェクト
                  </h2>
                  <p className="text-sm text-ink/50 mt-1">編集部がピックアップした注目プロジェクト</p>
                </div>
                <Link href="/projects" className="btn-ghost text-sm">すべて見る →</Link>
              </div>
            </FadeIn>

            <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
              {featured.map((p) => (
                <FadeInItem key={p.id}>
                  <ProjectCard project={p} />
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>
      )}

      {/* ── H. Final CTA ── */}
      <section className="py-24 bg-brand-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-800/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-5 text-center relative">
          <FadeIn>
            <p className="font-display text-3xl md:text-4xl font-black text-white leading-tight mb-5">
              支援ではなく、参加。<br />
              <span className="text-brand-300">文化芸術の熱量を、</span><br />
              あなたの手で後押しする
            </p>
            <p className="text-white/50 text-base mb-10 max-w-lg mx-auto leading-relaxed">
              無料で使える文化芸術プロジェクト横断プラットフォーム。
              あなたの応援が、アーティストの次の一歩になる。
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-50 text-brand-600 font-bold text-lg px-10 py-4 rounded-2xl transition-all shadow-glow active:scale-95"
            >
              プロジェクトを探す →
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
