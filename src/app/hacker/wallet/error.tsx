'use client'

export default function WalletError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <p className="text-h4 font-semibold text-content-500">Failed to load wallet</p>
      <button
        type="button"
        onClick={reset}
        className="px-6 h-11 bg-primary-500 text-white rounded-card text-body-lg font-medium"
      >
        Try again
      </button>
    </div>
  )
}
