"use client";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  animate?: boolean;
}

export function HeatRing({
  score,
  size = 64,
  strokeWidth = 5,
  showLabel = true,
  animate: doAnimate = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();
  const [displayed, setDisplayed] = useState(doAnimate ? 0 : score);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const offset = circumference - (clampedScore / 100) * circumference;

  let strokeColor: string;
  let glowColor: string;
  let labelColor: string;
  if (score >= 80) {
    strokeColor = "#e8503a";
    glowColor = "rgba(232,80,58,0.5)";
    labelColor = "#e8503a";
  } else if (score >= 50) {
    strokeColor = "#f97316";
    glowColor = "rgba(249,115,22,0.4)";
    labelColor = "#f97316";
  } else {
    strokeColor = "#60a5fa";
    glowColor = "rgba(96,165,250,0.3)";
    labelColor = "#60a5fa";
  }

  useEffect(() => {
    if (!doAnimate || shouldReduce) {
      setDisplayed(score);
      return;
    }
    if (!isInView) return;
    const start = performance.now();
    const duration = 1000;
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(ease * score));
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [isInView, score, doAnimate, shouldReduce]);

  const cx = size / 2;
  const cy = size / 2;

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 overflow-visible">
        <defs>
          <filter id={`glow-${size}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: shouldReduce ? offset : offset } : { strokeDashoffset: circumference }}
          transition={{ duration: shouldReduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
      </svg>
      {showLabel && (
        <span
          className="relative z-10 text-xs font-black tabular-nums leading-none"
          style={{ color: labelColor, fontSize: Math.max(10, size * 0.22) }}
        >
          {displayed}
        </span>
      )}
    </div>
  );
}

export function HeatRingLarge({
  score,
  rank,
}: {
  score: number;
  rank?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();

  const size = 96;
  const strokeWidth = 6;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  let strokeColor = score >= 80 ? "#e8503a" : score >= 50 ? "#f97316" : "#60a5fa";
  let glowColor = score >= 80 ? "rgba(232,80,58,0.6)" : score >= 50 ? "rgba(249,115,22,0.5)" : "rgba(96,165,250,0.4)";

  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) { setDisplayed(Math.round(score)); return; }
    const start = performance.now();
    const dur = 1200;
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(ease * score));
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [isInView, score, shouldReduce]);

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      {/* Glow halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: "scale(1.4)",
        }}
      />
      <svg width={size} height={size} className="absolute inset-0">
        {/* Track */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
        {/* Inner track */}
        <circle cx={cx} cy={cy} r={radius - 10} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
        {/* Progress arc */}
        <motion.circle
          cx={cx} cy={cy} r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: shouldReduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
        />
      </svg>
      <div className="relative z-10 text-center">
        <span className="block text-xl font-black tabular-nums leading-none" style={{ color: strokeColor }}>
          {displayed}
        </span>
        <span className="block text-[9px] text-white/40 font-medium uppercase tracking-widest mt-0.5">heat</span>
      </div>
      {rank !== undefined && (
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-lg"
          style={{
            background: rank === 0 ? "#eab308" : rank === 1 ? "#94a3b8" : "#b45309",
            color: rank === 0 ? "#713f12" : "#fff",
          }}
        >
          {rank + 1}
        </div>
      )}
    </div>
  );
}
