'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <AlertCircle size={48} className="text-error-500" />
      <h2 className="text-h4 font-semibold text-black">Failed to load report</h2>
      <p className="text-body-md text-grey-main">{error.message ?? 'An unexpected error occurred.'}</p>
      <button
        type="button"
        onClick={reset}
        className="bg-primary-500 text-white text-body-md font-medium rounded-card px-6 h-10"
      >
        Try again
      </button>
    </div>
  )
}
