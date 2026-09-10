import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  className?: string
}

export function StatCard({ icon: Icon, label, value, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-white h-[107px] w-25 flex-1 rounded-[12px]',
        'flex items-center gap-4 px-5 shrink-0',
        className
      )}
    >
      {/* Icon container */}
      <div className="size-[70px] rounded-[35px] bg-[#e9f4fc] flex items-center justify-center shrink-0">
        <Icon size={28} className="text-[#003bdf]" />
      </div>

      {/* Label + value */}
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-medium text-[#85a0b2] leading-tight">
          {label}
        </span>
        <span className="text-[28px] font-bold text-[#1c1d1d] leading-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      </div>
    </div>
  )
}
