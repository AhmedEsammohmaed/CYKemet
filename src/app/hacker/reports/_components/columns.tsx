import { createColumnHelper } from '@tanstack/react-table'
import { ExternalLink, Coins } from 'lucide-react'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { cn } from '@/lib/utils/cn'
import type { HackerReport, ReportStatus, ActionNeeded } from '@/types'

// ─── Config maps ──────────────────────────────────────────────────────────────

const statusColor: Record<ReportStatus, string> = {
  submitted:    'var(--color-primary-500)',
  triaged:      'var(--color-warning-500)',
  accepted:     'var(--color-success-500)',
  paid:         'var(--color-success-500)',
  rejected:     'var(--color-error-500)',
  deleted:      'var(--color-severity-high)',
  draft:        'var(--color-grey-main)',
  pending:      'var(--color-primary-500)',
  duplicate:    'var(--color-severity-high)',
  out_of_scope: 'var(--color-grey-main)',
}

const statusLabel: Record<ReportStatus, string> = {
  submitted:    'Submitted',
  triaged:      'Triaged',
  accepted:     'Accepted',
  paid:         'Paid',
  rejected:     'Rejected',
  deleted:      'Deleted',
  draft:        'Draft',
  pending:      'Pending',
  duplicate:    'Duplicate',
  out_of_scope: 'Out of scope',
}

const actionLabel: Record<ActionNeeded, string> = {
  add_details:        'Add details',
  request_mediation:  'Request mediation',
  verify_fix:         'Verify fix',
  request_disclosure: 'Request disclosure',
  none:               'None',
}

const severityOrder: Record<string, number> = {
  critical: 0, high: 1, medium: 2, low: 3, informational: 4,
}

// ─── Cell renderers ───────────────────────────────────────────────────────────

function RewardCell({ report }: { report: HackerReport }) {
  if (report.rewardType === 'coins') {
    return (
      <div className="flex items-center gap-1 text-body-lg font-medium text-content-500">
        <span>{report.coinsMin?.toLocaleString()}</span>
        <Coins size={15} className="text-warning-500 shrink-0" />
        <span>-</span>
        <span>{report.coinsMax?.toLocaleString()}</span>
        <Coins size={15} className="text-warning-500 shrink-0" />
      </div>
    )
  }
  if (report.rewardType === 'cash' && report.reward) {
    return <span className="text-body-lg font-medium text-content-500">{report.reward}</span>
  }
  return <span className="text-body-lg text-grey-main">—</span>
}

function ActionCell({ action }: { action: ActionNeeded }) {
  const isNone = action === 'none'
  return (
    <span
      className={cn(
        'inline-flex items-center h-[22px] px-[11px] rounded-[18px] border text-body-sm font-medium',
        isNone
          ? 'bg-[rgba(233,244,252,0.66)] border-[rgba(133,160,178,0.66)] text-grey-main'
          : 'bg-[rgba(233,244,252,0.66)] border-[rgba(0,59,223,0.66)] text-primary-500'
      )}
    >
      {actionLabel[action]}
    </span>
  )
}

// ─── Column definitions ───────────────────────────────────────────────────────

const columnHelper = createColumnHelper<HackerReport>()

export const reportColumns = [
  columnHelper.accessor('title', {
    header: 'Title',
    meta: { width: 196 },
    enableSorting: false,
    cell: ({ getValue }) => (
      <div className="flex items-start gap-1.5 min-w-0">
        <span className="text-body-lg font-medium text-content-500 leading-[1.8] line-clamp-2">
          {getValue()}
        </span>
        <ExternalLink size={16} className="text-grey-main shrink-0 mt-1" />
      </div>
    ),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created on',
    meta: { width: 100 },
    cell: ({ getValue }) => (
      <span className="text-body-lg font-medium text-grey-main">{getValue()}</span>
    ),
  }),
  columnHelper.accessor('program', {
    header: 'Program',
    meta: { width: 94 },
    enableSorting: false,
    cell: ({ getValue }) => (
      <span className="text-body-lg font-medium text-content-500">{getValue()}</span>
    ),
  }),
  columnHelper.accessor('pointsEarned', {
    header: 'Points earned',
    meta: { width: 110, align: 'center' },
    cell: ({ getValue }) => {
      const v = getValue()
      return v !== null
        ? <span className="text-body-lg font-medium text-content-500">{v}Pts</span>
        : <span className="text-body-lg font-medium text-grey-main">None</span>
    },
  }),
  columnHelper.accessor('severity', {
    header: 'Severity',
    meta: { width: 80 },
    sortingFn: (a, b) => severityOrder[a.original.severity] - severityOrder[b.original.severity],
    cell: ({ getValue }) => <SeverityBadge severity={getValue()} />,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    meta: { width: 90, align: 'center' },
    cell: ({ getValue }) => (
      <span
        className="text-body-md font-medium"
        style={{ color: statusColor[getValue()] }}
      >
        {statusLabel[getValue()]}
      </span>
    ),
  }),
  columnHelper.display({
    id: 'reward',
    header: 'Reward',
    meta: { width: 125 },
    enableSorting: false,
    cell: ({ row }) => <RewardCell report={row.original} />,
  }),
  columnHelper.accessor('actionNeeded', {
    id: 'action',
    header: 'Action',
    meta: { width: 136, align: 'center' },
    enableSorting: false,
    cell: ({ getValue }) => (
      <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
        <ActionCell action={getValue()} />
      </div>
    ),
  }),
]
