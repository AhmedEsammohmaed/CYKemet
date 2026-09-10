'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import {
  ChevronLeft,
  DollarSign,
  BookCheck,
  Trophy,
  ArrowBigUpDash,
  Copy,
  Check,
  Coins,
  LockKeyhole,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { ProgramTypeTag } from '@/components/ui/ProgramTypeTag'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { RewardBox } from '@/components/ui/RewardBox'
import { mockProgramOverview } from '@/lib/mock/hackers'
import { cn } from '@/lib/utils/cn'
import type {
  Program,
  ScopeTarget,
  RewardTier,
  ProgramMessage,
  Severity,
  ScopeTargetSeverity,
} from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

type TabKey = 'All' | 'Scope' | 'Rewards' | 'Program rules' | 'Disclosure guidelines' | 'Non-Eligible'
const TABS: TabKey[] = ['All', 'Scope', 'Rewards', 'Program rules', 'Disclosure guidelines', 'Non-Eligible']

function CompanyLogoFallback({ name, size }: { name: string; size: number }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div
      className="rounded-full bg-primary-500 flex items-center justify-center border-[3px] border-white shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="text-white font-semibold" style={{ fontSize: size * 0.25 }}>
        {initials}
      </span>
    </div>
  )
}

// ─── Scope severity cell ──────────────────────────────────────────────────────

function ScopeSeverityCell({ severity }: { severity: ScopeTargetSeverity }) {
  if (severity === 'none') {
    return <span className="text-body-md text-grey-main">None</span>
  }
  return <SeverityBadge severity={severity as Severity} />
}

// ─── Copy button ──────────────────────────────────────────────────────────────

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
      className="text-grey-main hover:text-primary-500 transition-colors shrink-0"
      aria-label="Copy URL"
    >
      {copied ? <Check size={16} className="text-success-500" /> : <Copy size={16} />}
    </button>
  )
}

// ─── Scope table ──────────────────────────────────────────────────────────────

function ScopeTable({ targets, title, titleColor }: {
  targets: ScopeTarget[]
  title: string
  titleColor: string
}) {
  return (
    <div className="bg-white rounded-card p-6 flex flex-col gap-6">
      <h2 className="text-h3 font-semibold" style={{ color: titleColor }}>{title}</h2>

      {/* Column headers */}
      <div className="grid gap-4 text-body-sm font-medium text-grey-main border-b border-auth-left-bg pb-2"
        style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
        <span>Target</span>
        <span>Type</span>
        <span>Severity</span>
        <span>Reward</span>
      </div>

      {/* Rows */}
      {targets.map((t, i) => (
        <div
          key={i}
          className="grid gap-4 items-center"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-body-lg font-medium text-content-500 truncate">{t.target}</span>
            <CopyButton text={t.target} />
          </div>
          <span className="text-body-md font-medium text-content-500">{t.type}</span>
          <ScopeSeverityCell severity={t.severity} />
          {t.reward === 'None'
            ? <span className="text-body-md text-grey-main">None</span>
            : <RewardBox label={t.reward} />
          }
        </div>
      ))}
    </div>
  )
}

// ─── Bullet list card ─────────────────────────────────────────────────────────

function BulletListCard({ title, items, className }: {
  title: string
  items: string[]
  className?: string
}) {
  return (
    <div className={cn('bg-white rounded-card p-6 flex flex-col gap-5', className)}>
      <h2 className="text-h3 font-semibold text-content-500">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-grey-main mt-1 shrink-0 text-[10px]">●</span>
            <span
              className="text-body-lg font-medium text-content-500"
              style={{ lineHeight: '113%' }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value }: {
  icon: React.ElementType
  label: string
  value: string | number
}) {
  return (
    <div className="bg-white rounded-[9px] flex items-center gap-3 px-4 py-3 flex-1">
      <div className="size-[46px] rounded-full bg-secondary-50 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-primary-500" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-label-2xs text-grey-main leading-tight">{label}</span>
        <span className="text-[22px] font-bold text-content-500 leading-tight">{value}</span>
      </div>
    </div>
  )
}

// ─── Rewards card ─────────────────────────────────────────────────────────────

const severityOrder: RewardTier['severity'][] = ['low', 'medium', 'high', 'critical']
const severityColors: Record<RewardTier['severity'], string> = {
  low: '#003bdf', medium: '#fbbe24', high: '#ff7104', critical: '#f43f5d',
}
const severityLabels: Record<RewardTier['severity'], string> = {
  low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical',
}

function RewardsCard({ tiers, box }: { tiers: RewardTier[]; box: string }) {
  const sorted = severityOrder
    .map((s) => tiers.find((t) => t.severity === s))
    .filter((t): t is RewardTier => t !== undefined)

  return (
    <div className="bg-white rounded-card p-6 relative flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-semibold text-content-500">Rewards</h2>
        <RewardBox label={box} />
      </div>

      {/* Tiers */}
      <div className="flex flex-col gap-5">
        {sorted.map((tier) => (
          <div key={tier.severity} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-h5 font-semibold" style={{ color: severityColors[tier.severity] }}>
                {severityLabels[tier.severity]}
              </span>
              <div className="flex items-center gap-1 text-h5 font-semibold text-content-500">
                {tier.coinsRange ? (
                  <>
                    <Coins size={18} className="text-warning-500" />
                    <span>{tier.coinsRange} coins</span>
                  </>
                ) : (
                  <span>{tier.cashRange}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 text-body-sm text-grey-main">
              <span>Avg. bounty {tier.coinsRange ? `${tier.avgBounty} coins` : `$${tier.avgBounty}`}</span>
              <span>•</span>
              <span>{tier.submissionPct} submissions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Chat message ─────────────────────────────────────────────────────────────

function ChatMessage({ msg }: { msg: ProgramMessage }) {
  const isHacker = msg.sender === 'hacker'

  return (
    <div className={cn('flex gap-3', isHacker ? 'flex-row' : 'flex-row-reverse')}>
      {/* Avatar */}
      <CompanyLogoFallback name={msg.senderName} size={48} />

      {/* Bubble */}
      <div className={cn('flex flex-col gap-1 max-w-[70%]', isHacker ? 'items-start' : 'items-end')}>
        <div className="flex items-center gap-2 text-label-sm text-grey-main">
          <span className="font-medium text-content-500">{msg.senderName}</span>
          <span>•</span>
          <span>{msg.role}</span>
          <span>•</span>
          <span>{msg.timestamp}</span>
        </div>
        <div
          className={cn(
            'rounded-card p-4 text-label-md text-content-500',
            isHacker ? 'bg-auth-left-bg' : 'bg-secondary-50'
          )}
        >
          {msg.content}
        </div>
      </div>
    </div>
  )
}

// ─── Program messages card ────────────────────────────────────────────────────

function ProgramMessagesCard({ messages }: { messages: ProgramMessage[] }) {
  const [message, setMessage] = useState('')

  return (
    <div className="bg-white rounded-card p-6 flex flex-col gap-6">
      <h2 className="text-h3 font-semibold text-content-500">Program messages</h2>

      {/* Textarea */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question about scope, rewards, or rules..."
        className={cn(
          'w-full h-[170px] resize-none rounded-card border border-grey-main',
          'p-4 text-h5 font-medium text-content-500',
          'placeholder:text-grey-main outline-none focus:border-primary-500 transition-colors'
        )}
      />

      {/* Send row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LockKeyhole size={20} className="text-primary-500 shrink-0" />
          <span className="text-h4 font-medium text-primary-500">
            Private message - visible only to you and the company
          </span>
        </div>
        <button
          type="button"
          onClick={() => { console.log('send:', message); setMessage('') }}
          className="h-[60px] w-[227px] rounded-card bg-primary-500 text-white text-h3 font-medium hover:opacity-90 transition-opacity shrink-0"
        >
          Send message
        </button>
      </div>

      {/* Conversation divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-auth-left-bg" />
        <span className="text-h5 text-grey-main shrink-0">Conversation</span>
        <div className="flex-1 h-px bg-auth-left-bg" />
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
      </div>

      {/* End of conversation divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-auth-left-bg" />
        <span className="text-body-md text-grey-main shrink-0">End of conversation</span>
        <div className="flex-1 h-px bg-auth-left-bg" />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgramOverviewPage() {
  const { setTitle } = useNav()
  const params = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<TabKey>('All')

  useEffect(() => {
    setTitle('Program overview')
  }, [setTitle])

  // In a real app: fetch by params.id. For now always return mockProgramOverview.
  const program: Program = mockProgramOverview

  const showSection = (tab: TabKey) => activeTab === 'All' || activeTab === tab

  const inScopeTargets = program.scopeTargets?.filter((t) => t.inScope) ?? []
  const outOfScopeTargets = program.scopeTargets?.filter((t) => !t.inScope) ?? []
  const box1Tiers = program.rewards?.filter((r) => r.box === 'Box 1') ?? []
  const box2Tiers = program.rewards?.filter((r) => r.box === 'Box 2') ?? []

  const showLeftColumn =
    showSection('Scope') ||
    showSection('Program rules') ||
    showSection('Disclosure guidelines')

  const showRightColumn = showSection('Rewards')

  return (
    <div className="flex flex-col gap-6">

      {/* ── Back nav ───────────────────────────────────────────────────────── */}
      <Link
        href="/hacker/programs"
        className="flex items-center gap-1 text-body-md text-grey-main hover:text-primary-500 transition-colors w-fit"
      >
        <ChevronLeft size={18} />
        Back to programs
      </Link>

      {/* ── Header card ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-card p-6 flex items-start justify-between gap-6">
        {/* Left: logo + info */}
        <div className="flex items-start gap-5 flex-1 min-w-0">
          {program.companyLogo ? (
            <Image
              src={program.companyLogo}
              alt={program.companyName}
              width={119}
              height={119}
              className="rounded-full object-cover size-[119px] shrink-0"
              unoptimized
            />
          ) : (
            <CompanyLogoFallback name={program.companyName} size={119} />
          )}

          <div className="flex flex-col gap-3 min-w-0">
            {/* Name + badge */}
            <div className="flex items-center gap-3">
              <h1 className="text-h3 font-semibold text-content-500">{program.name}</h1>
              <span className={cn(
                'inline-flex items-center h-[22px] px-3 rounded-[18px] text-body-sm font-medium border',
                program.isActive
                  ? 'bg-[rgba(169,239,195,0.66)] border-[rgba(74,222,128,0.66)] text-success-500'
                  : 'bg-[#fccfd6] border-[rgba(244,63,93,0.66)] text-error-500'
              )}>
                {program.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Type tags */}
            <div className="flex items-center gap-3 flex-wrap">
              {program.scopeTypes.map((s) => (
                <ProgramTypeTag key={s} type={s} />
              ))}
              <ProgramTypeTag type="date" date={program.endsAt} />
            </div>

            {/* Description */}
            <p className="text-body-lg text-grey-main leading-relaxed max-w-[560px]">
              {program.description}
            </p>
          </div>
        </div>

        {/* Right: Submit report */}
        <Link
          href={`/hacker/reports/new?program=${params.id}`}
          className="h-[60px] w-[227px] rounded-card bg-primary-500 text-white text-h3 font-medium flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
        >
          Submit a report
        </Link>
      </div>

      {/* ── Stats row ──────────────────────────────────────────────────────── */}
      {program.stats && (
        <div className="flex gap-4">
          <StatCard icon={DollarSign}    label="Total paid"            value={`$${program.stats.totalPaid.toLocaleString()}`} />
          <StatCard icon={BookCheck}     label="Reports solved"        value={program.stats.reportsSolved.toLocaleString()} />
          <StatCard icon={Trophy}        label="Average bounty range"  value={program.stats.avgBountyRange} />
          <StatCard icon={ArrowBigUpDash} label="Top bounty range"     value={program.stats.topBountyRange} />
        </div>
      )}

      {/* ── Section tabs ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'h-[47px] px-5 rounded-[17px] text-body-md font-medium border transition-colors',
              activeTab === tab
                ? 'bg-secondary-50 border-[rgba(0,59,223,0.66)] text-primary-500'
                : 'bg-white border-[#e5e5e5] text-grey-main hover:bg-auth-left-bg'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Two-column layout ──────────────────────────────────────────────── */}
      <div className="flex gap-8 items-start">

        {/* LEFT column */}
        {showLeftColumn && (
          <div className="flex flex-col gap-6" style={{ width: showRightColumn ? 687 : undefined, flex: showRightColumn ? undefined : 1 }}>
            {showSection('Scope') && inScopeTargets.length > 0 && (
              <ScopeTable targets={inScopeTargets} title="In scope" titleColor="#4ade80" />
            )}
            {showSection('Scope') && outOfScopeTargets.length > 0 && (
              <ScopeTable targets={outOfScopeTargets} title="Out of scope" titleColor="#f43f5d" />
            )}
            {showSection('Program rules') && program.rules && (
              <BulletListCard title="Program rules" items={program.rules} className="min-h-[293px]" />
            )}
            {showSection('Disclosure guidelines') && program.disclosureGuidelines && (
              <BulletListCard title="Disclosure guidelines" items={program.disclosureGuidelines} />
            )}
          </div>
        )}

        {/* RIGHT column — Rewards */}
        {showRightColumn && (
          <div className="flex flex-col gap-6 w-[376px] shrink-0">
            {box1Tiers.length > 0 && <RewardsCard tiers={box1Tiers} box="Box 1" />}
            {box2Tiers.length > 0 && <RewardsCard tiers={box2Tiers} box="Box 2" />}
          </div>
        )}
      </div>

      {/* ── Full-width cards ───────────────────────────────────────────────── */}
      {showSection('Non-Eligible') && program.nonEligible && (
        <BulletListCard title="Non-Eligible" items={program.nonEligible} />
      )}

      {activeTab === 'All' && program.messages && (
        <ProgramMessagesCard messages={program.messages} />
      )}

    </div>
  )
}
