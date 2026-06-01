"use client";
import { motion, useReducedMotion } from "framer-motion";
export { GENRE_COLORS } from "@/lib/genre-colors";

type Genre = "music" | "art" | "film" | "theater" | "dance" | "other";

interface VisualProps {
  animated?: boolean;
  size?: number;
  className?: string;
}

function MusicVisual({ animated = true, size = 80 }: VisualProps) {
  const reduce = useReducedMotion();
  const bars = [0.4, 0.7, 1.0, 0.8, 0.5, 0.9, 0.6, 1.0, 0.7, 0.4];
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="overflow-visible">
      <defs>
        <linearGradient id="music-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Circular rings */}
      {[28, 20, 12].map((r, i) => (
        <motion.circle
          key={i} cx="40" cy="40" r={r}
          stroke="rgba(167,139,250,0.2)" strokeWidth="1" fill="none"
          animate={animated && !reduce ? { r: [r, r + 3, r], opacity: [0.3, 0.6, 0.3] } : {}}
          transition={{ duration: 2.5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}
      {/* Waveform bars */}
      {bars.map((h, i) => {
        const x = 10 + i * 6;
        const barH = h * 30;
        return (
          <motion.rect
            key={i}
            x={x} y={40 - barH / 2}
            width="3.5" height={barH}
            rx="2"
            fill="url(#music-grad)"
            animate={animated && !reduce ? { height: [barH, barH * 0.5, barH], y: [40 - barH / 2, 40 - barH * 0.25, 40 - barH / 2] } : {}}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
          />
        );
      })}
    </svg>
  );
}

function ArtVisual({ animated = true, size = 80 }: VisualProps) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="overflow-visible">
      <defs>
        <radialGradient id="art-grad1" cx="30%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="art-grad2" cx="65%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="art-grad3" cx="50%" cy="70%" r="40%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.ellipse cx="30" cy="30" rx="22" ry="18" fill="url(#art-grad1)"
        animate={animated && !reduce ? { rx: [22, 25, 22], ry: [18, 22, 18] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse cx="52" cy="50" rx="18" ry="20" fill="url(#art-grad2)"
        animate={animated && !reduce ? { rx: [18, 22, 18], ry: [20, 16, 20] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.ellipse cx="38" cy="58" rx="14" ry="12" fill="url(#art-grad3)"
        animate={animated && !reduce ? { rx: [14, 18, 14] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* Brush stroke lines */}
      <motion.path d="M 15 55 Q 35 40 55 48 T 70 35" stroke="rgba(251,113,133,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"
        animate={animated && !reduce ? { pathLength: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function FilmVisual({ animated = true, size = 80 }: VisualProps) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="overflow-visible">
      <defs>
        <linearGradient id="film-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Film frame outer rect */}
      <rect x="12" y="12" width="56" height="56" rx="4" stroke="rgba(56,189,248,0.3)" strokeWidth="2" fill="none" />
      {/* Sprockets */}
      {[18, 30, 42, 54, 66].map((y, i) => (
        <rect key={`l${i}`} x="14" y={y - 3} width="6" height="6" rx="1" fill="rgba(56,189,248,0.25)" />
      ))}
      {[18, 30, 42, 54, 66].map((y, i) => (
        <rect key={`r${i}`} x="60" y={y - 3} width="6" height="6" rx="1" fill="rgba(56,189,248,0.25)" />
      ))}
      {/* Light cone */}
      <motion.path d="M 40 10 L 20 65 L 60 65 Z" fill="url(#film-grad)" opacity="0.2"
        animate={animated && !reduce ? { opacity: [0.15, 0.35, 0.15] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Center "lens" circle */}
      <motion.circle cx="40" cy="40" r="10" stroke="rgba(99,102,241,0.6)" strokeWidth="2" fill="rgba(99,102,241,0.1)"
        animate={animated && !reduce ? { r: [10, 12, 10] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="40" cy="40" r="4" fill="rgba(99,102,241,0.5)" />
    </svg>
  );
}

function TheaterVisual({ animated = true, size = 80 }: VisualProps) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="overflow-visible">
      <defs>
        <radialGradient id="theater-spot" cx="50%" cy="10%" r="60%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="theater-curtain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Stage spotlight */}
      <motion.path d="M 40 8 L 12 72 L 68 72 Z" fill="url(#theater-spot)"
        animate={animated && !reduce ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Stage floor */}
      <line x1="8" y1="72" x2="72" y2="72" stroke="rgba(251,191,36,0.4)" strokeWidth="2" />
      {/* Left curtain */}
      <motion.path d="M 8 0 Q 20 30 14 72 L 8 72 Z" fill="url(#theater-curtain)"
        animate={animated && !reduce ? { d: ["M 8 0 Q 20 30 14 72 L 8 72 Z", "M 8 0 Q 18 35 16 72 L 8 72 Z", "M 8 0 Q 20 30 14 72 L 8 72 Z"] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Right curtain */}
      <motion.path d="M 72 0 Q 60 30 66 72 L 72 72 Z" fill="url(#theater-curtain)"
        animate={animated && !reduce ? { d: ["M 72 0 Q 60 30 66 72 L 72 72 Z", "M 72 0 Q 62 35 64 72 L 72 72 Z", "M 72 0 Q 60 30 66 72 L 72 72 Z"] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      {/* Light source circle */}
      <motion.circle cx="40" cy="10" r="5" fill="#fbbf24" opacity="0.7"
        animate={animated && !reduce ? { opacity: [0.7, 1, 0.7], r: [5, 6, 5] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function DanceVisual({ animated = true, size = 80 }: VisualProps) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className="overflow-visible">
      <defs>
        <linearGradient id="dance-grad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="dance-grad2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Motion path 1 */}
      <motion.path d="M 10 60 Q 20 20 40 35 T 70 15" stroke="url(#dance-grad1)" strokeWidth="2.5"
        fill="none" strokeLinecap="round"
        animate={animated && !reduce ? { d: ["M 10 60 Q 20 20 40 35 T 70 15", "M 10 55 Q 25 15 40 40 T 70 20", "M 10 60 Q 20 20 40 35 T 70 15"] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Motion path 2 */}
      <motion.path d="M 10 70 Q 30 45 50 55 T 72 35" stroke="url(#dance-grad2)" strokeWidth="2"
        fill="none" strokeLinecap="round"
        animate={animated && !reduce ? { d: ["M 10 70 Q 30 45 50 55 T 72 35", "M 10 65 Q 35 40 50 60 T 72 40", "M 10 70 Q 30 45 50 55 T 72 35"] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      {/* Motion dots along paths */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle key={i} r="3" fill="rgba(52,211,153,0.7)"
          animate={animated && !reduce ? {
            cx: [10 + i * 18, 15 + i * 18, 10 + i * 18],
            cy: [60 - i * 12, 55 - i * 10, 60 - i * 12],
          } : { cx: 10 + i * 18, cy: 60 - i * 12 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
    </svg>
  );
}

function OtherVisual({ animated = true, size = 80 }: VisualProps) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <motion.circle cx="40" cy="40" r="25" stroke="rgba(168,162,158,0.3)" strokeWidth="2" fill="none"
        animate={animated && !reduce ? { r: [25, 28, 25] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="40" cy="40" r="6" fill="rgba(168,162,158,0.4)" />
    </svg>
  );
}

const VISUALS: Record<Genre, React.FC<VisualProps>> = {
  music: MusicVisual,
  art: ArtVisual,
  film: FilmVisual,
  theater: TheaterVisual,
  dance: DanceVisual,
  other: OtherVisual,
};


export function GenreVisual({ genre, animated = true, size = 80, className }: VisualProps & { genre: Genre }) {
  const Visual = VISUALS[genre] ?? OtherVisual;
  return <Visual animated={animated} size={size} className={className} />;
}
