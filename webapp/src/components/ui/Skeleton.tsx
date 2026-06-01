interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100 bg-[length:400%_100%] rounded-lg ${className}`}
      style={{ backgroundSize: "400% 100%", animation: "shimmer 1.6s ease-in-out infinite" }}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card">
      <Skeleton className="aspect-[16/9] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-1.5 w-full rounded-full" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
