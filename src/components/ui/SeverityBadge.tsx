import { cn } from '@/lib/utils/cn'

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'informational'

export interface SeverityBadgeProps {
  severity: Severity
  className?: string
}

/**
 * Severity badge — Figma nodes 4:11535–4:11547
 *
 * A small dot + label, no background fill.
 * critical      → #F43F5D  (--color-severity-critical)
 * high          → #FF7104  (--color-severity-high)
 * medium        → #FBBE24  (--color-severity-medium)
 * low           → #003BDF  (--color-severity-low)
 * informational → #85A0B2  (--color-severity-informational)
 */

const severityConfig: Record<
  Severity,
  { label: string; colorClass: string; dotClass: string }
> = {
  critical: {
    label: 'Critical',
    colorClass: 'text-severity-critical',
    dotClass: 'bg-severity-critical',
  },
  high: {
    label: 'High',
    colorClass: 'text-severity-high',
    dotClass: 'bg-severity-high',
  },
  medium: {
    label: 'Medium',
    colorClass: 'text-severity-medium',
    dotClass: 'bg-severity-medium',
  },
  low: {
    label: 'Low',
    colorClass: 'text-severity-low',
    dotClass: 'bg-severity-low',
  },
  informational: {
    label: 'None',
    colorClass: 'text-severity-informational',
    dotClass: 'bg-severity-informational',
  },
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const { label, colorClass, dotClass } = severityConfig[severity]

  return (
    <span
      className={cn('inline-flex items-center gap-1.5', colorClass, className)}
    >
      <span className={cn('size-0.5 rounded-full shrink-0', dotClass)} />
      <span className="text-label-3 font-medium whitespace-nowrap">{label}</span>
    </span>
  )
}
