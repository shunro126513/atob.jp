-- A to B — Supabase DB スキーマ
-- 実行方法: Supabase ダッシュボード > SQL Editor に貼り付けて実行

-- プラットフォームマスタ
CREATE TABLE platforms (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,        -- 'campfire', 'bandcamp', 'enjine'
  name        TEXT NOT NULL,               -- 'CAMPFIRE'
  url         TEXT NOT NULL,
  fee_rate    NUMERIC(4,2),               -- 手数料率 (例: 17.00)
  affiliate_url TEXT,                      -- アフィリエイトリンクのベースURL
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- アーティスト / クリエイター
CREATE TABLE artists (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  genre       TEXT,                        -- 'music', 'art', 'film', 'theater', 'other'
  description TEXT,
  image_url   TEXT,
  social_x    TEXT,
  social_ig   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- プロジェクト（クラウドファンディング案件）
CREATE TABLE projects (
  id               SERIAL PRIMARY KEY,
  platform_id      INTEGER REFERENCES platforms(id),
  artist_id        INTEGER REFERENCES artists(id),
  external_id      TEXT,                   -- 各PF上のID
  title            TEXT NOT NULL,
  description      TEXT,
  genre            TEXT,                   -- 'music', 'art', 'film', 'theater', 'dance', 'other'
  image_url        TEXT,
  project_url      TEXT NOT NULL,          -- 元サイトへのリンク（アフィリエイトURLに変換して表示）
  goal_amount      BIGINT,                 -- 目標金額（円）
  current_amount   BIGINT DEFAULT 0,       -- 現在の支援額
  backers_count    INTEGER DEFAULT 0,      -- 支援者数
  achievement_rate NUMERIC(6,2) DEFAULT 0, -- 達成率（%）
  start_date       DATE,
  end_date         DATE,
  status           TEXT DEFAULT 'active',  -- 'active', 'succeeded', 'failed', 'draft'
  heat_score       NUMERIC(5,2) DEFAULT 0, -- ヒートスコア（0-100）
  is_featured      BOOLEAN DEFAULT FALSE,  -- 特集表示フラグ
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ヒートスコア履歴（日次スナップショット）
CREATE TABLE heat_snapshots (
  id               SERIAL PRIMARY KEY,
  project_id       INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  snapshot_date    DATE NOT NULL,
  current_amount   BIGINT,
  backers_count    INTEGER,
  achievement_rate NUMERIC(6,2),
  heat_score       NUMERIC(5,2),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (project_id, snapshot_date)
);

-- プラットフォーム比較データ
CREATE TABLE platform_comparisons (
  id              SERIAL PRIMARY KEY,
  platform_id     INTEGER REFERENCES platforms(id),
  attribute       TEXT NOT NULL,   -- 'fee', 'min_goal', 'support_type' など
  value           TEXT NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_projects_genre ON projects(genre);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_heat_score ON projects(heat_score DESC);
CREATE INDEX idx_projects_end_date ON projects(end_date);
CREATE INDEX idx_projects_platform ON projects(platform_id);
CREATE INDEX idx_heat_snapshots_project ON heat_snapshots(project_id, snapshot_date DESC);

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security（読み取りは全員、書き込みはサービスロールのみ）
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE heat_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read" ON platforms FOR SELECT USING (TRUE);
CREATE POLICY "public read" ON artists FOR SELECT USING (TRUE);
CREATE POLICY "public read" ON projects FOR SELECT USING (TRUE);
CREATE POLICY "public read" ON heat_snapshots FOR SELECT USING (TRUE);
CREATE POLICY "public read" ON platform_comparisons FOR SELECT USING (TRUE);
