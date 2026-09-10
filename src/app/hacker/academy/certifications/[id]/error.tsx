'use client'

export default function CertificationDetailError({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center h-80 gap-4">
      <p className="text-h5 font-medium text-content-500">
        Failed to load certification details.
      </p>
      <button
        type="button"
        onClick={reset}
        className="h-10 px-6 bg-primary-500 rounded-btn text-white text-body-md font-medium"
      >
        Try again
      </button>
    </div>
  )
}
