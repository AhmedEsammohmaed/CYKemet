export default function AcademyLoading() {
  return (
    <div className="flex flex-col gap-[24px] animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-white rounded-card w-full h-[210px]" />

      {/* Tab bar skeleton */}
      <div className="h-[48px] bg-white/50 rounded-btn" />

      {/* Cards skeleton */}
      <div className="grid grid-cols-2 gap-[24px]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-card h-[473px]" />
        ))}
      </div>
    </div>
  )
}
