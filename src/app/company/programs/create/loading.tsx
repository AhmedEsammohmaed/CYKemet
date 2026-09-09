export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Step indicator skeleton */}
      <div className="flex gap-3 flex-wrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[47px] rounded-2xl bg-bg-light" style={{ width: `${90 + i * 18}px` }} />
        ))}
      </div>

      {/* Form card skeleton */}
      <div className="bg-white rounded-xl p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-48 bg-bg-light rounded-lg" />
          <div className="h-4 w-64 bg-bg-light rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-[60px] bg-bg-light rounded-xl" />
          <div className="h-[60px] bg-bg-light rounded-xl" />
        </div>
        <div className="h-[202px] bg-bg-light rounded-xl" />
      </div>

      {/* Nav skeleton */}
      <div className="flex justify-between pt-2">
        <div className="h-10 w-24 bg-bg-light rounded-xl" />
        <div className="h-[52px] w-32 bg-bg-light rounded-xl" />
      </div>
    </div>
  )
}
