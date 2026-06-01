import Link from "next/link";
import dynamic from "next/dynamic";
import { getFeaturedProjects, getTrendingProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { FadeIn, FadeInStagger, FadeInItem, SlideInLeft, SlideInRight, ScaleIn } from "@/components/motion/FadeIn";
import { FolderOpen, Link2, RefreshCw, Unlock, Music, Palette, Film, Mic, Zap, Flame, Star, Search, BarChart2, Heart, ExternalLink, ArrowRight, ChevronRight } from "lucide-react";

const FloatingCards = dynamic(() => import("@/components/hero/FloatingCards"), { ssr: false });

export const revalidate = 3600;

const GENRES = [
  {
    genre: "music",
    label: "音楽",
    icon: Music,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-400/60",
    bgHover: "hover:bg-violet-500/5",
  },
  {
    genre: "art",
    label: "アート",
    icon: Palette,
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    borderHover: "hover:border-rose-400/60",
    bgHover: "hover:bg-rose-500/5",
  },
  {
    genre: "film",
    label: "映像",
    icon: Film,
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    borderHover: "hover:border-sky-400/60",
    bgHover: "hover:bg-sky-500/5",
  },
  {
    genre: "theater",
    label: "演劇",
    icon: Mic,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-400/60",
    bgHover: "hover:bg-amber-500/5",
  },
  {
    genre: "dance",
    label: "ダンス",
    icon: Zap,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-400/60",
    bgHover: "hover:bg-emerald-500/5",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "探す",
    desc: "複数プラットフォームのプロジェクトを一括検索・フィルタリング",
  },
  {
    step: "02",
    icon: BarChart2,
    title: "比較する",
    desc: "ヒートスコアで各プロジェクトの熱量・達成率を可視化",
  },
  {
    step: "03",
    icon: Heart,
    title: "応援する",
    desc: "1日1回の応援でヒートスコアを後押し",
  },
  {
    step: "04",
    icon: ExternalLink,
    title: "支援する",
    desc: "元のプラットフォームへ直接アクセスして支援",
  },
];

const TRUST_METRICS = [
  { value: "40+",  label: "プロジェクト掲載", icon: FolderOpen },
  { value: "5",    label: "連携プラットフォーム", icon: Link2 },
  { value: "日次", label: "データ更新",        icon: RefreshCw },
  { value: "無料", label: "で使える",          icon: Unlock },
];

export default async function HomePage() {
  const [featured, trending] = await Promise.all([
    getFeaturedProjects(),
    getTrendingProjects(),
  ]);

  return (
    <>
      {/* ── A. Hero Section (DARK) ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0A0A10" }}
      >
        {/* Radial gradient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(232,80,58,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto px-5 py-20 md:py-32 grid md:grid-cols-2 gap-14 items-center relative">
          {/* Left: Text */}
          <div>
            <SlideInLeft delay={0}>
              <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-7">
                <Flame className="w-3.5 h-3.5" />
                文化芸術支援をもっとシンプルに
              </div>
            </SlideInLeft>

            <SlideInLeft delay={0.1}>
              <h1 className="font-display text-[2.6rem] md:text-[3.4rem] font-black leading-[1.06] mb-6 tracking-tight text-white">
                文化芸術の支援先を、<br />
                <span className="text-gradient italic">ひとつの場所で</span><br />
                比較する。
              </h1>
            </SlideInLeft>

            <SlideInLeft delay={0.2}>
              <p className="text-white/50 text-lg leading-relaxed mb-9 max-w-lg">
                40以上のプロジェクトをCAMPFIRE・Bandcamp・ENjiNEなど
                複数プラットフォームから横断検索。ヒートスコアで今一番熱いプロジェクトがわかる。
              </p>
            </SlideInLeft>

            <SlideInLeft delay={0.3}>
              <div className="flex flex-wrap gap-3">
                <Link href="/projects" className="btn-primary text-base">
                  プロジェクトを探す
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-brand-400/60 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 font-semibold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 text-base"
                >
                  PF比較を見る
                </Link>
              </div>
            </SlideInLeft>
          </div>

          {/* Right: Floating Cards */}
          <SlideInRight delay={0.15} className="hidden md:flex justify-center">
            <FloatingCards />
          </SlideInRight>
        </div>
      </section>

      {/* ── B. Trust Metrics Bar (LIGHT) ── */}
      <section className="bg-white border-y border-stone-100">
        <FadeIn>
          <div className="max-w-6xl mx-auto px-5 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-stone-100">
              {TRUST_METRICS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center justify-center gap-3 px-6 py-5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-brand-500" />
                  </div>
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

      {/* ── C. Category Discovery (WARM LIGHT) ── */}
      <section className="py-20 bg-canvas-warm">
        <div className="max-w-6xl mx-auto px-5">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-3">
                ジャンルから探す
              </h2>
              <p className="text-ink/50 text-sm">気になるカテゴリのプロジェクトを一覧で</p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-2 md:grid-cols-5 gap-4" staggerDelay={0.08}>
            {GENRES.map(({ genre, label, icon: Icon, iconBg, iconColor, borderHover, bgHover }) => (
              <FadeInItem key={genre}>
                <Link
                  href={`/projects?genre=${genre}`}
                  className={`group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white
                              border-2 border-transparent ${borderHover} ${bgHover}
                              shadow-card hover:shadow-card-hover
                              transition-all duration-250 cursor-pointer`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-base text-ink/80 group-hover:text-ink transition-colors">
                      {label}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-ink/30 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                </Link>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── D. Hot Projects (WHITE) ── */}
      {trending.length > 0 && (
        <section className="py-20 bg-white border-t border-stone-100">
          <div className="max-w-6xl mx-auto px-5">
            <FadeIn>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-ink flex items-center gap-2.5">
                    <Flame className="w-6 h-6 text-brand-500" />
                    今熱いプロジェクト
                  </h2>
                  <p className="text-sm text-ink/50 mt-1">ヒートスコア上位・支援の勢いがあるプロジェクト</p>
                </div>
                <Link href="/trending" className="btn-ghost text-sm">
                  すべて見る
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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

      {/* ── E. How It Works (DARK) ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0A0A10" }}>
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,80,58,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto px-5 relative">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">使い方は4ステップ</h2>
              <p className="text-white/40 text-sm">シンプルに、直感的に</p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

            <FadeInStagger className="grid grid-cols-1 md:grid-cols-4 gap-8" staggerDelay={0.1}>
              {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
                <FadeInItem key={step}>
                  <div className="text-center group">
                    <div className="inline-flex flex-col items-center gap-5">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-500/10 group-hover:border-brand-500/30 transition-all duration-300">
                          <Icon className="w-7 h-7 text-white/50 group-hover:text-brand-400 transition-colors duration-300" />
                        </div>
                        <span className="absolute -top-2 -right-2 font-display text-[10px] font-black text-brand-400 bg-[#0A0A10] border border-brand-800/60 px-1.5 py-0.5 rounded-full">
                          {step}
                        </span>
                      </div>
                      <div>
                        <p className="font-display font-bold text-lg text-white mb-2">{title}</p>
                        <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </section>

      {/* ── F. Platform Comparison CTA (BRAND GRADIENT) ── */}
      <section className="py-12 bg-canvas">
        <div className="max-w-6xl mx-auto px-5">
          <ScaleIn>
            <div
              className="relative overflow-hidden rounded-3xl p-12 text-center"
              style={{ background: "linear-gradient(135deg, #BF3722 0%, #E8503A 50%, #FF6B52 100%)" }}
            >
              {/* Decoration circles */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full pointer-events-none" />

              {/* Sound wave decoration */}
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice">
                <path d="M0 200 Q400 0 800 200" stroke="white" strokeWidth="3" fill="none" />
                <g transform="translate(368, 60)" fill="white">
                  {[0, 9, 18, 27, 36].map((x, i) => (
                    <rect key={i} x={x} y={[8, 2, -4, 2, 8][i]} width="5" height={[16, 24, 30, 24, 16][i]} rx="2.5" />
                  ))}
                </g>
              </svg>

              <div className="relative">
                <p className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  どのプラットフォームがいい？
                </p>
                <p className="text-white/70 mb-8 text-sm">手数料・対応ジャンル・サポート体制を一覧で比較</p>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 bg-white hover:bg-brand-50 text-brand-600 font-bold px-8 py-3 rounded-xl transition-colors shadow-glow"
                >
                  プラットフォームを比較する
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ── G. Featured Projects (WARM LIGHT) ── */}
      {featured.length > 0 && (
        <section className="py-20 bg-canvas-warm border-t border-brand-50">
          <div className="max-w-6xl mx-auto px-5">
            <FadeIn>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-ink flex items-center gap-2.5">
                    <Star className="w-6 h-6 text-brand-500" />
                    注目プロジェクト
                  </h2>
                  <p className="text-sm text-ink/50 mt-1">編集部がピックアップした注目プロジェクト</p>
                </div>
                <Link href="/projects" className="btn-ghost text-sm">
                  すべて見る
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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

      {/* ── H. Final CTA (DARK) ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#0A0A10" }}>
        {/* Arc decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-full opacity-10"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
          >
            <path d="M0 300 Q720 60 1440 300" stroke="#e8503a" strokeWidth="2" fill="none" />
            <path d="M0 300 Q720 120 1440 300" stroke="#e8503a" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: "rgba(232,80,58,0.12)" }}
          />
        </div>

        <div className="max-w-3xl mx-auto px-5 text-center relative">
          <FadeIn>
            <p className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              支援ではなく、参加。<br />
              <span className="text-gradient">文化芸術の熱量を、</span><br />
              あなたの手で後押しする
            </p>
            <p className="text-white/40 text-base mb-12 max-w-lg mx-auto leading-relaxed">
              無料で使える文化芸術プロジェクト横断プラットフォーム。
              あなたの応援が、アーティストの次の一歩になる。
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all shadow-glow active:scale-95"
            >
              プロジェクトを探す
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
