import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "#0A0A10" }}>
      <div className="text-center max-w-md">
        <p className="font-display text-7xl font-black text-white/[0.07] mb-6 select-none">404</p>
        <h1 className="font-display text-2xl font-bold text-white mb-3">
          ページが見つかりません
        </h1>
        <p className="text-white/40 text-sm leading-relaxed mb-8">
          お探しのページは移動または削除された可能性があります。
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-brand-400/50 text-white/60 hover:text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            ホームへ戻る
          </Link>
          <Link href="/projects" className="btn-primary text-sm">
            プロジェクトを見る
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
