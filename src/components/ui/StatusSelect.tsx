'use client'

import { useEffect, useRef, useState } from 'react'
import { CircleAlert, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type ReportStatusOption =
  | 'submitted'
  | 'pending'
  | 'triaged'
  | 'paid'
  | 'rejected'
  | 'draft'
  | 'deleted'

export interface StatusSelectProps {
  value: ReportStatusOption | null
  onChange: (status: ReportStatusOption | null) => void
  placeholder?: string
  className?: string
}

/**
 * Report status filter dropdown — Figma nodes 4:11556 (closed) / 4:11562 (open)
 *
 * Shows a pill-shaped trigger with a status icon + label + chevron.
 * When open, reveals the full list of selectable statuses.
 * Border-radius: 12px (--radius-card)
 * Height (trigger): 46px
 */

const STATUS_OPTIONS: { value: ReportStatusOption; label: string }[] = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'pending',   label: 'Pending'   },
  { value: 'triaged',   label: 'Triaged'   },
  { value: 'paid',      label: 'Paid'      },
  { value: 'rejected',  label: 'Rejected'  },
  { value: 'draft',     label: 'Draft'     },
  { value: 'deleted',   label: 'Deleted'   },
]

export function StatusSelect({
  value,
  onChange,
  placeholder = 'Status',
  className,
}: StatusSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selectedLabel =
    STATUS_OPTIONS.find((o) => o.value === value)?.label ?? placeholder

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={cn('relative w-[180px]', className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full h-[46px] flex items-center justify-between gap-2.5',
          'px-[19px] bg-bg-card border border-bg-border rounded-card',
          'text-grey-main transition-colors',
          'hover:border-primary-500/50 focus:outline-none'
        )}
      >
        <span className="flex items-center gap-1.5">
          <CircleAlert size={20} className="shrink-0" />
          <span className="text-label-1 font-medium">{selectedLabel}</span>
        </span>
        <ChevronRight
          size={16}
          className={cn(
            'shrink-0 transition-transform duration-200',
            open ? '-rotate-90' : 'rotate-90'
          )}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <div
          className={cn(
            'absolute top-full mt-1 w-full z-50',
            'bg-bg-card border border-bg-border rounded-card shadow-dropdown',
            'py-1'
          )}
        >
          {/* Clear selection */}
          {value && (
            <button
              type="button"
              onClick={() => { onChange(null); setOpen(false) }}
              className={cn(
                'w-full px-[19px] py-2 text-start',
                'text-body-1 text-text-muted hover:text-primary-950 hover:bg-bg-surface',
                'transition-colors'
              )}
            >
              All
            </button>
          )}

          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={cn(
                'w-full px-[19px] py-2 text-start',
                'text-body-1 transition-colors',
                value === opt.value
                  ? 'text-primary-500 bg-primary-500/10'
                  : 'text-grey-main hover:text-primary-950 hover:bg-bg-surface'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
