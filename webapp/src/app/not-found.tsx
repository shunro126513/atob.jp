import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        {/* Icon mark */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center">
            <AlertCircle className="w-9 h-9 text-brand-400" />
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-display font-black text-xs text-brand-400 bg-white border border-brand-100 px-2 py-0.5 rounded-full">
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
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/projects" className="btn-outline text-sm">
            プロジェクトを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
