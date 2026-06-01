import { MOCK_PLATFORMS, MOCK_COMPARISONS } from "@/lib/mock-data";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/FadeIn";
import { ArrowUpRight, Info } from "lucide-react";

export const revalidate = 86400;

function isMockMode() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return !url || url.includes("placeholder");
}

async function getPlatformsAndComparisons() {
  if (isMockMode()) {
    return { platforms: MOCK_PLATFORMS, comparisons: MOCK_COMPARISONS };
  }
  try {
    const { supabase } = await import("@/lib/supabase");
    const [pRes, cRes] = await Promise.all([
      supabase.from("platforms").select("id, slug, name, url, fee_rate").order("id"),
      supabase.from("platform_comparisons").select("platform_id, attribute, value"),
    ]);
    return {
      platforms: pRes.data ?? MOCK_PLATFORMS,
      comparisons: cRes.data ?? MOCK_COMPARISONS,
    };
  } catch {
    return { platforms: MOCK_PLATFORMS, comparisons: MOCK_COMPARISONS };
  }
}

const ATTRIBUTES: Record<string, { label: string; icon?: string }> = {
  fee:       { label: "手数料" },
  type:      { label: "資金調達タイプ" },
  min_goal:  { label: "最低目標金額" },
  genre:     { label: "対応ジャンル" },
  support:   { label: "支援形態" },
};

const PLATFORM_COLORS: Record<string, string> = {
  campfire:       "#e8503a",
  bandcamp:       "#38bdf8",
  enjine:         "#fbbf24",
  readyfor:       "#34d399",
  motion_gallery: "#a78bfa",
};

function getPlatformColor(slug: string | null | undefined): string {
  return PLATFORM_COLORS[slug ?? ""] ?? "#e8503a";
}

export default async function ComparePage() {
  const { platforms, comparisons } = await getPlatformsAndComparisons();

  const compMap: Record<number, Record<string, string>> = {};
  for (const c of comparisons) {
    if (!compMap[c.platform_id]) compMap[c.platform_id] = {};
    compMap[c.platform_id][c.attribute] = c.value;
  }

  const attrs = Object.keys(ATTRIBUTES);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A10" }}>
      {/* Header */}
      <div className="relative border-b border-white/[0.07]" style={{ background: "#0D0D18" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(167,139,250,0.06) 0%, transparent 60%)" }}
        />
        <div className="max-w-6xl mx-auto px-5 py-10 relative">
          <FadeIn>
            <nav className="flex items-center gap-2 text-xs text-white/30 font-medium mb-5">
              <a href="/" className="hover:text-brand-400 transition-colors">ホーム</a>
              <span>/</span>
              <span className="text-white/50">プラットフォーム比較</span>
            </nav>
            <h1 className="font-display text-2xl md:text-3xl font-black text-white mb-3">
              プラットフォーム比較
            </h1>
            <p className="text-white/40 text-sm max-w-lg">
              主要クラウドファンディングプラットフォームの手数料・対応ジャンルなどを比較できます。
              最新情報は各プラットフォームにてご確認ください。
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10 space-y-12">
        {/* Desktop table */}
        <FadeIn>
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                    <th className="text-left px-5 py-4 text-[11px] font-bold text-white/40 uppercase tracking-widest w-36 border-b border-white/[0.06]">
                      比較項目
                    </th>
                    {platforms.map((p) => {
                      const color = getPlatformColor(p.slug ?? "");
                      return (
                        <th key={p.id} className="text-left px-5 py-4 border-b border-white/[0.06]">
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-sm hover:opacity-80 transition-opacity"
                            style={{ color }}
                          >
                            {p.name}
                            <ArrowUpRight className="w-3 h-3 opacity-60" />
                          </a>
                          {p.fee_rate && (
                            <p className="text-[10px] text-white/30 mt-0.5">手数料 {p.fee_rate}%</p>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {attrs.map((attr, i) => (
                    <tr key={attr} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                      <td className="px-5 py-4 text-xs font-semibold text-white/50 border-b border-white/[0.04]">
                        {ATTRIBUTES[attr].label}
                      </td>
                      {platforms.map((p) => (
                        <td key={p.id} className="px-5 py-4 text-xs text-white/65 border-b border-white/[0.04] leading-relaxed">
                          {compMap[p.id]?.[attr] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        {/* Platform cards (desktop + mobile) */}
        <div>
          <FadeIn>
            <h2 className="font-display text-lg font-bold text-white mb-6">
              各プラットフォーム詳細
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {platforms.map((p) => {
              const color = getPlatformColor(p.slug ?? "");
              return (
                <FadeInItem key={p.id}>
                  <div
                    className="relative rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-300 hover:border-opacity-40 group"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    {/* Top color bar */}
                    <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${color}80, ${color}30, transparent)` }} />

                    <div className="p-6">
                      {/* Name + fee */}
                      <div className="flex items-start justify-between mb-5">
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display font-bold text-lg hover:underline underline-offset-2 transition-opacity hover:opacity-80"
                          style={{ color }}
                        >
                          {p.name}
                        </a>
                        {p.fee_rate && (
                          <span
                            className="text-sm font-black px-3 py-1 rounded-xl"
                            style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}
                          >
                            {p.fee_rate}%
                          </span>
                        )}
                      </div>

                      {/* Attributes */}
                      <dl className="space-y-3">
                        {attrs.map((attr) =>
                          compMap[p.id]?.[attr] ? (
                            <div key={attr} className="flex gap-3">
                              <dt className="text-[11px] text-white/30 font-semibold w-24 shrink-0 pt-0.5">
                                {ATTRIBUTES[attr].label}
                              </dt>
                              <dd className="text-xs text-white/65 leading-relaxed">
                                {compMap[p.id][attr]}
                              </dd>
                            </div>
                          ) : null
                        )}
                      </dl>

                      {/* CTA */}
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold transition-all"
                        style={{
                          borderColor: `${color}30`,
                          color: `${color}`,
                          background: `${color}08`,
                        }}
                      >
                        {p.name} で支援する
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>

        {/* Note */}
        <FadeIn>
          <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
            <Info className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
            <p className="text-xs text-white/30 leading-relaxed">
              手数料・サービス内容は変更される場合があります。掲載情報は参考値です。
              支援前に各プラットフォームの最新情報をご確認ください。
              A to B 上では決済は行いません。実際の支援は各プラットフォームのサイトで完結します。
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
