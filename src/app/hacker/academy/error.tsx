'use client'

interface AcademyErrorProps {
  error: Error
  reset: () => void
}

export default function AcademyError({ error, reset }: AcademyErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] gap-[16px]">
      <p className="text-h5 font-semibold text-content-500">
        Something went wrong
      </p>
      <p className="text-body-md text-grey-main">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="px-[24px] h-[40px] bg-primary-500 text-white text-body-md font-semibold rounded-btn"
      >
        Try again
      </button>
    </div>
  )
}
