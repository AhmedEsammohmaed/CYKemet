'use client'

import { cn } from '@/lib/utils/cn'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  className?: string
}

/**
 * Toggle switch — Figma nodes 4:36606 (active) / 4:36609 (inactive)
 *
 * Track: 56 × 31px, rounded-full
 * active   → bg-primary-500 (#003BDF), knob on right
 * inactive → bg-grey-main   (#85A0B2), knob on left
 * Knob: ~27 × 27px white circle with 2px inset from all sides
 */
export function Toggle({ checked, onChange, disabled, label, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-14 h-[31px] rounded-full shrink-0',
        'transition-colors duration-200 focus:outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        checked ? 'bg-primary-500' : 'bg-grey-main',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className
      )}
    >
      <span
        className={cn(
          'absolute top-[2px] size-[27px] rounded-full bg-white shadow-sm',
          'transition-transform duration-200',
          checked ? 'translate-x-[27px]' : 'translate-x-[2px]'
        )}
      />
    </button>
  )
}
