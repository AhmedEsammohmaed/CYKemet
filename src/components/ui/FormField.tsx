import { cn } from '@/lib/utils/cn'

export interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-h5 font-medium text-content-500">
        {label}
        {required && <span className="text-error-500"> *</span>}
      </label>
      {children}
    </div>
  )
}
