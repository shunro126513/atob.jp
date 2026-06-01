interface Props { score: number }

export default function HeatBadge({ score }: Props) {
  if (score >= 80) return (
    <span className="heat-high">🔥 {score.toFixed(0)}</span>
  );
  if (score >= 50) return (
    <span className="heat-mid">🧨 {score.toFixed(0)}</span>
  );
  return (
    <span className="heat-low">💧 {score.toFixed(0)}</span>
  );
}
