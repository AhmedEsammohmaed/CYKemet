import { cn } from '@/lib/utils/cn'

export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface DifficultyBadgeProps {
  difficulty: CourseDifficulty
  className?: string
}

/**
 * Course difficulty badge — Figma nodes 4:11503 (advanced) / 4:11507 (intermediate) / 4:11511 (beginner)
 *
 * Pill shape: rounded-chip (18px), height 30px, border 1.5px
 * advanced     → red    (error-100/66 bg, error-500/66 border, error-500 text)
 * intermediate → yellow (warning-200/66 bg, warning-500 border, warning-500 text)
 * beginner     → green  (success-200/66 bg, success-500 border, success-500 text)
 */

const difficultyConfig: Record<
  CourseDifficulty,
  { label: string; containerClass: string; textClass: string }
> = {
  advanced: {
    label: 'Advanced',
    containerClass: 'bg-error-100/66 border-error-500/66',
    textClass: 'text-error-500',
  },
  intermediate: {
    label: 'Intermediate',
    containerClass: 'bg-warning-200/66 border-warning-500',
    textClass: 'text-warning-500',
  },
  beginner: {
    label: 'Beginner',
    containerClass: 'bg-success-200/66 border-success-500',
    textClass: 'text-success-500',
  },
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const { label, containerClass, textClass } = difficultyConfig[difficulty]

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-[30px] px-[15px]',
        'border-[1.5px] border-solid rounded-chip',
        'text-label-3 font-medium whitespace-nowrap',
        containerClass,
        textClass,
        className
      )}
    >
      {label}
    </span>
  )
}
