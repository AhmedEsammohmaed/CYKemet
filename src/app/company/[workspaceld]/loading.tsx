export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <div className="h-7 w-72 bg-secondary-50 rounded-lg" />
          <div className="h-4 w-[500px] bg-secondary-50 rounded-lg" />
        </div>
        <div className="h-[60px] w-[227px] bg-secondary-50 rounded-card" />
      </div>

      {/* Stat cards skeleton */}
      <div className="flex gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex-1 bg-white rounded-card h-[84px]" />
        ))}
      </div>

      {/* Workspace cards skeleton */}
      <div className="flex flex-col gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-card h-[143px]" />
        ))}
      </div>
    </div>
  )
}
