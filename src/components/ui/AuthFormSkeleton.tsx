import { cn } from '@/lib/utils/cn'

export interface AuthFormSkeletonProps {
  /** How many input-field-shaped rows to render (0 = none) */
  rows?: number
  /** Show a full-width button skeleton at the bottom */
  hasButton?: boolean
  /** Show a title + subtitle block above the rows */
  hasSubtitle?: boolean
  /** Replace rows with a centred icon + text block (success / info screens) */
  isCentered?: boolean
  /** Replace rows with the 6-box OTP input skeleton */
  isOtp?: boolean
  className?: string
}

/**
 * Pulsing skeleton placeholder for auth form pages.
 * Rendered by every auth route loading.tsx — fits inside the AuthLayout left panel.
 */
export function AuthFormSkeleton({
  rows = 2,
  hasButton = false,
  hasSubtitle = false,
  isCentered = false,
  isOtp = false,
  className,
}: AuthFormSkeletonProps) {
  const shimmer = 'animate-pulse rounded-card bg-content-100'

  if (isCentered) {
    return (
      <div className={cn('flex flex-col items-center gap-8 text-center', className)}>
        {/* Icon placeholder */}
        <div className={cn('size-24 rounded-full', shimmer)} />
        {/* Title */}
        <div className="flex flex-col gap-3 items-center w-full">
          <div className={cn('h-10 w-[280px]', shimmer)} />
          <div className={cn('h-5 w-[360px]', shimmer)} />
          <div className={cn('h-5 w-[300px]', shimmer)} />
        </div>
        {hasButton && (
          <div className={cn('h-[60px] w-[320px]', shimmer)} />
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-[50px] w-full', className)}>
      {/* Heading */}
      <div className="flex flex-col gap-4 w-full">
        <div className={cn('h-14 w-64', shimmer)} />
        {hasSubtitle && (
          <>
            <div className={cn('h-5 w-full', shimmer)} />
            <div className={cn('h-5 w-3/4', shimmer)} />
          </>
        )}
      </div>

      <div className="flex flex-col gap-[50px] w-full">
        {/* OTP boxes */}
        {isOtp && (
          <div className="flex gap-3 justify-between">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={cn('flex-1 h-[60px]', shimmer)} />
            ))}
          </div>
        )}

        {/* Input rows */}
        {!isOtp && rows > 0 && (
          <div className="flex flex-col gap-6 w-full">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* Label */}
                <div className={cn('h-6 w-28', shimmer)} />
                {/* Input box */}
                <div className={cn('h-[60px] w-full', shimmer)} />
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        {hasButton && (
          <div className={cn('h-[60px] w-full', shimmer)} />
        )}
      </div>
    </div>
  )
}
