import { MOCK_PLATFORMS, MOCK_COMPARISONS } from "@/lib/mock-data";

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
      supabase.from("platforms").select("id, name, url, fee_rate").order("id"),
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

const ATTRIBUTES: Record<string, string> = {
  fee:      "手数料",
  type:     "資金調達タイプ",
  min_goal: "最低目標金額",
  genre:    "対応ジャンル",
  support:  "支援形態",
};

export default async function ComparePage() {
  const { platforms, comparisons } = await getPlatformsAndComparisons();

  const compMap: Record<number, Record<string, string>> = {};
  for (const c of comparisons) {
    if (!compMap[c.platform_id]) compMap[c.platform_id] = {};
    compMap[c.platform_id][c.attribute] = c.value;
  }

  const attrs = Object.keys(ATTRIBUTES);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">プラットフォーム比較</h1>
      <p className="text-sm text-gray-500 mb-8">
        主要クラウドファンディングプラットフォームの手数料・対応ジャンルなどを比較できます。
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-600 text-white">
              <th className="text-left px-4 py-3 font-semibold w-36">項目</th>
              {platforms.map((p) => (
                <th key={p.id} className="text-left px-4 py-3 font-semibold">
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                     className="hover:underline flex items-center gap-1">
                    {p.name} &#8599;
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attrs.map((attr, i) => (
              <tr key={attr} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 font-medium text-gray-700">{ATTRIBUTES[attr]}</td>
                {platforms.map((p) => (
                  <td key={p.id} className="px-4 py-3 text-gray-600">
                    {compMap[p.id]?.[attr] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {platforms.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-bold text-gray-900 text-lg">{p.name}</h2>
              {p.fee_rate && (
                <span className="bg-red-50 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                  手数料 {p.fee_rate}%
                </span>
              )}
            </div>
            <dl className="space-y-2 text-sm">
              {attrs.map((attr) =>
                compMap[p.id]?.[attr] ? (
                  <div key={attr} className="flex gap-2">
                    <dt className="text-gray-400 w-28 shrink-0">{ATTRIBUTES[attr]}</dt>
                    <dd className="text-gray-700">{compMap[p.id][attr]}</dd>
                  </div>
                ) : null
              )}
            </dl>
            <a href={p.url} target="_blank" rel="noopener noreferrer"
               className="mt-4 block text-center text-sm text-brand-600 border border-brand-200 rounded-lg py-2 hover:bg-brand-50 transition-colors">
              {p.name}で支援する &#8599;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
