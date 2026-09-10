import { cn } from '@/lib/utils/cn'

export interface PillSwitcherOption<T extends string> {
  value: T
  label: string
}

export interface PillSwitcherProps<T extends string> {
  options: PillSwitcherOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function PillSwitcher<T extends string>({
  options,
  value,
  onChange,
  className,
}: PillSwitcherProps<T>) {
  return (
    <div className={cn('bg-white rounded-card h-[52px] w-full flex items-center p-[6px]', className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'flex-1 h-full rounded-badge text-body-lg font-medium transition-colors',
            value === opt.value
              ? 'bg-primary-500 text-white'
              : 'text-primary-500 bg-transparent'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
