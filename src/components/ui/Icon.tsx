import { type LucideIcon, type LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export interface IconProps extends Omit<LucideProps, 'size'> {
  icon: LucideIcon
  size?: IconSize | number
  className?: string
}

/**
 * Icon wrapper — typed lucide-react proxy
 *
 * Icon set: lucide-react (confirmed from Figma Icons frame 4:8102)
 * Named sizes: sm=16, md=20, lg=24, xl=32
 *
 * Usage:
 *   import { Shield } from 'lucide-react'
 *   <Icon icon={Shield} size="lg" className="text-primary-500" />
 */
export function Icon({ icon: LucideIcon, size = 'lg', className, ...props }: IconProps) {
  const px = typeof size === 'number' ? size : SIZE_MAP[size]

  return (
    <LucideIcon
      size={px}
      className={cn('shrink-0', className)}
      aria-hidden="true"
      {...props}
    />
  )
}
