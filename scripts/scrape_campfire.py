"""
CAMPFIRE 公開ページスクレイパー
GitHub Actions で日次実行し、Supabase の heat_snapshots を更新する。

必要な環境変数:
  SUPABASE_URL       - Supabase プロジェクト URL
  SUPABASE_SERVICE_KEY - Service Role Key（書き込み権限）
"""

import os
import time
import datetime
import requests
from bs4 import BeautifulSoup
from supabase import create_client

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_KEY"]

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; AtoB-Bot/1.0; "
        "+https://atob.jp/bot)"
    )
}


def parse_amount(text: str) -> int:
    """'380,000円' → 380000"""
    return int("".join(c for c in text if c.isdigit()) or "0")


def scrape_campfire_project(project_url: str) -> dict | None:
    """CAMPFIRE プロジェクトページから公開情報を取得"""
    try:
        resp = requests.get(project_url, headers=HEADERS, timeout=10)
        if resp.status_code != 200:
            return None
        soup = BeautifulSoup(resp.text, "html.parser")

        # 達成金額
        amount_el = soup.select_one(".achievement-amount, .js-total-amount")
        current_amount = parse_amount(amount_el.text) if amount_el else 0

        # 支援者数
        backers_el = soup.select_one(".supporter-count, .js-supporter-count")
        backers = int("".join(c for c in backers_el.text if c.isdigit()) or "0") if backers_el else 0

        # 達成率
        rate_el = soup.select_one(".achievement-rate, .js-achievement-rate")
        rate = float("".join(c for c in rate_el.text if c.isdigit() or c == ".") or "0") if rate_el else 0.0

        return {
            "current_amount": current_amount,
            "backers_count": backers,
            "achievement_rate": rate,
        }
    except Exception as e:
        print(f"Error scraping {project_url}: {e}")
        return None


def calc_heat_score(current: dict, prev: dict | None, cheer_count: int = 0) -> float:
    """
    ヒートスコア算出（0-100）
    - 支援額の伸び  25%
    - 支援額       25%
    - 達成率の伸び  15%
    - 支援者数伸び  15%
    - 応援スコア   20%  ← ユーザーの1日1回応援アクション
    """
    amount = current["current_amount"]
    rate = current["achievement_rate"]
    backers = current["backers_count"]

    amount_growth = 0.0
    rate_growth = 0.0
    backers_growth = 0.0

    if prev:
        prev_amount = prev.get("current_amount", 0) or 1
        amount_growth = min((amount - prev_amount) / prev_amount * 100, 100)
        prev_rate = prev.get("achievement_rate", 0)
        rate_growth = min(rate - prev_rate, 100)
        prev_backers = prev.get("backers_count", 0) or 1
        backers_growth = min((backers - prev_backers) / prev_backers * 100, 100)

    amount_score = min(amount / 1_000_000 * 100, 100)
    # 応援スコア: 100応援で満点（対数的に上昇）
    import math
    cheer_score = min(math.log1p(cheer_count) / math.log1p(100) * 100, 100)

    score = (
        amount_growth * 0.25
        + amount_score * 0.25
        + rate_growth  * 0.15
        + backers_growth * 0.15
        + cheer_score    * 0.20
    )
    return round(min(max(score, 0), 100), 2)


def main():
    today = datetime.date.today().isoformat()

    # CAMPFIRE のアクティブプロジェクトを取得
    res = supabase.table("projects").select(
        "id, project_url, current_amount, backers_count, achievement_rate"
    ).eq("status", "active").execute()

    projects = res.data or []
    print(f"Scraping {len(projects)} active projects...")

    for project in projects:
        pid = project["id"]
        url = project["project_url"]

        # CAMPFIRE 以外はスキップ（スラッグ判定）
        if "camp-fire.jp" not in url:
            continue

        scraped = scrape_campfire_project(url)
        if not scraped:
            continue

        # 前日スナップショット取得
        prev_res = supabase.table("heat_snapshots").select(
            "current_amount, backers_count, achievement_rate"
        ).eq("project_id", pid).order("snapshot_date", desc=True).limit(1).execute()
        prev = prev_res.data[0] if prev_res.data else None

        # 応援スコア取得（今日の応援数）
        cheer_res = supabase.table("project_cheers").select(
            "id", count="exact"
        ).eq("project_id", pid).eq("cheer_date", today).execute()
        cheer_count = cheer_res.count or 0

        heat = calc_heat_score(scraped, prev, cheer_count)

        # スナップショット保存
        supabase.table("heat_snapshots").upsert({
            "project_id": pid,
            "snapshot_date": today,
            **scraped,
            "heat_score": heat,
        }).execute()

        # projects テーブル更新
        supabase.table("projects").update({
            **scraped,
            "heat_score": heat,
        }).eq("id", pid).execute()

        print(f"  [{pid}] heat={heat} amount={scraped['current_amount']:,}")
        time.sleep(1.5)  # レート制限

    print("Done.")


if __name__ == "__main__":
    main()
