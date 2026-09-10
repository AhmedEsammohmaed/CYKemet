import { cn } from '@/lib/utils/cn'

export interface RewardBoxProps {
  label: string
  className?: string
}

/**
 * Reward box pill — Figma nodes 4:11551 (box 01) / 4:11553 (box 02)
 *
 * A small labeled chip used to indicate reward tiers / box assignments.
 * bg-secondary-500/66, border-primary-500/66, text-primary-500
 * height 22px, rounded-chip (18px)
 */
export function RewardBox({ label, className }: RewardBoxProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-[22px] px-[11px]',
        'bg-secondary-500/66 border border-solid border-primary-500/66',
        'rounded-chip text-primary-500',
        'text-label-4 font-medium whitespace-nowrap',
        className
      )}
    >
      {label}
    </span>
  )
}
