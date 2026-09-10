import { cn } from '@/lib/utils/cn'

export interface ToggleSwitchProps {
  checked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  className?: string
}

export function ToggleSwitch({ checked, onChange, disabled, className }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-[30.71px] w-[56px] rounded-[25px] transition-colors shrink-0',
        checked ? 'bg-primary-500' : 'bg-grey-main',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div
        className={cn(
          'absolute top-[2px] size-[26px] rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-[27px]' : 'translate-x-[2px]'
        )}
      />
    </button>
  )
}
