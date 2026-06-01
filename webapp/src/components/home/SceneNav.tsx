"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Scene {
  id: string;
  label: string;
}

interface Props {
  scenes: Scene[];
}

export default function SceneNav({ scenes }: Props) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const updateActive = useCallback(() => {
    const viewportH = window.innerHeight;
    const middle = viewportH * 0.5;
    let best = 0;
    let bestDist = Infinity;

    scenes.forEach((scene, i) => {
      const el = document.getElementById(scene.id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - middle);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, [scenes]);

  useEffect(() => {
    updateActive();
    const handler = () => updateActive();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [updateActive]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 pointer-events-auto hidden md:flex"
      aria-label="ページナビゲーション"
    >
      {scenes.map((scene, i) => (
        <div key={scene.id} className="relative flex items-center gap-2">
          {/* Label on hover */}
          <AnimatePresence>
            {hovered === i && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="text-[11px] font-semibold text-white/70 whitespace-nowrap bg-midnight-surface/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10"
              >
                {scene.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dot */}
          <button
            onClick={() => scrollTo(scene.id)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            aria-label={scene.label}
            className="relative flex items-center justify-center w-5 h-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-full"
          >
            <motion.div
              animate={{
                width:  active === i ? 10 : 6,
                height: active === i ? 10 : 6,
                opacity: active === i ? 1 : 0.4,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-full"
              style={{
                background: active === i
                  ? "rgba(232,80,58,1)"
                  : "rgba(255,255,255,0.6)",
                boxShadow: active === i ? "0 0 8px rgba(232,80,58,0.7)" : "none",
              }}
            />
          </button>
        </div>
      ))}
    </nav>
  );
}
