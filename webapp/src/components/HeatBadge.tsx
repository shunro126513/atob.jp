interface Props { score: number }

export default function HeatBadge({ score }: Props) {
  if (score >= 80) return (
    <span className="heat-high">
      <span className="text-[10px]">🔥</span>
      {score.toFixed(0)}
    </span>
  );
  if (score >= 50) return (
    <span className="heat-mid">
      <span className="text-[10px]">🧨</span>
      {score.toFixed(0)}
    </span>
  );
  return (
    <span className="heat-low">
      <span className="text-[10px]">💧</span>
      {score.toFixed(0)}
    </span>
  );
}
