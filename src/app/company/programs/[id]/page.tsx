'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Copy, Lock, ChevronDown, Coins } from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { ToggleSwitch } from '@/components/ui/ToggleSwitch'
import { cn } from '@/lib/utils/cn'
import { mockProgramDetails, mockCompanyPrograms } from '@/lib/mock/company'
import type { CompanyProgramDetail, ViewScopeRow, ViewRewardBox, ChatMessage } from '@/lib/mock/company'
import type { CompanyProgramStatus } from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<CompanyProgramStatus, string> = {
  active:   'text-success-DEFAULT',
  paused:   'text-warning-DEFAULT',
  draft:    'text-secondary-400',
  archived: 'text-secondary-400',
}

const STATUS_LABELS: Record<CompanyProgramStatus, string> = {
  active:   'Active',
  paused:   'Paused',
  draft:    'Draft',
  archived: 'Archived',
}

function formatBudget(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`
  if (n >= 1_000)     return `$${n.toLocaleString()}`
  return `$${n}`
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {})
}

// ─── Bullet list ──────────────────────────────────────────────────────────────

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="size-1.5 rounded-full bg-bg-dark mt-[7px] shrink-0" />
          <span className="text-body-lg font-medium text-bg-dark leading-[1.8]">{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ─── Scope table ──────────────────────────────────────────────────────────────

interface ScopeTableProps {
  title: string
  titleColorClass: string
  rows: ViewScopeRow[]
}

function ScopeTable({ title, titleColorClass, rows }: ScopeTableProps) {
  return (
    <div className="bg-white rounded-xl px-[17px] py-[18px] flex flex-col gap-6">
      <h3 className={cn('text-h3 font-semibold', titleColorClass)}>{title}</h3>

      <div className="flex gap-10">
        {/* Target column */}
        <div className="flex flex-col gap-8 w-[205px]">
          <span className="text-body-md font-medium text-secondary-400">Target</span>
          {rows.map((row, i) => (
            <button
              key={i}
              type="button"
              onClick={() => copyToClipboard(row.target)}
              className="flex items-center gap-2 group"
            >
              <span className="text-body-lg font-medium text-bg-dark truncate group-hover:text-primary-DEFAULT transition-colors">
                {row.target}
              </span>
              <Copy size={14} className="text-secondary-400 shrink-0 group-hover:text-primary-DEFAULT transition-colors" />
            </button>
          ))}
        </div>

        {/* Type column */}
        <div className="flex flex-col gap-8 w-[100px] text-center">
          <span className="text-body-md font-medium text-secondary-400">Type</span>
          {rows.map((row, i) => (
            <span key={i} className="text-body-md font-medium text-bg-dark">{row.type}</span>
          ))}
        </div>

        {/* Severity column */}
        <div className="flex flex-col gap-8 w-[82px] items-center">
          <span className="text-body-md font-medium text-secondary-400">Severity</span>
          {rows.map((row, i) => (
            <span key={i}>
              {row.severity ? (
                <SeverityBadge severity={row.severity} />
              ) : (
                <span className="text-body-md font-medium text-secondary-400">—</span>
              )}
            </span>
          ))}
        </div>

        {/* Reward column */}
        <div className="flex flex-col gap-8 w-[63px] items-center">
          <span className="text-body-md font-medium text-secondary-400">Reward</span>
          {rows.map((row, i) => (
            <span key={i}>
              {row.rewardBox ? (
                <span className="inline-flex items-center justify-center px-3 py-0.5 rounded-full border text-label-sm font-medium bg-tint-DEFAULT/[.66] border-primary-DEFAULT/[.66] text-primary-DEFAULT whitespace-nowrap">
                  {row.rewardBox}
                </span>
              ) : (
                <span className="text-body-md font-medium text-bg-dark">None</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Rewards card ─────────────────────────────────────────────────────────────

interface RewardsCardProps {
  box: ViewRewardBox
}

function RewardsCard({ box }: RewardsCardProps) {
  return (
    <div className="bg-white rounded-xl px-[15px] py-[19px] relative">
      {/* Box label top-right */}
      <span className="absolute top-[37px] end-[18px] inline-flex items-center justify-center px-3 py-0.5 rounded-full border text-label-sm font-medium bg-tint-DEFAULT/[.66] border-primary-DEFAULT/[.66] text-primary-DEFAULT whitespace-nowrap">
        {box.name}
      </span>

      <div className="flex flex-col gap-6">
        <h3 className="text-h3 font-semibold text-bg-dark">Rewards</h3>

        <div className="flex flex-col gap-[22px]">
          {box.rows.map((row, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Severity + amount row */}
              <div className="flex items-center justify-between h-[23px]">
                <SeverityBadge severity={row.severity} />
                {row.rewardType === 'bounty' ? (
                  <span className="text-body-lg font-medium text-bg-dark">{row.bountyDisplay}</span>
                ) : (
                  <span className="flex items-center gap-1 text-body-lg font-medium text-bg-dark">
                    <span>{row.coinMin?.toLocaleString()}</span>
                    <Coins size={16} className="text-warning-DEFAULT" />
                    <span>- {row.coinMax?.toLocaleString()}</span>
                    <Coins size={16} className="text-warning-DEFAULT" />
                  </span>
                )}
              </div>
              {/* Stats */}
              <div className="flex flex-col gap-1">
                <span className="text-body-sm text-secondary-400">{row.avgBounty}</span>
                <span className="text-body-sm text-secondary-400">{row.submissions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Policy card ──────────────────────────────────────────────────────────────

function PolicyCard({ title, items, fullWidth = false }: { title: string; items: string[]; fullWidth?: boolean }) {
  return (
    <div className={cn('bg-white rounded-xl px-4 py-5', fullWidth && 'w-full')}>
      <div className="flex flex-col gap-6">
        <h3 className="text-h3 font-semibold text-bg-dark">{title}</h3>
        <BulletList items={items} />
      </div>
    </div>
  )
}

// ─── Chat message ─────────────────────────────────────────────────────────────

function ChatBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className={cn('flex flex-col gap-3', msg.isOwn && 'items-end')}>
      {/* Author row */}
      <div className="flex items-center gap-3">
        <div className="size-[46px] rounded-full bg-secondary-50 flex items-center justify-center shrink-0">
          <span className="text-body-md font-semibold text-bg-dark select-none">
            {msg.author.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-body-lg font-semibold text-bg-dark">{msg.author}</span>
          <span className="size-1 rounded-full bg-secondary-400 shrink-0" />
          <span className="text-body-lg font-semibold text-bg-dark">{msg.role}</span>
          <span className="size-1 rounded-full bg-secondary-400 shrink-0" />
          <span className="text-body-lg font-semibold text-secondary-400">{msg.timeAgo}</span>
        </div>
      </div>
      {/* Bubble */}
      <div
        className={cn(
          'max-w-[85%] px-5 py-4 rounded-xl text-body-lg font-medium text-bg-dark',
          msg.isOwn ? 'bg-tint-DEFAULT/[.4] rounded-tr-none' : 'bg-bg-light rounded-tl-none'
        )}
      >
        {msg.text}
      </div>
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function ConversationDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex-1 h-px bg-secondary-400/30" />
      <span className="text-body-lg font-medium text-secondary-400 whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-secondary-400/30" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgramViewPage() {
  const { id } = useParams<{ id: string }>()
  const router   = useRouter()
  const { setTitle, setBackHref } = useNav()

  const [program, setProgram] = useState<CompanyProgramDetail | null>(null)
  const [triageEnabled, setTriageEnabled] = useState(true)
  const [messageText, setMessageText] = useState('')
  const [internalNote, setInternalNote] = useState('')

  useEffect(() => {
    // Look for full detail first, fall back to basic program data
    const detail = mockProgramDetails[id]
    if (detail) {
      setProgram(detail)
      setTitle(detail.name)
      setBackHref('/company/programs')
      return
    }

    // Fall back to basic mock — build a minimal detail object
    const basic = mockCompanyPrograms.find(p => p.id === id)
    if (basic) {
      setProgram({
        ...basic,
        description: '',
        endsOn: '—',
        inScope: [],
        outOfScope: [],
        rewardBoxes: [],
        programRules: [],
        disclosureGuidelines: [],
        nonEligible: [],
        messages: [],
      })
      setTitle(basic.name)
      setBackHref('/company/programs')
      return
    }

    router.replace('/company/programs')
  }, [id, router, setTitle, setBackHref])

  // Clear backHref on unmount
  useEffect(() => {
    return () => { setBackHref(null) }
  }, [setBackHref])

  if (!program) return null

  return (
    <div className="flex flex-col gap-6">

      {/* ── Program overview ───────────────────────────────────── */}
      <div className="bg-white rounded-xl p-[22px]">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h3 font-semibold text-bg-dark">Program overview</h2>
          <div className="flex items-center gap-8">
            {/* Visibility */}
            <div className="flex items-center gap-2">
              <span className="text-body-lg text-secondary-400">Visibility:</span>
              <ToggleSwitch checked={program.type === 'public'} onChange={() => {}} />
              <span className="text-body-lg font-medium text-bg-dark capitalize">{program.type}</span>
            </div>
            {/* Edit button */}
            <Link
              href={`/company/programs/${program.id}/edit`}
              className="h-[60px] px-8 bg-primary-DEFAULT text-white text-h3 font-medium rounded-xl flex items-center justify-center hover:bg-primary-DEFAULT/90 transition-colors"
            >
              Edit program
            </Link>
          </div>
        </div>

        {/* Fields grid */}
        <div className="flex flex-col gap-8">
          {/* Row 1: Name + Type */}
          <div className="flex items-start gap-8">
            <div className="flex flex-col gap-1.5 w-[263px]">
              <span className="text-body-lg text-secondary-400">Program name</span>
              <span className="text-body-lg font-medium text-bg-dark">{program.name}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-body-lg text-secondary-400">Type</span>
              <span className="text-body-lg font-medium text-bg-dark capitalize">{program.type} Bug Bounty</span>
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="flex flex-col gap-1.5">
            <span className="text-body-lg text-secondary-400">Description</span>
            <p className="text-body-lg font-medium text-bg-dark leading-[1.8]">{program.description || '—'}</p>
          </div>

          {/* Row 3: Status + Ends on */}
          <div className="flex items-start gap-8">
            <div className="flex flex-col gap-1.5 w-[120px]">
              <span className="text-body-lg font-medium text-secondary-400">Status</span>
              <span className={cn('text-body-lg font-medium', STATUS_COLORS[program.status])}>
                {STATUS_LABELS[program.status]}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-body-lg text-secondary-400">Ends on</span>
              <span className="text-body-lg font-medium text-bg-dark">{program.endsOn}</span>
            </div>
          </div>

          {/* Row 4: Budget + Monthly limit */}
          <div className="flex items-start gap-8">
            <div className="flex flex-col gap-1.5 w-[200px]">
              <span className="text-body-lg text-secondary-400">Total Program Budget</span>
              <span className="text-body-lg font-bold text-bg-dark">{formatBudget(program.budget)}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-body-lg text-secondary-400">Monthly Spending Limit</span>
              <span className="text-body-lg font-bold text-bg-dark">{formatBudget(program.monthlyBudget)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scope + Rewards (two-column) ───────────────────────── */}
      <div className="grid grid-cols-[1fr_376px] gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <ScopeTable title="In scope"     titleColorClass="text-success-DEFAULT" rows={program.inScope}    />
          <ScopeTable title="Out of scope" titleColorClass="text-error-DEFAULT"   rows={program.outOfScope} />
          {program.programRules.length > 0 && (
            <PolicyCard title="Program rules" items={program.programRules} />
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {program.rewardBoxes.map(box => (
            <RewardsCard key={box.name} box={box} />
          ))}
        </div>
      </div>

      {/* ── Disclosure guidelines ──────────────────────────────── */}
      {program.disclosureGuidelines.length > 0 && (
        <PolicyCard title="Disclosure guidelines" items={program.disclosureGuidelines} fullWidth />
      )}

      {/* ── Non-Eligible ───────────────────────────────────────── */}
      {program.nonEligible.length > 0 && (
        <PolicyCard title="Non-Eligible" items={program.nonEligible} fullWidth />
      )}

      {/* ── Program messages ───────────────────────────────────── */}
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
        <h3 className="text-h3 font-semibold text-bg-dark">Program messages</h3>

        {/* Compose area */}
        <div className="flex flex-col gap-4">
          <textarea
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            placeholder="Type a message to the hacker"
            rows={6}
            className="w-full border border-secondary-400 rounded-xl px-[35px] py-[26px] text-body-lg font-medium text-bg-dark placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-primary-DEFAULT shrink-0" />
              <span className="text-body-lg font-medium text-primary-DEFAULT">
                Private message - visible only to you and the hacker
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMessageText('')}
              className="h-[60px] px-8 bg-primary-DEFAULT text-white text-h3 font-medium rounded-xl hover:bg-primary-DEFAULT/90 transition-colors"
            >
              Send message
            </button>
          </div>
        </div>

        {/* Conversation */}
        {program.messages.length > 0 && (
          <>
            <ConversationDivider label="Conversation" />
            <div className="flex flex-col gap-6">
              {program.messages.map(msg => (
                <ChatBubble key={msg.id} msg={msg} />
              ))}
            </div>
            <ConversationDivider label="End of conversation" />
          </>
        )}
      </div>

      {/* ── Triage settings ────────────────────────────────────── */}
      <div className="bg-white rounded-xl p-6 flex flex-col gap-8">
        <h3 className="text-h3 font-semibold text-bg-dark">Triage settings</h3>

        <div className="flex flex-col gap-8">
          {/* Toggle row */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-[22px] font-medium text-bg-dark">Send all incoming reports to triage</span>
              <span className="text-body-lg text-secondary-400">Route vulnerability reports to your security team</span>
            </div>
            <ToggleSwitch checked={triageEnabled} onChange={setTriageEnabled} />
          </div>

          {/* Select workspace */}
          <div className="flex flex-col gap-6">
            <span className="text-[22px] font-medium text-bg-dark">Select workspace</span>
            <button
              type="button"
              className="w-full h-[60px] border border-secondary-400 rounded-xl px-8 flex items-center justify-between"
            >
              <span className="text-body-lg text-secondary-400">Security team</span>
              <ChevronDown size={16} className="text-secondary-400" />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="h-[60px] px-8 bg-primary-DEFAULT text-white text-h3 font-medium rounded-xl hover:bg-primary-DEFAULT/90 transition-colors"
          >
            Go to workspace
          </button>
        </div>
      </div>

      {/* ── Internal messages ──────────────────────────────────── */}
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-h3 font-semibold text-bg-dark">Internal messages</h3>
            <span className="text-body-lg text-secondary-400">This section is not visible to the hacker</span>
          </div>
          {/* To dropdown */}
          <button
            type="button"
            className="h-[60px] px-8 bg-secondary-50 rounded-xl flex items-center gap-4"
          >
            <span className="text-body-lg font-medium text-bg-dark">
              To: <span className="text-secondary-400">Everyone</span>
            </span>
            <ChevronDown size={16} className="text-secondary-400" />
          </button>
        </div>

        <textarea
          value={internalNote}
          onChange={e => setInternalNote(e.target.value)}
          placeholder="Add internal notes for the security team"
          rows={5}
          className="w-full border border-secondary-400 rounded-xl px-8 py-5 text-body-lg font-medium text-bg-dark placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 resize-none"
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setInternalNote('')}
            className="h-[60px] px-8 bg-primary-DEFAULT text-white text-h3 font-medium rounded-xl hover:bg-primary-DEFAULT/90 transition-colors"
          >
            Send message
          </button>
        </div>
      </div>

    </div>
  )
}
