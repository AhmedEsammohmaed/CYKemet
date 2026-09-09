export default function Loading() {
  return (
    <div className="flex flex-col gap-6">

      {/* Stat cards row */}
      <div className="flex gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-1 bg-white rounded-card px-[39px] py-[18px] flex items-center gap-5">
            <div className="size-[70px] rounded-full bg-content-100 animate-pulse shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-[14px] w-[90px] bg-content-100 animate-pulse rounded" />
              <div className="h-[28px] w-[60px] bg-content-100 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Programs + Vuln types row */}
      <div className="flex gap-6">
        <div className="flex-[71] bg-white rounded-card p-6 flex flex-col gap-4">
          <div className="h-[24px] w-[180px] bg-content-100 animate-pulse rounded" />
          <div className="h-[40px] w-full bg-content-100 animate-pulse rounded-[10px]" />
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-[20px] w-full bg-content-100 animate-pulse rounded" />
          ))}
        </div>
        <div className="flex-[29] bg-white rounded-card p-6 flex flex-col gap-4">
          <div className="h-[24px] w-[160px] bg-content-100 animate-pulse rounded" />
          <div className="h-[200px] w-full bg-content-100 animate-pulse rounded-full mx-auto max-w-[200px]" />
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[16px] bg-content-100 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Trend chart */}
      <div className="bg-white rounded-card p-6 flex flex-col gap-4">
        <div className="h-[24px] w-[260px] bg-content-100 animate-pulse rounded" />
        <div className="h-[220px] w-full bg-content-100 animate-pulse rounded" />
      </div>

      {/* Recent reports */}
      <div className="bg-white rounded-card p-6 flex flex-col gap-4">
        <div className="h-[24px] w-[160px] bg-content-100 animate-pulse rounded" />
        <div className="h-[40px] w-full bg-content-100 animate-pulse rounded-[10px]" />
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-[20px] w-full bg-content-100 animate-pulse rounded" />
        ))}
      </div>

    </div>
  )
}
