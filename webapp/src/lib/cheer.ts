import { supabase } from "./supabase";

export async function getCheerCount(projectId: number): Promise<number> {
  const { data } = await supabase
    .from("projects")
    .select("cheer_count")
    .eq("id", projectId)
    .single();
  return data?.cheer_count ?? 0;
}

export async function hasCheerableToday(projectId: number, ipHash: string): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await supabase
    .from("project_cheers")
    .select("id")
    .eq("project_id", projectId)
    .eq("ip_hash", ipHash)
    .eq("cheer_date", today)
    .maybeSingle();
  return !data; // true = まだ応援できる
}

export async function addCheer(projectId: number, ipHash: string): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);
  const { error } = await supabase.from("project_cheers").insert({
    project_id: projectId,
    ip_hash:    ipHash,
    cheer_date: today,
  });
  return !error;
}
