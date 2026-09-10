'use client'

import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  /** Rendered inside the input on the trailing edge (e.g. CircleCheck, custom icons) */
  rightElement?: React.ReactNode
  containerClassName?: string
}

/**
 * Input field — Figma nodes 4:11449 (selected) / 4:11450 (default)
 *
 * Default border: content-200 (#CBCDCD)
 * Focus border:   primary-500 (#003BDF) — 1.5px solid
 * Error border:   error-500 (#F43F5D)
 * Border-radius:  12px (--radius-card)
 * Height:         60px
 * Label:          Plus Jakarta Sans Medium, 24px (h3)
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      type = 'text',
      disabled,
      className,
      containerClassName,
      rightElement,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-4 w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-h3 font-medium text-primary-950',
              disabled && 'opacity-40'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            className={cn(
              // base
              'w-full h-[60px] rounded-card bg-transparent px-4',
              'border-[1.5px] border-solid border-content-200',
              'text-body-1 text-primary-950 placeholder:text-text-muted',
              'outline-none transition-colors duration-200',
              // focus
              'focus:border-primary-500',
              // error
              error && 'border-error-500 focus:border-error-500',
              // disabled
              'disabled:opacity-40 disabled:cursor-not-allowed',
              // right padding for password icon / rightElement
              (isPassword || rightElement) && 'pe-12',
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
              className={cn(
                'absolute end-4 top-1/2 -translate-y-1/2',
                'text-text-muted hover:text-text-secondary transition-colors',
                'focus:outline-none'
              )}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          )}

          {!isPassword && rightElement && (
            <span className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none">
              {rightElement}
            </span>
          )}
        </div>

        {error && (
          <p className="text-label-3 text-error-500">{error}</p>
        )}
        {hint && !error && (
          <p className="text-label-3 text-text-muted">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
