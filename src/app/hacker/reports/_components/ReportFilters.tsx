'use client'

import { useState } from 'react'
import { Search, CircleAlert, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// ─── Filter dropdown ──────────────────────────────────────────────────────────

const STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'all',       label: 'All' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'triaged',   label: 'Triaged' },
  { value: 'accepted',  label: 'Accepted' },
  { value: 'paid',      label: 'Paid' },
  { value: 'rejected',  label: 'Rejected' },
  { value: 'draft',     label: 'Draft' },
  { value: 'pending',   label: 'Pending' },
]

function FilterDropdown({ icon: Icon, label, options, value, onChange }: {
  icon: React.ElementType
  label: string
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const activeLabel = options.find((o) => o.value === value)?.label ?? label

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-[180px] h-[46px] rounded-card bg-white flex items-center gap-2 px-4 hover:bg-auth-left-bg transition-colors"
      >
        <Icon size={16} className="text-grey-main shrink-0" />
        <span className="flex-1 text-start text-h5 font-medium text-grey-main">{activeLabel}</span>
        <ChevronDown size={16} className={cn('text-grey-main shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full mt-1 start-0 w-full bg-white rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-20 py-1 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={cn(
                'w-full text-start px-4 py-2 text-body-md transition-colors',
                value === opt.value
                  ? 'bg-secondary-50 text-primary-500 font-medium'
                  : 'text-content-500 hover:bg-auth-left-bg'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── ReportFilters ────────────────────────────────────────────────────────────

export interface ReportFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  statusFilter: string
  onStatusChange: (v: string) => void
}

export function ReportFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: ReportFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search */}
      <div className="h-[46px] bg-white rounded-[10px] flex-auto flex items-center gap-3 px-4 shrink-0">
        <Search size={18} className="text-grey-main shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search a report here"
          className="flex-1 bg-transparent outline-none border-none text-h5 font-medium text-content-500 placeholder:text-grey-main"
        />
      </div>

      {/* Status filter */}
      <FilterDropdown
        icon={CircleAlert}
        label="Status"
        options={STATUS_OPTIONS}
        value={statusFilter}
        onChange={onStatusChange}
      />
    </div>
  )
}
