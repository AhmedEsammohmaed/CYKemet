'use client'

import { useId } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  id?: string
  className?: string
}

/**
 * Checkbox — Figma nodes 4:11484 (default) / 4:11486 (checked)
 *
 * Size: 17 × 17px, border-radius: 2px (rounded-sm)
 * default → border border-content-400
 * checked → border border-primary-500, blue check icon
 */
export function Checkbox({
  checked,
  onChange,
  disabled,
  label,
  id,
  className,
}: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      <span className="relative size-[17px] shrink-0">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 rounded-sm border border-solid',
            'flex items-center justify-center transition-colors duration-150',
            checked
              ? 'border-primary-500 bg-transparent'
              : 'border-content-400 bg-transparent'
          )}
        >
          {checked && (
            <Check
              size={11}
              strokeWidth={2.5}
              className="text-primary-500"
            />
          )}
        </span>
      </span>

      {label && (
        <span className="text-body-2 text-primary-950">{label}</span>
      )}
    </label>
  )
}
