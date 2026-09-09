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
      <AlertCircle size={48} className="text-error-DEFAULT" />
      <h2 className="text-h4 font-semibold text-bg-dark">Failed to load program</h2>
      <p className="text-body-md text-secondary-400">{error.message ?? 'An unexpected error occurred.'}</p>
      <button
        onClick={reset}
        className="bg-primary-DEFAULT text-white text-body-md font-medium rounded-xl px-6 h-10 hover:bg-primary-DEFAULT/90 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
