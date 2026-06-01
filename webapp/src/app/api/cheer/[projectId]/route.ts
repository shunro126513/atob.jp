import { NextRequest, NextResponse } from "next/server";
import { addCheer, hasCheerableToday } from "@/lib/cheer";

async function hashIP(ip: string): Promise<string> {
  const salt = process.env.HASH_SALT ?? "atob-cheer-salt-2026";
  const data = new TextEncoder().encode(ip + salt);
  const buf  = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 40);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const projectId = Number(params.projectId);
  if (!projectId || isNaN(projectId)) {
    return NextResponse.json({ error: "invalid project id" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const ipHash = await hashIP(ip);

  const canCheer = await hasCheerableToday(projectId, ipHash);
  if (!canCheer) {
    return NextResponse.json({ ok: false, reason: "already_cheered" }, { status: 200 });
  }

  const success = await addCheer(projectId, ipHash);
  if (!success) {
    return NextResponse.json({ ok: false, reason: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
