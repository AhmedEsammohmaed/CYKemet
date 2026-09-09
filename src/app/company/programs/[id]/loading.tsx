export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Overview card skeleton */}
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
        <div className="h-7 w-48 bg-bg-light rounded-lg" />
        <div className="grid grid-cols-2 gap-8">
          <div className="h-[52px] bg-bg-light rounded-xl" />
          <div className="h-[52px] bg-bg-light rounded-xl" />
        </div>
        <div className="h-[80px] bg-bg-light rounded-xl" />
        <div className="grid grid-cols-3 gap-8">
          <div className="h-[52px] bg-bg-light rounded-xl" />
          <div className="h-[52px] bg-bg-light rounded-xl" />
          <div className="h-[52px] bg-bg-light rounded-xl" />
        </div>
      </div>

      {/* Scope + Rewards skeleton */}
      <div className="grid grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] gap-6">
        <div className="flex flex-col gap-6">
          <div className="h-[200px] bg-bg-light rounded-xl" />
          <div className="h-[200px] bg-bg-light rounded-xl" />
        </div>
        <div className="h-[250px] bg-bg-light rounded-xl" />
      </div>

      {/* Policy skeletons */}
      {[160, 200, 160].map((h, i) => (
        <div key={i} className="bg-white rounded-xl p-6 flex flex-col gap-5">
          <div className="h-6 w-40 bg-bg-light rounded-lg" />
          <div className="bg-bg-light rounded-xl" style={{ height: h }} />
        </div>
      ))}

      {/* Footer skeleton */}
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
        <div className="h-6 w-80 bg-bg-light rounded-lg" />
        <div className="flex justify-between">
          <div className="h-[52px] w-32 bg-bg-light rounded-xl" />
          <div className="h-[60px] w-44 bg-bg-light rounded-xl" />
        </div>
      </div>
    </div>
  )
}
