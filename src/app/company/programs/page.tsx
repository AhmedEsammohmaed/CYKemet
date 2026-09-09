'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  ExternalLink,
  FileSpreadsheet,
  Pencil,
  Archive,
  ChevronDown,
  CircleAlert,
  ArrowUpDown,
  Plus,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { mockCompanyPrograms } from '@/lib/mock/company'
import { cn } from '@/lib/utils/cn'
import type { CompanyProgram } from '@/lib/mock/company'
import type { CompanyProgramStatus, CompanyProgramType } from '@/types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBudget(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)}M`
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K`
  return String(amount)
}

// ─── Status pill ─────────────────────────────────────────────────────────────

interface StatusPillProps { status: CompanyProgramStatus }

function StatusPill({ status }: StatusPillProps) {
  const label: Record<CompanyProgramStatus, string> = {
    active:   'Active',
    paused:   'Paused',
    draft:    'Draft',
    archived: 'Archived',
  }
  const cls: Record<CompanyProgramStatus, string> = {
    active:   'text-success-DEFAULT',
    paused:   'text-warning-DEFAULT',
    draft:    'text-secondary-400',
    archived: 'text-secondary-400',
  }
  return (
    <span className={cn('text-body-md font-medium whitespace-nowrap', cls[status])}>
      {label[status]}
    </span>
  )
}

// ─── Type pill ───────────────────────────────────────────────────────────────

interface TypePillProps { type: CompanyProgramType }

function TypePill({ type }: TypePillProps) {
  return (
    <span className="text-body-md font-medium text-primary-DEFAULT whitespace-nowrap capitalize">
      {type}
    </span>
  )
}

// ─── Action button ───────────────────────────────────────────────────────────

interface ActionBtnProps { program: CompanyProgram }

function ActionBtn({ program }: ActionBtnProps) {
  if (program.status === 'archived') {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full border text-label-sm font-medium bg-secondary-100/10 border-secondary-400/66 text-secondary-400 whitespace-nowrap">
        <Archive size={12} />
        Archived
      </span>
    )
  }

  if (program.status === 'draft') {
    return (
      <Link
        href="/company/programs/create"
        className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full border text-label-sm font-medium bg-tint-DEFAULT/66 border-primary-DEFAULT/66 text-primary-DEFAULT whitespace-nowrap"
      >
        <Pencil size={12} />
        Edit
      </Link>
    )
  }

  if (program.status === 'paused') {
    return (
      <Link
        href={`/company/programs/${program.id}/edit`}
        className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full border text-label-sm font-medium bg-tint-DEFAULT/66 border-primary-DEFAULT/66 text-primary-DEFAULT whitespace-nowrap"
      >
        <Pencil size={12} />
        Edit
      </Link>
    )
  }

  return (
    <Link
      href={`/company/programs/${program.id}`}
      className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full border text-label-sm font-medium bg-tint-DEFAULT/66 border-primary-DEFAULT/66 text-primary-DEFAULT whitespace-nowrap"
    >
      <FileSpreadsheet size={12} />
      View Program
    </Link>
  )
}

// ─── Filter select ────────────────────────────────────────────────────────────

interface FilterSelectProps {
  icon: React.ReactNode
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}

function FilterSelect({ icon, label, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none bg-white rounded-xl h-[46px] ps-3 pe-9 text-body-md font-medium text-secondary-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30"
      >
        <option value="">{label}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-secondary-400">
        {icon}
      </span>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CompanyProgramsPage() {
  const { setTitle } = useNav()
  useEffect(() => { setTitle('Programs') }, [setTitle])

  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState<CompanyProgramStatus | ''>('')
  const [typeFilter, setTypeFilter]   = useState<CompanyProgramType | ''>('')

  const filtered = mockCompanyPrograms.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter ? p.status === statusFilter : true
    const matchType   = typeFilter   ? p.type   === typeFilter   : true
    return matchSearch && matchStatus && matchType
  })

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-h3 font-semibold text-bg-dark">
            Manage Your Active Security Programs
          </h2>
          <p className="text-body-md text-secondary-400">
            Monitor program performance, review incoming reports, and take action in real time
          </p>
        </div>
        <Link
          href="/company/programs/create"
          className="inline-flex items-center gap-2 bg-primary-DEFAULT text-white text-body-lg font-medium rounded-xl px-5 h-[52px] hover:bg-primary-DEFAULT/90 transition-colors shrink-0"
        >
          <Plus size={20} />
          Create a program
        </Link>
      </div>

      {/* Search + filters */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex-1 bg-white rounded-[10px] h-[46px] flex items-center gap-2 px-4">
          <Search size={20} className="text-secondary-400 shrink-0" />
          <input
            type="text"
            placeholder="Search a program here"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-body-md font-medium text-bg-dark placeholder:text-secondary-400 focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <FilterSelect
          icon={<CircleAlert size={16} />}
          label="Status"
          value={statusFilter}
          onChange={v => setStatusFilter(v as CompanyProgramStatus | '')}
          options={[
            { value: 'active',   label: 'Active'   },
            { value: 'paused',   label: 'Paused'   },
            { value: 'draft',    label: 'Draft'    },
            { value: 'archived', label: 'Archived' },
          ]}
        />

        {/* Sort / type filter */}
        <FilterSelect
          icon={<ChevronDown size={16} />}
          label="Sort by"
          value={typeFilter}
          onChange={v => setTypeFilter(v as CompanyProgramType | '')}
          options={[
            { value: 'public',  label: 'Public'  },
            { value: 'private', label: 'Private' },
          ]}
        />

        <button className="bg-white rounded-xl h-[46px] px-4 flex items-center gap-2 text-body-md font-medium text-secondary-400">
          <ArrowUpDown size={20} />
          Sort by
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-h3 font-semibold text-bg-dark mb-5">Current programs</h3>

        {filtered.length === 0 ? (
          <p className="text-body-md text-secondary-400 py-8 text-center">
            No programs match your filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start text-body-sm font-medium text-secondary-400 pb-4 pe-6 w-[200px]">Name</th>
                  <th className="text-center text-body-sm font-medium text-secondary-400 pb-4 pe-6">Status</th>
                  <th className="text-center text-body-sm font-medium text-secondary-400 pb-4 pe-6">Type</th>
                  <th className="text-center text-body-sm font-medium text-secondary-400 pb-4 pe-6">Budget</th>
                  <th className="text-center text-body-sm font-medium text-secondary-400 pb-4 pe-6">New reports</th>
                  <th className="text-center text-body-sm font-medium text-secondary-400 pb-4 pe-6">Total reports</th>
                  <th className="text-center text-body-sm font-medium text-secondary-400 pb-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((program, idx) => (
                  <tr
                    key={program.id}
                    className={cn(
                      'group',
                      idx !== filtered.length - 1 && 'border-b border-bg-light'
                    )}
                  >
                    {/* Name */}
                    <td className="py-4 pe-6">
                      <div className="flex items-center gap-1.5">
                        <span className="text-body-md font-medium text-bg-dark leading-relaxed">
                          {program.name}
                        </span>
                        <Link href={`/company/programs/${program.id}`}>
                          <ExternalLink size={14} className="text-secondary-400 hover:text-primary-DEFAULT transition-colors" />
                        </Link>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 pe-6 text-center">
                      <StatusPill status={program.status} />
                    </td>

                    {/* Type */}
                    <td className="py-4 pe-6 text-center">
                      <TypePill type={program.type} />
                    </td>

                    {/* Budget */}
                    <td className="py-4 pe-6 text-center">
                      <span className="text-body-md font-medium text-bg-dark leading-relaxed">
                        {formatBudget(program.budget)}{' '}
                        <span className="text-warning-DEFAULT">EGP</span>
                      </span>
                    </td>

                    {/* New reports */}
                    <td className="py-4 pe-6 text-center">
                      <span className="text-body-md font-medium text-bg-dark leading-relaxed">
                        {program.newReports}
                      </span>
                    </td>

                    {/* Total reports */}
                    <td className="py-4 pe-6 text-center">
                      <span className="text-body-md font-medium text-bg-dark leading-relaxed">
                        {program.totalReports}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 text-center">
                      <ActionBtn program={program} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
