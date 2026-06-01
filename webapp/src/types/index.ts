export type Genre = "music" | "art" | "film" | "theater" | "dance" | "other";
export type ProjectStatus = "active" | "succeeded" | "failed" | "draft";

export interface Platform {
  id: number;
  slug: string;
  name: string;
  url: string;
  fee_rate: number | null;
  affiliate_url: string | null;
}

export interface Artist {
  id: number;
  name: string;
  genre: Genre | null;
  description: string | null;
  image_url: string | null;
  social_x: string | null;
  social_ig: string | null;
}

export interface Project {
  id: number;
  platform_id: number;
  artist_id: number | null;
  title: string;
  description: string | null;
  genre: Genre | null;
  image_url: string | null;
  project_url: string;
  goal_amount: number | null;
  current_amount: number;
  backers_count: number;
  achievement_rate: number;
  start_date: string | null;
  end_date: string | null;
  status: ProjectStatus;
  heat_score: number;
  is_featured: boolean;
  cheer_count: number;
  creator_email: string | null;
  notified_at: string | null;
  platforms?: Platform;
  artists?: Artist;
}

export interface PlatformComparison {
  id: number;
  platform_id: number;
  attribute: string;
  value: string;
  platforms?: Platform;
}

export interface SearchFilters {
  genre?: Genre;
  platform_id?: number;
  status?: ProjectStatus;
  sort?: "heat" | "achievement" | "end_date" | "newest";
  keyword?: string;
}
