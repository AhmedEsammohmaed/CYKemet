import { cn } from '@/lib/utils/cn'

export interface ActivityBadgeProps {
  active: boolean
  className?: string
}

/**
 * Activity badge — Figma nodes 4:11655 (active) / 4:11657 (inactive)
 *
 * Pill shape: rounded-chip (18px), height 22px, border 1.5px
 * active   → green bg/border/text  (success-200/66, success-500/66 border, success-500 text)
 * inactive → red   bg/border/text  (error-100, error-500/66 border, error-500 text)
 */
export function ActivityBadge({ active, className }: ActivityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-[22px] px-3',
        'border-[1.5px] border-solid rounded-chip',
        'text-label-4 font-medium whitespace-nowrap',
        active
          ? 'bg-success-200/66 border-success-500/66 text-success-500'
          : 'bg-error-100 border-error-500/66 text-error-500',
        className
      )}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}
