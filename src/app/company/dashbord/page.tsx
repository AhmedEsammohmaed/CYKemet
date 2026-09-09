'use client'

import { useEffect } from 'react'
import {
  Activity,
  Newspaper,
  BookCheck,
  DollarSign,
  Search,
  CircleAlert,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Dot,
} from 'recharts'
import { cn } from '@/lib/utils/cn'
import { useNav } from '@/lib/context/NavContext'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import {
  mockCompanyStats,
  mockCompanyPrograms,
  mockCompanyReports,
  mockVulnTypes,
  mockReportsTrend,
} from '@/lib/mock/company'
import type { CompanyReportStatus } from '@/types'

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="flex-1 bg-white rounded-card flex items-center gap-5 px-[39px] py-[18px]">
      <div className="size-[70px] rounded-full bg-secondary-50 flex items-center justify-center shrink-0">
        <Icon size={28} className="text-primary-500" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-body-md text-grey-main">{label}</span>
        <span className="text-h1 font-bold text-content-500">{value}</span>
      </div>
    </div>
  )
}

const reportStatusConfig: Record<
  CompanyReportStatus,
  { label: string; className: string }
> = {
  new: {
    label: 'New',
    className: 'border text-[#003bdf]',
  },
  in_review: {
    label: 'In Review',
    className: 'border text-[#ef6800]',
  },
  triaged: {
    label: 'Triaged',
    className: 'border text-[#fbbe24]',
  },
  resolved: {
    label: 'Resolved',
    className: 'border text-[#4ade80]',
  },
}

const reportStatusBg: Record<CompanyReportStatus, React.CSSProperties> = {
  new:       { backgroundColor: 'rgba(233,244,252,0.66)', borderColor: 'rgba(0,59,223,0.66)' },
  in_review: { backgroundColor: 'rgba(255,113,4,0.12)',   borderColor: '#ff7104' },
  triaged:   { backgroundColor: 'rgba(253,225,155,0.66)', borderColor: '#fbbe24' },
  resolved:  { backgroundColor: 'rgba(169,239,195,0.66)', borderColor: '#4ade80' },
}

function CompanyReportStatusBadge({ status }: { status: CompanyReportStatus }) {
  const config = reportStatusConfig[status]
  const style  = reportStatusBg[status]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[18px] px-3 py-0.5 text-label-xs font-medium whitespace-nowrap',
        config.className
      )}
      style={style}
    >
      {config.label}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CompanyDashboard() {
  const { setTitle } = useNav()
  useEffect(() => { setTitle('Dashboard') }, [setTitle])

  return (
    <div className="flex flex-col gap-6">

      {/* ── Section 1: Stat Cards ───────────────────────────────────────────── */}
      <div className="flex gap-6">
        <StatCard icon={Activity}    label="Active Programs"  value={mockCompanyStats.activePrograms.toLocaleString()} />
        <StatCard icon={Newspaper}   label="New reports"      value={mockCompanyStats.newReports.toLocaleString()} />
        <StatCard icon={BookCheck}   label="Total reports"    value={mockCompanyStats.totalReports.toLocaleString()} />
        <StatCard icon={DollarSign}  label="Budget remaining" value={mockCompanyStats.budgetRemaining} />
      </div>

      {/* ── Section 2: Programs + Vuln Types ───────────────────────────────── */}
      <div className="flex gap-6">

        {/* Current Programs — ~71% */}
        <div className="flex-[71] bg-white rounded-card p-6 flex flex-col gap-5 min-w-0">
          <h2 className="text-h3 font-semibold text-content-500">Current programs</h2>

          {/* Toolbar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 h-[40px] px-3 bg-auth-left-bg rounded-[10px] flex-1 max-w-[260px]">
              <Search size={16} className="text-grey-main shrink-0" />
              <input
                type="text"
                placeholder="Search a program"
                className="flex-1 bg-transparent text-body-md text-content-500 placeholder:text-grey-main outline-none border-none"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 h-[40px] px-4 bg-auth-left-bg rounded-[10px] text-body-md text-grey-main"
            >
              <CircleAlert size={16} className="shrink-0" />
              Status
              <ChevronDown size={16} className="shrink-0" />
            </button>
            <button
              type="button"
              className="ms-auto h-[40px] px-4 bg-primary-500 text-white text-body-md font-medium rounded-[12px] hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              Create a program
            </button>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-x-6 px-2">
            {['Name', 'Status', 'Budget', 'New reports', 'Total reports', 'Action'].map((h) => (
              <span key={h} className="text-label-xs text-grey-main font-medium uppercase tracking-wide">
                {h}
              </span>
            ))}
          </div>

          {/* Table rows */}
          <div className="flex flex-col gap-8">
            {mockCompanyPrograms.map((program) => (
              <div
                key={program.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-x-6 px-2 items-center"
              >
                {/* Name */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-body-md font-medium text-content-500 truncate">
                    {program.name}
                  </span>
                  <ExternalLink size={18} className="text-grey-main shrink-0" />
                </div>

                {/* Status */}
                <span
                  className={cn(
                    'text-body-md font-medium',
                    program.status === 'active' && 'text-success-500',
                    program.status === 'paused' && 'text-warning-400',
                    program.status === 'draft'  && 'text-grey-main'
                  )}
                >
                  {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                </span>

                {/* Budget */}
                <span className="text-body-md">
                  <span className="text-content-500 font-medium">200K </span>
                  <span className="text-warning-400 font-medium">EGP</span>
                </span>

                {/* New reports */}
                <span className="text-body-md text-content-500">{program.newReports}</span>

                {/* Total reports */}
                <span className="text-body-md text-content-500">{program.totalReports}</span>

                {/* Action */}
                <span
                  className="inline-flex items-center px-[11px] py-[3px] rounded-[18px] text-label-xs font-medium text-primary-500 cursor-pointer whitespace-nowrap w-fit"
                  style={{
                    backgroundColor: 'rgba(233,244,252,0.66)',
                    border: '1px solid rgba(0,59,223,0.66)',
                  }}
                >
                  View reports
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vulnerability Types — ~29% */}
        <div className="flex-[29] bg-white rounded-card p-6 flex flex-col gap-5">
          <h2 className="text-h3 font-semibold text-content-500">Vulnerability types</h2>

          {/* Donut chart */}
          <div className="flex justify-center">
            <ResponsiveContainer width={220} height={200}>
              <PieChart>
                <Pie
                  data={mockVulnTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {mockVulnTypes.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend — 2×2 grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {mockVulnTypes.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="size-[15px] rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-label-sm text-grey-main">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: Reports Trend ────────────────────────────────────────── */}
      <div className="bg-white rounded-card p-6 flex flex-col gap-5">
        <h2 className="text-h3 font-semibold text-content-500">Reports Trend (Last 30 Days)</h2>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={mockReportsTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid
              horizontal
              vertical={false}
              strokeDasharray="4 4"
              stroke="#dfe5ee"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#85a0b2', fontSize: 13 }}
            />
            <YAxis
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#85a0b2', fontSize: 13 }}
              ticks={[1, 7, 13, 28, 32]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#003bdf"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy } = props
                return (
                  <Dot
                    key={`dot-${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={8}
                    fill="white"
                    stroke="#003bdf"
                    strokeWidth={2}
                  />
                )
              }}
              activeDot={{ r: 8, fill: 'white', stroke: '#003bdf', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Section 4: Recent Reports ───────────────────────────────────────── */}
      <div className="bg-white rounded-card p-6 flex flex-col gap-5">
        <h2 className="text-h3 font-semibold text-content-500">Recent Reports</h2>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 h-[40px] px-3 bg-auth-left-bg rounded-[10px] flex-1 max-w-[260px]">
            <Search size={16} className="text-grey-main shrink-0" />
            <input
              type="text"
              placeholder="Search a report"
              className="flex-1 bg-transparent text-body-md text-content-500 placeholder:text-grey-main outline-none border-none"
            />
          </div>
          <button
            type="button"
            className="ms-auto h-[40px] px-4 bg-primary-500 text-white text-body-md font-medium rounded-[12px] hover:bg-primary-600 transition-colors whitespace-nowrap"
          >
            View all reports
          </button>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-x-6 px-2">
          {['Report ID', 'Severity', 'Submitted by', 'Status'].map((h) => (
            <span key={h} className="text-label-xs text-grey-main font-medium uppercase tracking-wide">
              {h}
            </span>
          ))}
        </div>

        {/* Table rows */}
        <div className="flex flex-col gap-8">
          {mockCompanyReports.map((report) => (
            <div
              key={report.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-x-6 px-2 items-center"
            >
              {/* Report ID */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-body-md font-medium text-content-500">
                  {report.reportId}
                </span>
                <ExternalLink size={18} className="text-grey-main shrink-0" />
              </div>

              {/* Severity */}
              <SeverityBadge severity={report.severity} />

              {/* Submitted by */}
              <span className="text-body-md text-content-500">{report.submittedBy}</span>

              {/* Status */}
              <CompanyReportStatusBadge status={report.status} />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
