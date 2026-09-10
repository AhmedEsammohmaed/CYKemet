export default function LeaderboardLoading() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Stat cards */}
      <div className="flex gap-7.25">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-card h-21 w-63.75" />
        ))}
      </div>
      {/* Switcher */}
      <div className="bg-white rounded-card h-13 w-full" />
      {/* Rows */}
      <div className="flex flex-col gap-6">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bg-white rounded-card h-29.5 w-full" />
        ))}
      </div>
    </div>
  )
}
