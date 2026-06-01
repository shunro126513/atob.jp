import { Flame, TrendingUp, Minus } from "lucide-react";

interface Props { score: number }

export default function HeatBadge({ score }: Props) {
  if (score >= 80) return (
    <span className="heat-high flex items-center gap-1">
      <Flame className="w-2.5 h-2.5" />
      {score.toFixed(0)}
    </span>
  );
  if (score >= 50) return (
    <span className="heat-mid flex items-center gap-1">
      <TrendingUp className="w-2.5 h-2.5" />
      {score.toFixed(0)}
    </span>
  );
  return (
    <span className="heat-low flex items-center gap-1">
      <Minus className="w-2.5 h-2.5" />
      {score.toFixed(0)}
    </span>
  );
}
