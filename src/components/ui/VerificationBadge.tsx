import { cn } from '@/lib/utils/cn'

export type VerificationStatus = 'verified' | 'pending' | 'unverified'

export interface VerificationBadgeProps {
  status: VerificationStatus
  className?: string
}

/**
 * Verification status badge — Figma nodes 4:11490 (yes) / 4:11494 (pending) / 4:11498 (no)
 *
 * Pill shape: rounded-chip (18px), height 38px, border 1.5px
 * verified   → green  bg/border/text  (success-200/66, success-500 border, success-500 text)
 * pending    → yellow bg/border/text  (warning-200/66, warning-500 border, warning-500 text)
 * unverified → red    bg/border/text  (error-100, error-500/66 border, error-500 text)
 */

const verificationConfig: Record<
  VerificationStatus,
  { label: string; containerClass: string; textClass: string; dotClass: string }
> = {
  verified: {
    label: 'Verified',
    containerClass: 'bg-success-200/66 border-success-500',
    textClass:  'text-success-500',
    dotClass:   'bg-success-500',
  },
  pending: {
    label: 'Pending',
    containerClass: 'bg-warning-200/66 border-warning-500',
    textClass:  'text-warning-500',
    dotClass:   'bg-warning-500',
  },
  unverified: {
    label: 'Unverified',
    containerClass: 'bg-error-100 border-error-500/66',
    textClass:  'text-error-500',
    dotClass:   'bg-error-500',
  },
}

export function VerificationBadge({ status, className }: VerificationBadgeProps) {
  const { label, containerClass, textClass, dotClass } = verificationConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-[38px] px-[15px]',
        'border-[1.5px] border-solid rounded-chip',
        containerClass,
        className
      )}
    >
      <span className={cn('size-[2.5px] rounded-full shrink-0', dotClass)} />
      <span className={cn('text-label-3 font-medium whitespace-nowrap', textClass)}>
        {label}
      </span>
    </span>
  )
}
