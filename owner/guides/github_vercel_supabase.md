# 技術セットアップ完全ガイド
## GitHub + Vercel + Supabase + ドメイン

> このガイドの通りに操作すれば、技術的な判断なしにデプロイが完了します。
> 全て無料または年約1,500円（ドメインのみ）で完了します。

---

## STEP 0 — 準備するもの

- PC（Mac または Windows）
- メールアドレス（業務用 or Gmail）
- クレジットカード（ドメイン代 年1,500円のみ必要）
- このフォルダ（`/Users/shunro/Documents/test01/webapp/`）

---

## STEP 1 — Supabase {#supabase}

**所要時間: 約20分**

### 1-1. アカウント作成

1. https://supabase.com を開く
2. 「Start your project」をクリック
3. 「Sign up with GitHub」または「Sign up with email」でアカウント作成

### 1-2. プロジェクト作成

1. ダッシュボード右上「New project」をクリック
2. 以下を入力:
   ```
   Name: atob-platform
   Database Password: （安全なパスワードを設定・メモしておく）
   Region: Northeast Asia (Tokyo)
   ```
3. 「Create new project」をクリック（約2分待つ）

### 1-3. スキーマの適用

1. 左メニュー「SQL Editor」を開く
2. `webapp/supabase/schema.sql` の中身を全コピー
3. SQL Editorに貼り付けて「Run」をクリック
4. 「Success」が表示されたら OK

### 1-4. シードデータの入力

1. SQL Editor で新しいタブを開く（「+」ボタン）
2. `webapp/supabase/seed.sql` の中身を全コピー
3. 貼り付けて「Run」をクリック
4. 「Success」が表示されたら OK

### 1-5. API キーの取得・メモ

1. 左メニュー「Settings」→「API」を開く
2. 以下の2つをメモ帳にコピーしておく:
   ```
   Project URL: https://xxxxxxxx.supabase.co
   Project API keys > anon public: eyJ...（長い文字列）
   ```

---

## STEP 2 — GitHub {#github}

**所要時間: 約10分**

### 2-1. アカウント確認 / 作成

- 既存アカウントがある場合: そのままログイン
- ない場合: https://github.com/signup でアカウント作成

### 2-2. リポジトリ作成

1. https://github.com/new を開く
2. 以下を入力:
   ```
   Repository name: atob-platform
   Private: ✅ チェックを入れる（非公開）
   ```
3. 「Create repository」をクリック

### 2-3. コードのアップロード

ターミナル（Mac の場合: アプリ「ターミナル」を開く）で以下を実行:

```bash
# webapp フォルダに移動
cd /Users/shunro/Documents/test01/webapp

# Git の初期化
git init
git add .
git commit -m "Initial commit"

# GitHub に接続（[ユーザー名] を自分のGitHubユーザー名に変える）
git remote add origin https://github.com/[ユーザー名]/atob-platform.git
git branch -M main
git push -u origin main
```

→ GitHubのパスワードを聞かれたら: パスワードではなく「Personal Access Token」が必要です。
   → GitHub → Settings → Developer settings → Personal access tokens → Generate new token
   → Scopes: `repo` にチェック → Generate → 表示されたトークンをコピーしてパスワード欄に貼り付け

---

## STEP 3 — Vercel {#vercel}

**所要時間: 約15分**

### 3-1. アカウント作成

1. https://vercel.com を開く
2. 「Sign Up」→「Continue with GitHub」でGitHubアカウントと連携

### 3-2. プロジェクトのインポート

1. ダッシュボード「Add New...」→「Project」
2. リポジトリ一覧から「atob-platform」を選択
3. 「Import」をクリック

### 3-3. 環境変数の設定（重要）

「Configure Project」画面で「Environment Variables」を展開:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: （STEP 1-5 でメモした Project URL）

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: （STEP 1-5 でメモした anon public キー）
```

→ 2つとも追加したら「Deploy」をクリック

### 3-4. デプロイ確認

2〜3分でデプロイが完了。
表示された URL（例: `atob-platform.vercel.app`）にアクセスしてサイトが表示されれば成功。

---

## STEP 4 — ドメイン取得（AtoB.jp） {#domain}

**所要時間: 約10分 / 費用: 年約1,500円**

### 4-1. Cloudflare アカウント作成

1. https://www.cloudflare.com/ja-jp/ を開く
2. 「サインアップ」でアカウント作成

### 4-2. ドメイン購入

1. ダッシュボード左メニュー「ドメイン登録」→「ドメインの登録」
2. 検索欄に `atob.jp` を入力
3. 利用可能であれば「購入」をクリック
4. 登録者情報を入力（日本の住所・電話番号が必要）
5. クレジットカードで支払い

### 4-3. Vercel にカスタムドメインを追加

1. Vercel ダッシュボード → プロジェクト → Settings → Domains
2. 「Add」をクリック
3. `atob.jp` と `www.atob.jp` を追加
4. 表示された DNS レコードを Cloudflare のDNS設定にコピー
5. 数分〜数時間で反映（最大24時間）

---

## STEP 5 — GitHub Secrets 設定（スクレイピング自動化） {#secrets}

**所要時間: 約5分**

### 5-1. Service Role Key の取得

Supabase ダッシュボード → Settings → API:
```
service_role secret: eyJ...（長い文字列）
← これをメモ（anon キーとは別物）
```

### 5-2. GitHub Secrets に登録

1. GitHub → atob-platform リポジトリ → Settings → Secrets and variables → Actions
2. 「New repository secret」で以下の2つを追加:
   ```
   Name: SUPABASE_URL
   Value: （Project URL）
   
   Name: SUPABASE_SERVICE_KEY
   Value: （service_role キー）
   ```

→ 以降、毎日 AM 3:00（JST）に自動でスクレイピングが走ります。

---

## 完了チェック

- [ ] Supabase: テーブルが作成され、20件のシードデータが入っている
- [ ] GitHub: コードが push されている
- [ ] Vercel: サイトが表示される（URL: ________________）
- [ ] ドメイン: atob.jp でアクセスできる
- [ ] GitHub Secrets: スクレイピングが動作している

---

*作成: CEO ミナミ / CTO ケンジ監修 / 2026-05-31*
