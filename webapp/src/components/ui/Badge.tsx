type BadgeVariant = "genre" | "platform" | "heat-high" | "heat-mid" | "heat-low" | "default";

const variantClasses: Record<BadgeVariant, string> = {
  genre: "bg-brand-50 text-brand-700 border border-brand-200",
  platform: "bg-ink/10 text-ink/70 border border-ink/10",
  "heat-high": "bg-brand-50 text-brand-600 ring-1 ring-brand-200",
  "heat-mid": "bg-orange-50 text-orange-600 ring-1 ring-orange-200",
  "heat-low": "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
  default: "bg-stone-100 text-stone-600 border border-stone-200",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
