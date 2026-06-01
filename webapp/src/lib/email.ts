import type { Project } from "@/types";

const FROM = "A to B <noreply@atob.jp>";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atob.jp";

export async function sendCreatorNotification(project: Project): Promise<boolean> {
  if (!project.creator_email) return false;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email notification");
    return false;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const projectUrl   = `${SITE}/projects/${project.id}`;
  const achievement  = Math.round(project.achievement_rate);
  const platformName = project.platforms?.name ?? "クラウドファンディング";

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, 'Noto Sans JP', sans-serif; background: #f8f7ff; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(109,40,217,0.08); }
    .header { background: linear-gradient(135deg, #7e22ce 0%, #9333ea 100%); padding: 36px 32px; text-align: center; }
    .logo   { color: #fff; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; margin: 0; }
    .tagline{ color: rgba(255,255,255,0.7); font-size: 12px; margin: 4px 0 0; }
    .body   { padding: 32px; }
    .title  { font-size: 20px; font-weight: 800; color: #1a1a2e; margin: 0 0 16px; line-height: 1.4; }
    .text   { font-size: 14px; color: #555; line-height: 1.8; margin: 0 0 20px; }
    .stats  { background: #faf5ff; border-radius: 12px; padding: 20px; margin: 20px 0; display: flex; gap: 12px; }
    .stat   { flex: 1; text-align: center; }
    .stat-value { font-size: 22px; font-weight: 900; color: #7e22ce; display: block; }
    .stat-label { font-size: 11px; color: #888; margin-top: 2px; display: block; }
    .cta    { display: block; background: linear-gradient(135deg, #9333ea, #7e22ce); color: #fff !important;
              text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700;
              font-size: 15px; text-align: center; margin: 24px 0; }
    .share  { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0; }
    .share-title { font-size: 13px; font-weight: 700; color: #166534; margin: 0 0 8px; }
    .share-text  { font-size: 12px; color: #15803d; margin: 0; line-height: 1.6; }
    .footer { background: #f8f7ff; padding: 20px 32px; text-align: center; }
    .footer-text { font-size: 11px; color: #aaa; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="logo">A to B</p>
      <p class="tagline">文化芸術支援プロジェクト比較プラットフォーム</p>
    </div>
    <div class="body">
      <h1 class="title">あなたのプロジェクトが<br>A to B で紹介されています 🎉</h1>
      <p class="text">
        こんにちは。<br><br>
        あなたのプロジェクト「<strong>${project.title}</strong>」が、
        文化芸術支援プロジェクト比較プラットフォーム「A to B」で紹介されています。<br><br>
        A to B は、${platformName} をはじめとする複数のクラウドファンディングプラットフォームの
        文化芸術プロジェクトを横断検索・比較できるサービスです。
        より多くの支援者があなたのプロジェクトを見つけられるよう、拡散をお手伝いしています。
      </p>
      <div class="stats">
        <div class="stat">
          <span class="stat-value">${achievement}%</span>
          <span class="stat-label">達成率</span>
        </div>
        <div class="stat">
          <span class="stat-value">${project.backers_count.toLocaleString()}</span>
          <span class="stat-label">支援者数</span>
        </div>
        <div class="stat">
          <span class="stat-value">${project.heat_score.toFixed(0)}</span>
          <span class="stat-label">ヒートスコア</span>
        </div>
      </div>
      <a class="cta" href="${projectUrl}">A to B でプロジェクトを確認する →</a>
      <div class="share">
        <p class="share-title">📢 SNSでシェアするとさらに広がります</p>
        <p class="share-text">
          A to B のプロジェクトページのURLをあなたのSNSでシェアしていただくと、
          より多くの支援者に届きます。ぜひご活用ください。<br>
          シェア用URL: <strong>${projectUrl}</strong>
        </p>
      </div>
      <p class="text" style="font-size:12px; color:#999;">
        このメールは自動送信されています。ご不明点は info@atob.jp までご連絡ください。
      </p>
    </div>
    <div class="footer">
      <p class="footer-text">© 2026 A to B — 支援ではなく、参加。<br>
        <a href="${SITE}" style="color:#9333ea;">atob.jp</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from:    FROM,
      to:      project.creator_email,
      subject: `「${project.title}」が A to B で紹介されています 🎉`,
      html,
    });
    return !error;
  } catch {
    return false;
  }
}
