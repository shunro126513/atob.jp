"use client";
import { useState, useEffect } from "react";
import { Flame, Heart } from "lucide-react";

interface Props {
  projectId: number;
  initialCount: number;
  size?: "sm" | "md";
}

const STORAGE_KEY = (id: number) => `atob_cheered_${id}_${new Date().toISOString().slice(0, 10)}`;

export default function CheerButton({ projectId, initialCount, size = "md" }: Props) {
  const [count, setCount]         = useState(initialCount);
  const [cheered, setCheered]     = useState(false);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    setCheered(!!localStorage.getItem(STORAGE_KEY(projectId)));
  }, [projectId]);

  async function handleCheer() {
    if (cheered || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/cheer/${projectId}`, { method: "POST" });
      const data = await res.json();

      if (data.ok) {
        setCount((c) => c + 1);
        setCheered(true);
        localStorage.setItem(STORAGE_KEY(projectId), "1");
        setAnimating(true);
        setTimeout(() => setAnimating(false), 600);
      } else if (data.reason === "already_cheered") {
        setCheered(true);
        localStorage.setItem(STORAGE_KEY(projectId), "1");
      }
    } finally {
      setLoading(false);
    }
  }

  const isSmall = size === "sm";

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCheer(); }}
      disabled={cheered || loading}
      className={[
        "flex items-center gap-1.5 font-semibold rounded-xl transition-all duration-200",
        isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-sm",
        cheered
          ? "bg-orange-50 text-orange-500 ring-1 ring-orange-200 cursor-default"
          : "bg-gray-50 text-gray-500 ring-1 ring-gray-200 hover:bg-orange-50 hover:text-orange-500 hover:ring-orange-200 active:scale-95",
        loading ? "opacity-60 cursor-wait" : "",
      ].join(" ")}
      title={cheered ? "今日はすでに応援済みです" : "応援する（1日1回）"}
    >
      <span className={animating ? "animate-cheer-pop inline-block" : "inline-block"}>
        {cheered
          ? <Flame className="w-3 h-3" />
          : <Heart className="w-3 h-3" />
        }
      </span>
      <span className="tabular-nums">{count.toLocaleString()}</span>
      {!isSmall && (
        <span className="text-[10px] opacity-70">{cheered ? "応援済み" : "応援"}</span>
      )}
    </button>
  );
}
