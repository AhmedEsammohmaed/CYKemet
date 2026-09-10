import {
  Globe,
  Cloud,
  Smartphone,
  BadgeDollarSign,
  CircleDot,
  Clock4,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type ProgramType = 'web' | 'cloud' | 'mobile' | 'monetary' | 'points' | 'date'

export interface ProgramTypeTagProps {
  type: ProgramType
  /** Required when type === 'date' — e.g. "March 12, 2028" */
  date?: string
  className?: string
}

/**
 * Program type tag — Figma nodes 4:11516–4:11531
 *
 * All variants share:
 *   bg-secondary-500, border-primary-500/66 (0.7px), rounded-[10px], height 28px
 *   text-primary-500, text-body-sm (label-4), icon 16px
 */

const typeConfig: Record<
  ProgramType,
  { defaultLabel: string; Icon: React.ElementType }
> = {
  web:      { defaultLabel: 'Web',      Icon: Globe           },
  cloud:    { defaultLabel: 'Cloud',    Icon: Cloud           },
  mobile:   { defaultLabel: 'Mobile',   Icon: Smartphone      },
  monetary: { defaultLabel: 'Monetary', Icon: BadgeDollarSign },
  points:   { defaultLabel: 'Points',   Icon: CircleDot       },
  date:     { defaultLabel: 'Date',     Icon: Clock4          },
}

export function ProgramTypeTag({ type, date, className }: ProgramTypeTagProps) {
  const { defaultLabel, Icon } = typeConfig[type]
  const label = type === 'date' ? `Ends on: ${date ?? ''}` : defaultLabel

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-[28px] px-[13px]',
        'bg-secondary-500 border-[0.7px] border-solid border-primary-500/66',
        'rounded-[10px] text-primary-500',
        className
      )}
    >
      <Icon size={16} className="shrink-0" />
      <span className="text-label-4 font-medium whitespace-nowrap">{label}</span>
    </span>
  )
}
