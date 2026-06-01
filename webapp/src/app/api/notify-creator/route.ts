import { NextRequest, NextResponse } from "next/server";
import { getProjectById } from "@/lib/projects";
import { sendCreatorNotification } from "@/lib/email";
import { supabase } from "@/lib/supabase";

// 管理者のみ呼べるエンドポイント（APIキー認証）
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { projectId } = await req.json().catch(() => ({}));
  if (!projectId) {
    return NextResponse.json({ error: "projectId required" }, { status: 400 });
  }

  const project = await getProjectById(Number(projectId));
  if (!project) {
    return NextResponse.json({ error: "project not found" }, { status: 404 });
  }

  if (!project.creator_email) {
    return NextResponse.json({ ok: false, reason: "no_creator_email" });
  }

  // 重複送信防止
  const { data: existing } = await supabase
    .from("projects")
    .select("notified_at")
    .eq("id", projectId)
    .single();

  if (existing?.notified_at) {
    return NextResponse.json({ ok: false, reason: "already_notified", at: existing.notified_at });
  }

  const sent = await sendCreatorNotification(project);
  if (sent) {
    await supabase
      .from("projects")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", projectId);
    return NextResponse.json({ ok: true, projectId, email: project.creator_email });
  }

  return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 500 });
}

// 未通知プロジェクトの一括通知
export async function GET(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, creator_email, notified_at, platforms(*), artists(*), heat_score, achievement_rate, backers_count, current_amount, end_date, status, is_featured, genre, image_url, project_url")
    .not("creator_email", "is", null)
    .is("notified_at", null)
    .eq("status", "active")
    .limit(20);

  if (!projects?.length) {
    return NextResponse.json({ ok: true, sent: 0, message: "No unnotified projects" });
  }

  let sent = 0;
  for (const project of projects) {
    const ok = await sendCreatorNotification(project as any);
    if (ok) {
      await supabase
        .from("projects")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", project.id);
      sent++;
    }
    await new Promise((r) => setTimeout(r, 200)); // レートリミット
  }

  return NextResponse.json({ ok: true, sent, total: projects.length });
}
