-- Migration: 応援スコア + クリエイターメール
-- Supabase SQL Editor で schema.sql 適用後に実行する

-- 1. projects に応援カウントカラムを追加
ALTER TABLE projects ADD COLUMN IF NOT EXISTS cheer_count INTEGER DEFAULT 0;

-- 2. projects にクリエイターメールカラムを追加
ALTER TABLE projects ADD COLUMN IF NOT EXISTS creator_email TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS notified_at TIMESTAMPTZ;  -- メール送信済み日時

-- 3. 応援テーブル（1日1回・IP単位）
CREATE TABLE IF NOT EXISTS project_cheers (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  ip_hash     TEXT NOT NULL,
  cheer_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (project_id, ip_hash, cheer_date)
);

-- 4. 応援カウント自動更新トリガー
CREATE OR REPLACE FUNCTION increment_cheer_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE projects SET cheer_count = cheer_count + 1 WHERE id = NEW.project_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_new_cheer ON project_cheers;
CREATE TRIGGER on_new_cheer
  AFTER INSERT ON project_cheers
  FOR EACH ROW EXECUTE FUNCTION increment_cheer_count();

-- 5. RLS
ALTER TABLE project_cheers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert cheer" ON project_cheers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "public read cheers"      ON project_cheers FOR SELECT USING (TRUE);

-- 6. インデックス
CREATE INDEX IF NOT EXISTS idx_cheers_project_date ON project_cheers(project_id, cheer_date);
CREATE INDEX IF NOT EXISTS idx_projects_cheer ON projects(cheer_count DESC);
