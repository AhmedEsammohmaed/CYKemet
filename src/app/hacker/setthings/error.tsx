'use client'

export default function SettingsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <p className="text-h5 font-medium text-content-500">Something went wrong.</p>
      <button
        onClick={reset}
        className="bg-primary-500 h-[48px] px-[32px] rounded-card text-white text-body-lg font-medium"
      >
        Try again
      </button>
    </div>
  )
}
