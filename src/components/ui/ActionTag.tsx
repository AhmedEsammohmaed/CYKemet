import { FileText, Pencil, Archive } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type ProgramAction = 'view-reports' | 'edit' | 'archive'

export interface ActionTagProps {
  action: ProgramAction
  onClick?: () => void
  disabled?: boolean
  className?: string
}

/**
 * Program action tag — Figma nodes 4:39032 (view reports) / 4:39035 (edit) / 4:39038 (archive)
 *
 * Small pill-shaped action button.
 * view-reports / edit → bg-secondary-500/66, border-primary-500/66, text-primary-500, icon 12px
 * archive             → bg-grey-main/10,     border-grey-main/66,   text-grey-main,  icon 12px
 * height 22px, rounded-chip (18px)
 */

const actionConfig: Record<
  ProgramAction,
  { label: string; Icon: React.ElementType; containerClass: string; textClass: string }
> = {
  'view-reports': {
    label: 'View Program',
    Icon: FileText,
    containerClass: 'bg-secondary-500/66 border-primary-500/66',
    textClass: 'text-primary-500',
  },
  edit: {
    label: 'Edit',
    Icon: Pencil,
    containerClass: 'bg-secondary-500/66 border-primary-500/66',
    textClass: 'text-primary-500',
  },
  archive: {
    label: 'Archive',
    Icon: Archive,
    containerClass: 'bg-grey-main/10 border-grey-main/66',
    textClass: 'text-grey-main',
  },
}

export function ActionTag({ action, onClick, disabled, className }: ActionTagProps) {
  const { label, Icon, containerClass, textClass } = actionConfig[action]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-0.5 h-[22px] px-[11px]',
        'border border-solid rounded-chip',
        'text-label-4 font-medium whitespace-nowrap',
        'transition-opacity hover:opacity-80 focus:outline-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        containerClass,
        textClass,
        className
      )}
    >
      <Icon size={12} className="shrink-0" />
      {label}
    </button>
  )
}
