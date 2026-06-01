# オーナー やることリスト

**最終更新:** 2026-06-01 / CEO ミナミ

---

## 🔴 残り1つ — ドメインを繋げば完成

### Task 1 — ドメイン取得・Vercel 連携（AtoB.jp）
**所要時間:** 約10分 / 費用: 年約1,500円

```
1. https://cloudflare.com → ドメイン登録 → atob.jp を検索・購入
2. Vercel → shunros-projects/atob-jp → Settings → Domains
   → atob.jp を追加
3. Cloudflare DNS に Vercel 指定のレコードを追加
   （Vercel が表示する A レコードまたは CNAME をコピーするだけ）
```

- [ ] atob.jp ドメイン購入完了
- [ ] Vercel にドメイン設定完了
- [ ] https://atob.jp でアクセスできる

---

## 🟢 将来のタスク（今は不要）

| タスク | タイミング |
|--------|-----------|
| 開業届の提出 | 収益化を判断したとき |
| CAMPFIRE アフィリエイト申請 | 開業届提出後 |
| A8.net メディア登録 | サイト公開後 |
| Resend 登録・メール通知有効化 | クリエイターへの通知を始めるとき |
| GitHub Secrets（スクレイピング） | service_role キーを Supabase から取得して設定 |

---

## ✅ 完了済み（全件確認済み）

| タスク | 確認方法 |
|--------|---------|
| **本番デプロイ完了** | https://atob-jp.vercel.app で HTTP 200 確認 |
| Vercel 環境変数設定 | npx vercel env ls で2変数確認済み |
| Supabase セットアップ・SQL実行 | API接続・20件データ・project_cheersテーブル確認 |
| GitHub リポジトリ作成・push | git log で3コミット確認 |
| X・Instagram・note アカウント作成 | オーナー確認 |
| note 創刊記事の公開 | オーナー確認 |
| GitHub Secrets 設定 | オーナー確認 |
| MVP コード完成（全7ページ） | ビルド成功・全ページ 200 確認 |
| プライバシーポリシー・利用規約 | ページ実装・デプロイ確認 |

---
*管理: CEO ミナミ / 随時更新*
