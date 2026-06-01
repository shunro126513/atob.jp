import { ProjectCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Header skeleton */}
      <div className="bg-canvas-warm border-b border-brand-100/60 py-10">
        <div className="max-w-6xl mx-auto px-5">
          <div className="h-3 w-32 bg-stone-200 rounded-full animate-pulse mb-4" />
          <div className="h-9 w-64 bg-stone-200 rounded-xl animate-pulse mb-3" />
          <div className="h-4 w-80 bg-stone-100 rounded-lg animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
