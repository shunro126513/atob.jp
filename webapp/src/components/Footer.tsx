import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <p className="font-black text-xl text-brand-600 mb-2">A to B</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              文化芸術支援プロジェクトの<br />比較・集約プラットフォーム
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-3">プロジェクト</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/projects?genre=music" className="hover:text-brand-600">音楽</Link></li>
              <li><Link href="/projects?genre=art" className="hover:text-brand-600">アート</Link></li>
              <li><Link href="/projects?genre=film" className="hover:text-brand-600">映像</Link></li>
              <li><Link href="/projects?genre=theater" className="hover:text-brand-600">演劇</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-3">サービス</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/trending" className="hover:text-brand-600">トレンド</Link></li>
              <li><Link href="/compare" className="hover:text-brand-600">プラットフォーム比較</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-3">連携PF</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>CAMPFIRE</li>
              <li>Bandcamp</li>
              <li>ENjiNE</li>
              <li>READYFOR</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-3 text-xs text-gray-400">
          <Link href="/privacy" className="hover:text-brand-600">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-brand-600">利用規約</Link>
        </div>
        <p className="text-xs text-gray-400 text-center">
          &copy; 2026 A to B. 支援ではなく、参加。
        </p>
      </div>
    </footer>
  );
}
