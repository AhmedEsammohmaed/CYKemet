'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNav } from '@/lib/context/NavContext'
import { DataTable } from '@/components/ui/DataTable'
import { mockHackerReports, mockHackerReportStats } from '@/lib/mock/reports'
import { ReportStats } from './_components/ReportStats'
import { ReportFilters } from './_components/ReportFilters'
import { reportColumns } from './_components/columns'

export default function ReportsPage() {
  const { setTitle } = useNav()
  const router = useRouter()
  const [search, setSearch]       = useState('')
  const [statusFilter, setStatus] = useState('all')

  useEffect(() => { setTitle('Reports') }, [setTitle])

  const filtered = useMemo(() =>
    mockHackerReports.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.program.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter
      return matchesSearch && matchesStatus
    }),
    [search, statusFilter]
  )

  return (
    <div className="flex flex-col gap-6">

      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <h1 className="text-h3 font-semibold text-content-500">
          Track and manage your security submissions
        </h1>
        <p className="text-body-lg text-grey-main">
          View report status, collaborate with others, and follow progress until resolution.
        </p>
      </div>

      <ReportStats stats={mockHackerReportStats} />

      <ReportFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatus}
      />

      {/* ── Reports table ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-card px-[22px] py-[32px]">
        <DataTable
          columns={reportColumns}
          data={filtered}
          onRowClick={(report) => router.push(`/hacker/reports/${report.id}`)}
        />
      </div>

    </div>
  )
}
