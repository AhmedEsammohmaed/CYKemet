export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-80 bg-bg-light rounded-lg" />
          <div className="h-4 w-96 bg-bg-light rounded-lg" />
        </div>
        <div className="h-[52px] w-44 bg-bg-light rounded-xl" />
      </div>

      {/* Search + filters skeleton */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-[46px] bg-bg-light rounded-[10px]" />
        <div className="h-[46px] w-36 bg-bg-light rounded-xl" />
        <div className="h-[46px] w-36 bg-bg-light rounded-xl" />
        <div className="h-[46px] w-32 bg-bg-light rounded-xl" />
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-xl p-6">
        <div className="h-7 w-44 bg-bg-light rounded-lg mb-5" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-10 bg-bg-light rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
