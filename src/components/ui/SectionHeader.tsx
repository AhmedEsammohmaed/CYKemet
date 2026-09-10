import { cn } from '@/lib/utils/cn'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <p className="text-h3 font-semibold text-content-500">{title}</p>
      {subtitle && (
        <p className="text-body-lg font-normal text-grey-main">{subtitle}</p>
      )}
    </div>
  )
}
