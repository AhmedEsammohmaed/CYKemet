'use client'

export default function AnalyticsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <p className="text-h4 font-semibold text-content-500">Failed to load analytics</p>
      <button
        type="button"
        onClick={reset}
        className="bg-primary-500 text-white px-6 h-11 rounded-[10px] text-body-lg font-medium"
      >
        Try again
      </button>
    </div>
  )
}
