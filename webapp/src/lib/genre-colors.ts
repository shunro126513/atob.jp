type Genre = "music" | "art" | "film" | "theater" | "dance" | "other";

export const GENRE_COLORS: Record<Genre, { primary: string; glow: string; bg: string }> = {
  music:   { primary: "#a78bfa", glow: "rgba(167,139,250,0.25)", bg: "rgba(167,139,250,0.07)" },
  art:     { primary: "#fb7185", glow: "rgba(251,113,133,0.25)", bg: "rgba(251,113,133,0.07)" },
  film:    { primary: "#38bdf8", glow: "rgba(56,189,248,0.25)",  bg: "rgba(56,189,248,0.07)"  },
  theater: { primary: "#fbbf24", glow: "rgba(251,191,36,0.25)",  bg: "rgba(251,191,36,0.07)"  },
  dance:   { primary: "#34d399", glow: "rgba(52,211,153,0.25)",  bg: "rgba(52,211,153,0.07)"  },
  other:   { primary: "#a8a29e", glow: "rgba(168,162,158,0.15)", bg: "rgba(168,162,158,0.05)" },
};
