import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        {/* Logo mark */}
        <div className="relative inline-block mb-8">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto opacity-20">
            <circle cx="40" cy="40" r="38" stroke="#e8503a" strokeWidth="3" />
            <path d="M25 55 Q40 20 55 55" stroke="#e8503a" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display font-black text-2xl text-brand-400">
            404
          </span>
        </div>

        <h1 className="font-display text-3xl font-bold text-ink mb-3">
          ページが見つかりません
        </h1>
        <p className="text-ink/50 text-sm leading-relaxed mb-8">
          お探しのページは移動または削除された可能性があります。<br />
          URLをご確認ください。
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary text-sm">
            ホームに戻る
          </Link>
          <Link href="/projects" className="btn-outline text-sm">
            プロジェクトを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
