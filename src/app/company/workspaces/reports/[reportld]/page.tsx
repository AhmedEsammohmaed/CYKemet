'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ChevronLeft, Hash, CalendarDays, UserRound,
  File, CirclePlay, CircleCheckBig, CircleX, BadgeInfo, CopyCheck,
} from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useNav } from '@/lib/context/NavContext'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { Checkbox } from '@/components/ui/Checkbox'
import { ActionExplanationModal } from '@/components/company/ActionExplanationModal'
import { cn } from '@/lib/utils/cn'
import { mockWorkspaceReportDetail } from '@/lib/mock/company'
import type { WorkspaceReportStatus } from '@/types'

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<WorkspaceReportStatus, {
  label: string; bg: string; border: string; text: string
}> = {
  new:       { label: 'New',       bg: 'bg-[rgba(233,244,252,0.66)]', border: 'border-primary-500/66', text: 'text-primary-500'  },
  resolved:  { label: 'Resolved',  bg: 'bg-[rgba(169,239,195,0.66)]', border: 'border-success-500',    text: 'text-success-500'  },
  triaged:   { label: 'Triaged',   bg: 'bg-[rgba(253,225,155,0.66)]', border: 'border-warning-500',    text: 'text-warning-500'  },
  in_review: { label: 'In review', bg: 'bg-[rgba(255,113,4,0.66)]',   border: 'border-severity-high',  text: 'text-[#ef6800]'    },
}

function ReportStatusBadge({ status }: { status: WorkspaceReportStatus }) {
  const { label, bg, border, text } = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-[22px] px-[11px] rounded-[18px] border',
        'font-medium text-label-xs whitespace-nowrap',
        bg, border, text
      )}
    >
      {label}
    </span>
  )
}

// ─── Read-only field box ──────────────────────────────────────────────────────

function ReadBox({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-col gap-6 items-start w-full">
      <p className="font-medium text-h5 text-[#1c1d1d]">{label}</p>
      <div
        className={cn(
          'bg-[rgba(133,160,178,0.1)] border border-[#85a0b2] rounded-[12px]',
          'px-8 py-5 w-full font-normal text-body-lg text-[#85a0b2] leading-[1.8]',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Action button ────────────────────────────────────────────────────────────

interface ActionBtnProps {
  icon: React.ElementType
  label: string
  onClick: () => void
}

function ActionBtn({ icon: Icon, label, onClick }: ActionBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-secondary-50 rounded-[12px] h-[128px] w-[180px] flex flex-col items-center justify-center gap-1.5 hover:bg-secondary-100 transition-colors shrink-0"
    >
      <Icon size={40} className="text-primary-500" />
      <span className="font-semibold text-body-lg text-primary-500 text-center leading-tight max-w-[150px]">
        {label}
      </span>
    </button>
  )
}

// ─── Code block ───────────────────────────────────────────────────────────────

const codeStyle = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...(oneLight['pre[class*="language-"]'] as object),
    background: '#e9f4fc',
    margin: 0,
    padding: '16px 8px',
    borderRadius: 0,
    fontSize: '16px',
    lineHeight: '1.3',
    fontFamily: '"Roboto Mono", monospace',
  },
}

function CodeBlock({ code }: { code: string }) {
  const lines = code.split('\n')
  return (
    <div className="flex border border-[rgba(133,160,178,0.5)] rounded-[12px] overflow-clip h-[230px]">
      {/* Line numbers */}
      <div className="bg-white border-e border-[#d9d9d9] px-2 py-4 shrink-0 overflow-hidden">
        {lines.map((_, i) => (
          <p
            key={i}
            className="text-right text-[#b3b3b3] leading-[1.3]"
            style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '16px' }}
          >
            {i + 1}
          </p>
        ))}
      </div>
      {/* Code */}
      <div className="flex-1 overflow-auto bg-secondary-50">
        <SyntaxHighlighter
          language="javascript"
          style={codeStyle}
          customStyle={{
            background: '#e9f4fc',
            margin: 0,
            padding: '16px 8px',
            borderRadius: 0,
            fontSize: '16px',
            lineHeight: '1.3',
            fontFamily: '"Roboto Mono", monospace',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

// ─── Activity entry ───────────────────────────────────────────────────────────

function ActivityEntry({
  actorName,
  actorType,
  action,
  timestamp,
  message,
  statusChange,
  isLast,
}: {
  actorName: string
  actorType: 'hacker' | 'company'
  action: string
  timestamp: string
  message?: string
  statusChange?: WorkspaceReportStatus
  isLast: boolean
}) {
  const avatarBg = actorType === 'company' ? 'bg-primary-500' : 'bg-secondary-50'
  const avatarText = actorType === 'company' ? 'text-white' : 'text-primary-500'
  const initial = actorName.charAt(0).toUpperCase()

  return (
    <div className="relative flex gap-3 items-start">
      {/* Connecting line to next entry */}
      {!isLast && (
        <div
          className="absolute start-9 bg-content-100 w-px"
          style={{ top: '72px', height: 'calc(100% - 32px)' }}
        />
      )}

      {/* Avatar */}
      <div
        className={cn(
          'size-[72px] rounded-full flex items-center justify-center shrink-0 z-[1]',
          avatarBg
        )}
      >
        <span className={cn('font-semibold text-h3', avatarText)}>{initial}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 pt-1 flex-1">
        <p className="font-medium text-h5 text-black leading-normal">
          <span className="font-bold">{actorName}</span>
          {' '}{action}
          {statusChange && (
            <span className="ms-2 inline-flex align-middle">
              <ReportStatusBadge status={statusChange} />
            </span>
          )}
        </p>
        <p className="font-medium text-body-lg text-[#85a0b2]">{timestamp}</p>

        {message && (
          <div className="mt-2 border border-[#85a0b2] rounded-[12px] bg-white px-8 py-5 w-full">
            <p className="font-medium text-h5 text-[#1c1d1d] leading-[1.8] whitespace-pre-line">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ACTION_BUTTONS = [
  { icon: CirclePlay,      label: 'Start triage'      },
  { icon: CircleCheckBig, label: 'Approve & pay'      },
  { icon: CircleX,        label: 'Reject'             },
  { icon: BadgeInfo,      label: 'Request more info'  },
  { icon: CopyCheck,      label: 'Mark as duplicate'  },
] as const

export default function WorkspaceReportDetailPage() {
  const { workspaceId } = useParams<{ workspaceId: string; reportId: string }>()
  const router = useRouter()
  const { setTitle } = useNav()

  const report = mockWorkspaceReportDetail

  const [useCvss, setUseCvss]           = useState(false)
  const [severity, setSeverity]         = useState<string>('medium')
  const [reward, setReward]             = useState(String(report.rewardAmount))
  const [message, setMessage]           = useState('')
  const [internalNote, setInternalNote] = useState('')
  const [modalOpen, setModalOpen]       = useState(false)
  const [activeAction, setActiveAction] = useState('')

  useEffect(() => { setTitle(report.reportId) }, [setTitle, report.reportId])

  function openAction(label: string) {
    setActiveAction(label)
    setModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <ActionExplanationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        actionName={activeAction}
      />

      {/* 1 ─ Report header card */}
      <div className="bg-white rounded-card px-[22px] pt-[22px] pb-6 flex flex-col gap-4">
        {/* Top row: back + report ID */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(`/company/workspaces/${workspaceId}`)}
            className="text-[#1c1d1d] hover:text-primary-500 transition-colors"
            aria-label="Back to workspace"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold text-[26px] text-black">{report.reportId}</span>
        </div>

        {/* Title + badges */}
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-[32px] text-[#1c1d1d] leading-normal">
            {report.title}
          </h1>
          <div className="flex items-center gap-4">
            <SeverityBadge severity={report.severity} />
            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-content-100" />

        {/* Meta row */}
        <div className="flex items-center gap-[80px]">
          <div className="flex items-center gap-1">
            <Hash size={18} className="text-[#85a0b2] shrink-0" />
            <p className="font-medium text-body-md">
              <span className="text-[#85a0b2]">Report ID:{'  '}</span>
              <span className="text-[#1c1d1d]">{report.reportId}</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays size={18} className="text-[#85a0b2] shrink-0" />
            <p className="font-medium text-body-md">
              <span className="text-[#85a0b2]">Submitted:{'  '}</span>
              <span className="text-[#1c1d1d]">{report.submittedDate}</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <UserRound size={18} className="text-[#85a0b2] shrink-0" />
            <p className="font-medium text-body-md">
              <span className="text-[#85a0b2]">Hacker:{'  '}</span>
              <span className="text-[#1c1d1d]">{report.hackerName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2 ─ Vulnerability details card */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <h2 className="font-semibold text-h3 text-[#1c1d1d]">Vulnerability details</h2>

        {/* Vuln type + affected asset */}
        <div className="flex gap-[59px] items-start">
          <div className="flex-1">
            <ReadBox label="Vulnerability Type">
              <span className="whitespace-nowrap">{report.vulnerabilityType}</span>
            </ReadBox>
          </div>
          <div className="flex-1">
            <ReadBox label="Affected Asset">
              <span className="break-all">{report.affectedAsset}</span>
            </ReadBox>
          </div>
        </div>

        {/* Description */}
        <ReadBox label="Description" className="h-[147px] overflow-auto">
          {report.description}
        </ReadBox>

        {/* Steps to reproduce */}
        <ReadBox label="Steps to reproduce" className="h-[312px] overflow-auto whitespace-pre-line">
          {report.stepsToReproduce}
        </ReadBox>

        {/* Expected results — code block */}
        <div className="flex flex-col gap-6 items-start w-full">
          <p className="font-medium text-h5 text-[#1c1d1d]">Expected results</p>
          <CodeBlock code={report.expectedResults} />
        </div>

        {/* Impact */}
        <ReadBox label="Impact" className="h-[169px] overflow-auto whitespace-pre-line">
          {report.impact}
        </ReadBox>

        {/* Recommendations */}
        <ReadBox label="Recommendations" className="h-[275px] overflow-auto whitespace-pre-line">
          {report.recommendations}
        </ReadBox>
      </div>

      {/* 3 ─ Attachments */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <h2 className="font-semibold text-h3 text-[#1c1d1d]">Attachments & Proof of concept</h2>
        <div className="flex gap-[22px] flex-wrap">
          {report.attachments.map((file, i) => (
            <div
              key={i}
              className="border border-[rgba(0,59,223,0.66)] rounded-[10px] w-[426px] h-[140px] p-[20px] flex flex-col gap-[18px] justify-center"
            >
              <div className="flex items-center gap-1.5">
                <File size={24} className="text-primary-500 shrink-0" />
                <span className="font-semibold text-h5 text-primary-500 truncate">{file.name}</span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 bg-[#85a0b2] text-white rounded-[10px] h-[50px] font-medium text-h5 hover:opacity-90 transition-opacity"
                >
                  Preview
                </button>
                <button
                  type="button"
                  className="flex-1 bg-primary-500 text-white rounded-[10px] h-[50px] font-medium text-h5 hover:opacity-90 transition-opacity"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 ─ Collaborators */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-semibold text-h3 text-[#1c1d1d]">Collaborators</h2>
          <p className="font-medium text-body-lg text-[#85a0b2]">
            The percentage amount rewarded for you may change depending on how collaborators respond
          </p>
        </div>
        <div className="flex items-center gap-[95px]">
          {report.collaborators.map((c, i) => (
            <div key={i} className="flex flex-col gap-3 items-center w-[130px]">
              <div className="size-[85px] rounded-full bg-secondary-50 flex items-center justify-center">
                <span className="font-semibold text-h3 text-primary-500">
                  {c.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-semibold text-h5 text-[#1c1d1d] text-center">
                {c.username} - {c.percentage}%
              </span>
              <span className="font-semibold text-body-lg text-[#85a0b2] text-center capitalize">
                {c.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5 ─ Activity + message composer */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <h2 className="font-semibold text-h3 text-black">Activity</h2>

        {/* Timeline */}
        <div className="flex flex-col gap-10">
          {report.activity.map((entry, index) => (
            <ActivityEntry
              key={entry.id}
              actorName={entry.actorName}
              actorType={entry.actorType}
              action={entry.action}
              timestamp={entry.timestamp}
              message={entry.message}
              statusChange={entry.statusChange}
              isLast={index === report.activity.length - 1}
            />
          ))}
        </div>

        {/* Message composer */}
        <div className="flex flex-col gap-4 items-end">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message to the hacker"
            className="w-full h-[170px] border border-[#85a0b2] rounded-[12px] px-[35px] py-[26px] font-medium text-h5 text-content-500 placeholder:text-[#85a0b2] resize-none outline-none focus:border-primary-500 transition-colors"
          />
          <button
            type="button"
            className="bg-primary-500 text-white rounded-[12px] h-[60px] w-[227px] font-medium text-h3 hover:opacity-90 transition-opacity"
          >
            Send message
          </button>
        </div>
      </div>

      {/* 6 ─ Report decisions */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-h3 text-[#1c1d1d] leading-[1.8]">Report decisions</h2>
          <p className="font-normal text-body-lg text-[#85a0b2] leading-[1.8]">
            Choose how you want to handle this vulnerability report
          </p>
        </div>

        {/* Triage controls */}
        <div className="flex flex-col gap-6">
          <p className="font-medium text-h4 text-primary-500 leading-[1.8]">Triage controls</p>

          <div className="flex gap-[59px] items-start">
            {/* Severity adjustment */}
            <div className="flex-1 flex flex-col gap-6">
              <p className="font-medium text-h5 text-[#1c1d1d]">
                Severity adjustment <span className="text-[#f43f5d]">*</span>
              </p>
              <div className="relative border border-[#85a0b2] rounded-[12px] h-[60px] px-8 flex items-center justify-between">
                <span className="font-normal text-body-lg text-[#85a0b2] capitalize">{severity}</span>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                >
                  {['critical', 'high', 'medium', 'low', 'informational'].map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <ChevronLeft size={16} className="text-[#85a0b2] -rotate-90" />
              </div>
            </div>

            {/* Reward adjustment */}
            <div className="flex-1 flex flex-col gap-6">
              <p className="font-medium text-h5 text-[#1c1d1d]">
                Reward adjustment <span className="text-[#f43f5d]">*</span>
              </p>
              <div className="border border-[#85a0b2] rounded-[12px] h-[60px] px-8 flex items-center">
                <span className="font-normal text-body-lg text-[#85a0b2] me-2">$</span>
                <input
                  type="number"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  className="flex-1 bg-transparent outline-none font-normal text-body-lg text-[#85a0b2]"
                />
              </div>
            </div>
          </div>

          <Checkbox
            checked={useCvss}
            onChange={setUseCvss}
            label="Calculate severity using CVSS"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-6">
          <p className="font-medium text-h4 text-primary-500 leading-[1.8]">Action Buttons</p>
          <div className="flex gap-[38px] flex-wrap">
            {ACTION_BUTTONS.map(({ icon, label }) => (
              <ActionBtn
                key={label}
                icon={icon}
                label={label}
                onClick={() => openAction(label)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 7 ─ Internal messages */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-semibold text-h3 text-black">Internal messages</h2>
          <p className="font-medium text-h5 text-[#85a0b2]">
            This section is not visible to the hacker
          </p>
        </div>

        <div className="relative flex flex-col gap-4 items-end">
          {/* "To: Everyone" selector — positioned top-right of textarea */}
          <div className="absolute end-0 top-0 bg-[rgba(133,160,178,0.1)] rounded-[12px] h-[60px] w-[273px] px-[34px] flex items-center gap-[57px]">
            <p className="font-medium text-h5">
              <span className="text-[#1c1d1d]">To:{'   '}</span>
              <span className="text-[#85a0b2]">Everyone</span>
            </p>
            <ChevronLeft size={16} className="text-[#85a0b2] -rotate-90 shrink-0" />
          </div>

          <textarea
            value={internalNote}
            onChange={(e) => setInternalNote(e.target.value)}
            placeholder="Add internal notes for the security team"
            className="w-full h-[127px] border border-[#85a0b2] rounded-[12px] px-8 py-5 font-medium text-h5 text-content-500 placeholder:text-[#85a0b2] resize-none outline-none focus:border-primary-500 transition-colors"
          />
          <button
            type="button"
            className="bg-primary-500 text-white rounded-[12px] h-[60px] w-[227px] font-medium text-h3 hover:opacity-90 transition-opacity"
          >
            Send message
          </button>
        </div>
      </div>
    </div>
  )
}
