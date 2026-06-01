import type { Project, SearchFilters } from "@/types";
import { MOCK_PROJECTS } from "./mock-data";

function isMockMode() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return !url || url.includes("placeholder");
}

async function fetchFromSupabase(filters: SearchFilters): Promise<Project[]> {
  const { supabase } = await import("./supabase");
  let query = supabase
    .from("projects")
    .select("*, platforms(*), artists(*)")
    .eq("status", filters.status ?? "active");

  if (filters.genre) query = query.eq("genre", filters.genre);
  if (filters.platform_id) query = query.eq("platform_id", filters.platform_id);
  if (filters.keyword) {
    query = query.or(
      `title.ilike.%${filters.keyword}%,description.ilike.%${filters.keyword}%`
    );
  }
  switch (filters.sort) {
    case "achievement": query = query.order("achievement_rate", { ascending: false }); break;
    case "end_date":    query = query.order("end_date", { ascending: true }); break;
    case "newest":      query = query.order("created_at", { ascending: false }); break;
    default:            query = query.order("heat_score", { ascending: false });
  }
  const { data, error } = await query.limit(50);
  if (error) throw error;
  return data ?? [];
}

function filterMock(filters: SearchFilters): Project[] {
  let list = [...MOCK_PROJECTS].filter(
    (p) => p.status === (filters.status ?? "active")
  );
  if (filters.genre) list = list.filter((p) => p.genre === filters.genre);
  if (filters.platform_id) list = list.filter((p) => p.platform_id === filters.platform_id);
  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(kw) ||
        (p.description ?? "").toLowerCase().includes(kw)
    );
  }
  switch (filters.sort) {
    case "achievement": list.sort((a, b) => b.achievement_rate - a.achievement_rate); break;
    case "end_date":    list.sort((a, b) => (a.end_date ?? "").localeCompare(b.end_date ?? "")); break;
    case "newest":      list.sort((a, b) => b.id - a.id); break;
    default:            list.sort((a, b) => b.heat_score - a.heat_score);
  }
  return list.slice(0, 50);
}

export async function getProjects(filters: SearchFilters = {}): Promise<Project[]> {
  if (isMockMode()) return filterMock(filters);
  try { return await fetchFromSupabase(filters); } catch { return filterMock(filters); }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (isMockMode()) {
    return MOCK_PROJECTS.filter((p) => p.is_featured && p.status === "active")
      .sort((a, b) => b.heat_score - a.heat_score)
      .slice(0, 6);
  }
  try {
    const { supabase } = await import("./supabase");
    const { data, error } = await supabase
      .from("projects").select("*, platforms(*), artists(*)")
      .eq("is_featured", true).eq("status", "active")
      .order("heat_score", { ascending: false }).limit(6);
    if (error) throw error;
    return data ?? [];
  } catch {
    return MOCK_PROJECTS.filter((p) => p.is_featured && p.status === "active")
      .sort((a, b) => b.heat_score - a.heat_score).slice(0, 6);
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  if (isMockMode()) return MOCK_PROJECTS.find((p) => p.id === id) ?? null;
  try {
    const { supabase } = await import("./supabase");
    const { data, error } = await supabase
      .from("projects").select("*, platforms(*), artists(*)")
      .eq("id", id).single();
    if (error) return null;
    return data;
  } catch {
    return MOCK_PROJECTS.find((p) => p.id === id) ?? null;
  }
}

export async function getTrendingProjects(): Promise<Project[]> {
  if (isMockMode()) {
    return MOCK_PROJECTS.filter((p) => p.status === "active" && p.heat_score >= 70)
      .sort((a, b) => b.heat_score - a.heat_score).slice(0, 10);
  }
  try {
    const { supabase } = await import("./supabase");
    const { data, error } = await supabase
      .from("projects").select("*, platforms(*), artists(*)")
      .eq("status", "active").gte("heat_score", 70)
      .order("heat_score", { ascending: false }).limit(10);
    if (error) throw error;
    return data ?? [];
  } catch {
    return MOCK_PROJECTS.filter((p) => p.status === "active" && p.heat_score >= 70)
      .sort((a, b) => b.heat_score - a.heat_score).slice(0, 10);
  }
}

export function calcDaysLeft(endDate: string | null): number | null {
  if (!endDate) return null;
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("ja-JP").format(amount) + "円";
}
