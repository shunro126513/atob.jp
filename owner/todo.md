# オーナー やることリスト

> **このリストの使い方:**
> - すべてのタスクは「考えなくていい・判断しなくていい・書いてある通りにやるだけ」の状態にしてあります
> - 各タスクに詳細ガイドへのリンクがあります
> - 完了したら `[x]` に変えてください
> - 判断が必要なものは → [`questions.md`](questions.md) に別途まとめています

**最終更新:** 2026-05-31 / CEO ミナミ

---

## 🔴 今すぐできる（アカウント作成）

### Task 1 — X（Twitter）アカウント作成
**所要時間:** 約10分
**詳細ガイド:** [guides/sns_setup.md](guides/sns_setup.md#x-twitter)
```
ハンドル: AtoB_jp
メール:   （業務用メールを使用）
```
- [ ] アカウント作成完了
- [ ] プロフィール文・ヘッダー設定完了（ガイド参照）

---

### Task 2 — Instagram アカウント作成
**所要時間:** 約10分
**詳細ガイド:** [guides/sns_setup.md](guides/sns_setup.md#instagram)
```
ユーザー名: atob.jp（取れなければ atob_jp）
メール:     （業務用メールを使用）
```
- [ ] アカウント作成完了
- [ ] プロアカウント（ビジネス）に切り替え完了
- [ ] プロフィール文設定完了

---

### Task 3 — note アカウント作成
**所要時間:** 約5分
**詳細ガイド:** [guides/sns_setup.md](guides/sns_setup.md#note)
```
ユーザー名: atob（取れなければ atob_jp）
```
- [ ] アカウント作成完了
- [ ] プロフィール設定完了

---

## 🟡 技術セットアップ（デプロイ関連）

### Task 4 — Supabase アカウント作成・DB構築
**所要時間:** 約20分
**詳細ガイド:** [guides/github_vercel_supabase.md](guides/github_vercel_supabase.md#supabase)
- [ ] アカウント作成完了
- [ ] `schema.sql` をSQL Editorに貼り付けて実行完了
- [ ] `seed.sql` を実行完了（テストデータ20件が入る）
- [ ] URL と Anon Key をメモ完了

---

### Task 5 — GitHub リポジトリ作成
**所要時間:** 約10分
**詳細ガイド:** [guides/github_vercel_supabase.md](guides/github_vercel_supabase.md#github)
- [ ] GitHubアカウント確認（既存）または新規作成
- [ ] リポジトリ作成完了（名前: `atob-platform`）
- [ ] `webapp/` フォルダの中身を push 完了

---

### Task 6 — Vercel デプロイ
**所要時間:** 約15分
**詳細ガイド:** [guides/github_vercel_supabase.md](guides/github_vercel_supabase.md#vercel)
- [ ] Vercelアカウント作成（GitHub連携）
- [ ] リポジトリを選択してデプロイ
- [ ] 環境変数（Supabase URL・Key）を設定
- [ ] デプロイ完了・URLで動作確認

---

### Task 7 — ドメイン取得（AtoB.jp）
**所要時間:** 約10分
**詳細ガイド:** [guides/github_vercel_supabase.md](guides/github_vercel_supabase.md#domain)
- [ ] Cloudflare アカウント作成
- [ ] `atob.jp` を検索・購入（年約1,500円）
- [ ] Vercel にカスタムドメインとして追加

---

## 🟢 コンテンツ（ワンタイム作業）

### Task 8 — note 創刊記事の公開
**所要時間:** 約10分
**詳細ガイド:** ドラフト → [`departments/marketing/note_article_01_draft.md`](../departments/marketing/note_article_01_draft.md)
- [ ] 記事内容を確認・修正（必要な場合）
- [ ] note に貼り付けて公開

---

### Task 9 — GitHub Secrets 設定（スクレイピング自動化）
**所要時間:** 約5分（Supabase設定後）
**詳細ガイド:** [guides/github_vercel_supabase.md](guides/github_vercel_supabase.md#secrets)
```
設定するシークレット:
  SUPABASE_URL       = （Supabase の URL）
  SUPABASE_SERVICE_KEY = （Supabase の Service Role Key）
```
- [ ] Secrets 設定完了

---

## ✅ 完了済み

| タスク | 完了日 |
|--------|--------|
| 事業方向性の確定（比較集約プラットフォーム） | 2026-05-31 |
| MVP コード一式完成（`webapp/`） | 2026-05-31 |
| プレローンチ戦略・全スタッフ配置完了 | 2026-05-31 |

---

## 📋 今は不要（将来のタスク）

| タスク | タイミング |
|--------|-----------|
| 開業届の提出 | 事業として収益化する判断をしたとき |
| 青色申告承認申請書 | 開業届提出後 |
| 事業用銀行口座の開設 | 収益が発生し始めたとき |
| CAMPFIRE アフィリエイト申請 | 開業届提出後・サイト公開後 |

---
*管理: CEO ミナミ / 随時更新*
