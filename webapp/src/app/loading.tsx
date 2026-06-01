export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0A10" }}>
      <div className="border-b border-white/[0.07]" style={{ background: "#0D0D18" }}>
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="h-2 w-28 bg-white/[0.06] rounded-full animate-pulse mb-5" />
          <div className="h-8 w-56 bg-white/[0.06] rounded-xl animate-pulse mb-3" />
          <div className="h-4 w-72 bg-white/[0.04] rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="aspect-[16/9] bg-white/[0.04] animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-white/[0.05] rounded-lg animate-pulse" />
                <div className="h-3 bg-white/[0.04] rounded-lg w-3/4 animate-pulse" />
                <div className="h-1.5 bg-white/[0.04] rounded-full animate-pulse mt-2" />
                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-white/[0.04] rounded animate-pulse" />
                  <div className="h-6 w-14 bg-white/[0.04] rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
