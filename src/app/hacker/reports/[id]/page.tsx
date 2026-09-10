'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  ArrowLeft,
  FileText,
  Shield,
  ExternalLink,
  Download,
  Users,
  Clock,
  MessageSquare,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { mockReportDetail } from '@/lib/mock/reports'
import { cn } from '@/lib/utils/cn'
import { useState } from 'react'
import type { ReportActivity, ReportStatus, ActionNeeded, ActorType } from '@/types'

// ─── Config maps ──────────────────────────────────────────────────────────────

const statusColor: Record<ReportStatus, string> = {
  submitted:    '#003bdf',
  triaged:      '#fbbe24',
  accepted:     '#4ade80',
  paid:         '#4ade80',
  rejected:     '#f43f5d',
  deleted:      '#ff7104',
  draft:        '#85a0b2',
  pending:      '#003bdf',
  duplicate:    '#ff7104',
  out_of_scope: '#85a0b2',
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

const actorColor: Record<ActorType, string> = {
  hacker:  '#003bdf',
  company: '#fbbe24',
  admin:   '#f43f5d',
}

const actorBg: Record<ActorType, string> = {
  hacker:  '#e9f4fc',
  company: '#fffbeb',
  admin:   '#fff1f2',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoRow({ label, value, valueClass }: { label: string; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="flex items-start gap-2 py-3 border-b border-auth-left-bg last:border-0">
      <span className="text-body-md text-grey-main w-[160px] shrink-0">{label}</span>
      <span className={cn('text-body-md font-medium text-content-500 flex-1', valueClass)}>{value}</span>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1.5 rounded-badge hover:bg-auth-left-bg transition-colors shrink-0"
      title="Copy to clipboard"
    >
      {copied
        ? <Check size={14} className="text-success-500" />
        : <Copy size={14} className="text-grey-main" />
      }
    </button>
  )
}

function SectionCard({ title, icon: Icon, children, className }: {
  title: string
  icon?: React.ElementType
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('bg-white rounded-card p-[22px] flex flex-col gap-4', className)}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={18} className="text-primary-500" />}
        <h2 className="text-h5 font-semibold text-content-500">{title}</h2>
      </div>
      {children}
    </div>
  )
}

function ActivityItem({ item }: { item: ReportActivity }) {
  return (
    <div className="flex gap-3">
      {/* Avatar dot */}
      <div className="flex flex-col items-center gap-0 shrink-0 pt-1">
        <div
          className="size-8 rounded-full flex items-center justify-center text-label-2xs font-bold shrink-0"
          style={{ background: actorBg[item.actorRole], color: actorColor[item.actorRole] }}
        >
          {item.actor.slice(0, 2).toUpperCase()}
        </div>
        <div className="w-px flex-1 bg-auth-left-bg mt-1" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 pb-5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-body-md font-semibold text-content-500">{item.actor}</span>
          <span
            className="text-label-2xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: actorBg[item.actorRole], color: actorColor[item.actorRole] }}
          >
            {item.actorRole}
          </span>
          <span className="text-body-sm text-grey-main ms-auto">{item.timestamp}</span>
        </div>
        <p className="text-body-md text-content-500 leading-relaxed">{item.message}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportDetailPage() {
  const { setTitle } = useNav()
  const [replyText, setReplyText] = useState('')

  // In production this would fetch by params.id; use mock for now
  const report = mockReportDetail

  useEffect(() => { setTitle('Report summary') }, [setTitle])

  return (
    <div className="flex flex-col gap-6">

      {/* ── Back + breadcrumb ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-body-md text-grey-main">
        <Link href="/hacker/reports" className="flex items-center gap-1 hover:text-primary-500 transition-colors">
          <ArrowLeft size={16} />
          <span>Reports</span>
        </Link>
        <ChevronRight size={14} />
        <span className="text-content-500 font-medium truncate">{report.id}</span>
      </div>

      {/* ── Header card ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-card p-[22px] flex flex-col gap-5">

        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-body-sm font-medium text-grey-main bg-auth-left-bg rounded-full px-3 py-1">
                {report.id}
              </span>
              <span
                className="text-body-sm font-semibold px-3 py-1 rounded-full"
                style={{ color: statusColor[report.status], background: `${statusColor[report.status]}18` }}
              >
                {statusLabel[report.status]}
              </span>
            </div>
            <h1 className="text-[22px] font-semibold text-content-500 leading-snug">{report.title}</h1>
          </div>

          <SeverityBadge severity={report.severity} />
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-6 flex-wrap text-label-sm text-grey-main">
          <span>Program: <span className="text-primary-500 font-medium">{report.program}</span></span>
          <span>Submitted: <span className="text-content-500 font-medium">{report.submittedAt}</span></span>
          <span>Updated: <span className="text-content-500 font-medium">{report.updatedAt}</span></span>
          {report.cvssScore !== null && (
            <span>CVSS: <span className="text-content-500 font-semibold">{report.cvssScore.toFixed(1)}</span></span>
          )}
        </div>

        {/* Action needed + reward row */}
        <div className="flex items-center gap-4 flex-wrap">
          {report.actionNeeded !== 'none' && (
            <div className="flex items-center gap-2 bg-[rgba(233,244,252,0.66)] border border-[rgba(0,59,223,0.66)] rounded-[18px] h-[30px] px-4">
              <span className="text-body-sm font-semibold text-primary-500">Action needed:</span>
              <span className="text-body-sm text-primary-500">{actionLabel[report.actionNeeded]}</span>
            </div>
          )}
          {report.reward && (
            <div className="flex items-center gap-1.5">
              <span className="text-label-sm text-grey-main">Reward:</span>
              <span className="text-body-md font-semibold text-content-500">{report.reward}</span>
            </div>
          )}
          {report.pointsEarned !== null && (
            <div className="flex items-center gap-1.5">
              <span className="text-label-sm text-grey-main">Points:</span>
              <span className="text-body-md font-semibold text-primary-500">{report.pointsEarned} pts</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Two-column layout ──────────────────────────────────────────────── */}
      <div className="flex gap-6 items-start">

        {/* ── LEFT column (2/3 width) ──────────────────────────────────────── */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">

          {/* Vulnerability details */}
          <SectionCard title="Vulnerability Details" icon={Shield}>
            <InfoRow label="Asset URL" value={
              <a href={report.assetUrl} target="_blank" rel="noopener noreferrer"
                className="text-primary-500 hover:underline flex items-center gap-1">
                {report.assetUrl} <ExternalLink size={12} />
              </a>
            } />
            <InfoRow label="CWE" value={report.cweId} />
            <InfoRow label="Vulnerability URL" value={
              <div className="flex items-center gap-1 min-w-0">
                <span className="truncate">{report.vulnerabilityUrl}</span>
                <CopyButton text={report.vulnerabilityUrl} />
              </div>
            } />
            {report.cvssVector && (
              <InfoRow label="CVSS Vector" value={
                <div className="flex items-center gap-1 min-w-0">
                  <span className="font-mono text-body-sm truncate">{report.cvssVector}</span>
                  <CopyButton text={report.cvssVector} />
                </div>
              } />
            )}
          </SectionCard>

          {/* Description (Markdown) */}
          <SectionCard title="Description" icon={FileText}>
            <div className="markdownPreview text-label-md leading-relaxed">
              <ReactMarkdown
                components={{
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className ?? '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ borderRadius: '8px', fontSize: '13px', margin: 0 }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>{children}</code>
                    )
                  },
                }}
              >
                {report.description}
              </ReactMarkdown>
            </div>
          </SectionCard>

          {/* PoC Files */}
          <SectionCard title="Proof of Concept Files" icon={FileText}>
            {report.pocFiles.length === 0 ? (
              <p className="text-body-md text-grey-main">No files attached.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {report.pocFiles.map((f) => (
                  <li key={f.name} className="flex items-center justify-between bg-auth-left-bg rounded-btn px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText size={16} className="text-grey-main shrink-0" />
                      <span className="text-body-md font-medium text-content-500 truncate">{f.name}</span>
                      <span className="text-body-sm text-grey-main shrink-0">{f.size}</span>
                    </div>
                    <a href={f.url} className="flex items-center gap-1 text-primary-500 hover:underline text-label-sm shrink-0 ms-4">
                      <Download size={14} /> Download
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          {/* Activity timeline + reply */}
          <SectionCard title="Activity" icon={Clock}>
            {/* Timeline */}
            <div className="flex flex-col">
              {report.activity.map((item) => (
                <ActivityItem key={item.id} item={item} />
              ))}
            </div>

            {/* Reply box */}
            <div className="flex flex-col gap-3 pt-2 border-t border-auth-left-bg">
              <span className="text-body-md font-medium text-content-500 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary-500" /> Leave a comment
              </span>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your message…"
                rows={4}
                className={cn(
                  'w-full border border-grey-main rounded-card px-5 py-3 resize-none',
                  'text-body-md text-content-500 placeholder:text-grey-main',
                  'outline-none focus:border-primary-500 transition-colors bg-white'
                )}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { if (replyText.trim()) setReplyText('') }}
                  className="h-[40px] px-6 bg-primary-500 hover:bg-[#0030c0] transition-colors rounded-[10px] text-white text-body-md font-semibold"
                >
                  Send
                </button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ── RIGHT column (sidebar) ───────────────────────────────────────── */}
        <div className="w-[280px] shrink-0 flex flex-col gap-6">

          {/* Collaborators */}
          <SectionCard title="Collaborators" icon={Users}>
            {report.collaborators.length === 0 ? (
              <p className="text-body-md text-grey-main">No collaborators.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {report.collaborators.map((c) => (
                  <li key={c.username} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-secondary-50 flex items-center justify-center text-label-2xs font-bold text-primary-500">
                        {c.username.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-body-md font-medium text-content-500">{c.username}</span>
                    </div>
                    <span className="text-label-sm font-semibold text-primary-500">{c.splitPct}%</span>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          {/* Actions */}
          <SectionCard title="Actions">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="w-full h-[42px] rounded-[10px] bg-primary-500 hover:bg-[#0030c0] transition-colors text-white text-body-md font-semibold"
              >
                Verify Fix
              </button>
              <button
                type="button"
                className="w-full h-[42px] rounded-[10px] border border-primary-500 hover:bg-secondary-50 transition-colors text-primary-500 text-body-md font-semibold"
              >
                Request Mediation
              </button>
              <button
                type="button"
                className="w-full h-[42px] rounded-[10px] border border-grey-main hover:bg-auth-left-bg transition-colors text-grey-main text-body-md font-medium"
              >
                Request Disclosure
              </button>
            </div>
          </SectionCard>

          {/* Report info summary */}
          <SectionCard title="Report Info">
            <div className="flex flex-col">
              <InfoRow label="Report ID" value={
                <div className="flex items-center gap-1">
                  <span>{report.id}</span>
                  <CopyButton text={report.id} />
                </div>
              } />
              <InfoRow label="Program" value={
                <Link href={`/hacker/programs/${report.programId}`} className="text-primary-500 hover:underline flex items-center gap-1">
                  {report.program} <ExternalLink size={11} />
                </Link>
              } />
              <InfoRow label="CWE" value={report.cweId} />
              <InfoRow label="Submitted" value={report.submittedAt} />
              <InfoRow label="Last updated" value={report.updatedAt} />
            </div>
          </SectionCard>
        </div>
      </div>

    </div>
  )
}
