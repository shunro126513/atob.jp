import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 mt-20">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Logo size="sm" useImage={false} />
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              文化芸術支援プロジェクトの<br />比較・集約プラットフォーム
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm text-white mb-3">ジャンル</p>
            <ul className="space-y-2 text-sm">
              {[["music","音楽"],["art","アート"],["film","映像"],["theater","演劇"],["dance","ダンス"]].map(([g, l]) => (
                <li key={g}><Link href={`/projects?genre=${g}`} className="hover:text-brand-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm text-white mb-3">サービス</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/trending" className="hover:text-brand-400 transition-colors">トレンド</Link></li>
              <li><Link href="/compare" className="hover:text-brand-400 transition-colors">PF比較</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm text-white mb-3">連携PF</p>
            <ul className="space-y-2 text-sm">
              {["CAMPFIRE","Bandcamp","ENjiNE","READYFOR","MOTION GALLERY"].map((p) => (
                <li key={p} className="text-white/40">{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="arc-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>&copy; 2026 A to B — 支援ではなく、参加。</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-400 transition-colors">プライバシーポリシー</Link>
            <Link href="/terms" className="hover:text-brand-400 transition-colors">利用規約</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
