import { HeatRing } from "@/components/visuals/HeatRing";

interface Props {
  score: number;
  size?: "sm" | "md";
}

export default function HeatBadge({ score, size = "sm" }: Props) {
  const ringSize = size === "md" ? 44 : 36;

  return (
    <HeatRing
      score={score}
      size={ringSize}
      strokeWidth={size === "md" ? 4 : 3.5}
      showLabel
      animate
    />
  );
}
