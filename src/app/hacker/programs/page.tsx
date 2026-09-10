'use client'

import { useEffect, useState } from 'react'
import { Search, ListFilter, Building2, ArrowUpDown, ChevronDown } from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { ProgramCard } from '@/components/hacker/ProgramCard'
import { mockPrograms } from '@/lib/mock/hackers'
import { cn } from '@/lib/utils/cn'
import type { Program } from '@/types'

function FilterButton({
  icon: Icon,
  label,
  width,
}: {
  icon: React.ElementType
  label: string
  width: number
}) {
  return (
    <button
      type="button"
      style={{ width }}
      className={cn(
        'h-[46px] rounded-card bg-white',
        'flex items-center gap-2 px-4',
        'text-grey-main text-body-2',
        'hover:bg-auth-left-bg transition-colors shrink-0'
      )}
    >
      <Icon size={16} className="shrink-0 text-grey-main" />
      <span className="flex-1 text-start text-h5 font-medium">{label}</span>
      <ChevronDown size={16} className="shrink-0 text-grey-main" />
    </button>
  )
}

export default function ProgramsPage() {
  const { setTitle } = useNav()
  const [search, setSearch] = useState('')

  useEffect(() => {
    setTitle('Programs')
  }, [setTitle])

  const filtered: Program[] = mockPrograms.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-6">

      {/* ── Filter / search row ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">

        {/* Search input */}
        <div
          className={cn(
            'w-[486px] h-[46px] bg-white rounded-[10px]',
            'flex items-center gap-3 px-4 shrink-0'
          )}
        >
          <Search size={18} className="text-grey-main shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a program here"
            className={cn(
              'flex-1 bg-transparent outline-none border-none',
              'text-h5 font-medium text-content-500',
              'placeholder:text-grey-main'
            )}
          />
        </div>

        {/* Filters */}
        <FilterButton icon={ListFilter} label="Type"     width={180} />
        <FilterButton icon={Building2} label="Industry"  width={196} />
        <FilterButton icon={ArrowUpDown} label="Sort by" width={180} />
      </div>

      {/* ── Programs grid ────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-6">
        {filtered.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}

        {filtered.length === 0 && (
          <div className="w-full py-16 flex items-center justify-center">
            <p className="text-body-lg text-grey-main">No programs match your search.</p>
          </div>
        )}
      </div>

    </div>
  )
}
