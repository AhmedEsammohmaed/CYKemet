'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  Activity,
  Newspaper,
  BookCheck,
  DollarSign,
  ChevronRight,
  ShieldAlert,
  CircleCheck,
  Clock4,
  UsersRound,
  HatGlasses,
  Star,
  Goal,
  Medal,
  VenetianMask,
  SquareAsterisk,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { StatCard } from '@/components/hacker/StatCard'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { cn } from '@/lib/utils/cn'
import {
  mockHackerProfile,
  mockHackerStats,
  mockReputation,
  mockWallet,
  mockActionItems,
} from '@/lib/mock/hackers'
import { mockAcademyCourses } from '@/lib/mock/academy'
import type { ActionItem, AcademyCourse } from '@/types'
import CircleDollarIcon from '@/assets/icons/circle-dollar.svg'
import CoinsIcon from '@/assets/icons/coins.svg'
import RankIcon from '@/assets/icons/rank.svg'

// ─── Sub-components ───────────────────────────────────────────────────────────

const BADGE_ICONS = [HatGlasses, Star, Goal, Medal, VenetianMask, SquareAsterisk]

function ReputationSnapshot() {
  const rep = mockReputation

  return (
    <div className="bg-white rounded-card p-6 flex flex-col gap-6">
      <h2 className="text-h3 font-semibold text-content-500">Reputation snapshot</h2>

      {/* Stats row */}
      <div className="flex gap-2.5 items-center justify-center">
        {/* Total points */}
        <div className="flex items-center gap-4.25 flex-1">
          <div className="size-12.25 rounded-[10.667px] bg-[#FFF5D9] flex items-center justify-center shrink-0">
            <CircleDollarIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-body-sm font-medium text-grey-main">Total points</p>
            <p className="text-h3 font-bold text-content-500 leading-none">{rep.totalPoints.toLocaleString()}</p>
          </div>
        </div>

        {/* Total coins */}
        <div className="flex items-center gap-4.25 flex-1">
          <div className="size-12.25 rounded-[10.667px] bg-[#ffe0eb] flex items-center justify-center shrink-0">
            <CoinsIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-body-sm font-medium text-grey-main">Total coins</p>
            <p className="text-h3 font-bold text-content-500 leading-none">{rep.totalCoins.toLocaleString()}</p>
          </div>
        </div>

        {/* Rank */}
        <div className="flex items-center gap-4.25 flex-1">
          <div className="size-12.25 rounded-[10.667px] bg-[#dcfaf8] flex items-center justify-center shrink-0">
            <RankIcon />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-body-sm font-medium text-grey-main">Rank</p>
            <p className="text-h3 font-bold text-content-500 leading-none">{rep.rank}</p>
          </div>
        </div>
      </div>

      {/* Badges row */}
      <div className="flex flex-col gap-4">
        <p className="text-body-sm font-medium text-grey-main">Current badges (+{rep.badgeCount * 100})</p>
        <div className="flex items-center gap-4">
          {BADGE_ICONS.map((Icon, i) => (
            <div
              key={i}
              className="size-15 rounded-[13px] bg-secondary-50 flex items-center justify-center shrink-0"
            >
              <Icon size={30} className="text-primary-600" />
            </div>
          ))}
          <div className="size-12.5 rounded-full shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] bg-white flex items-center justify-center shrink-0">
            <ChevronRight size={20} className="text-grey-main" />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-body-sm font-medium text-grey-main">
          <span>Progress to next rank</span>
          <span>{rep.nextRank}</span>
        </div>
        <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(120,120,120,0.2)' }}>
          <div
            className="h-full rounded-full bg-primary-600 transition-all"
            style={{ width: `${rep.progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-body-sm font-medium">
          <span style={{ color: 'rgba(0,59,223,0.6)' }}>{rep.progressPercent}% complete</span>
          <span className="text-primary-600">{100 - rep.progressPercent}% to go</span>
        </div>
      </div>
    </div>
  )
}

function ActionsNeeded({ items }: { items: ActionItem[] }) {
  const iconMap: Record<ActionItem['type'], React.ElementType> = {
    report_update: Newspaper,
    verification: ShieldAlert,
    payment: DollarSign,
    other: Activity,
  }

  return (
    <div className="bg-white rounded-card p-6 flex flex-col gap-6">
      <h2 className="text-h3 font-semibold text-content-500">Actions needed</h2>

      <div className="flex flex-col gap-5">
        {items.map((item, idx) => {
          const Icon = iconMap[item.type]
          return (
            <div key={item.id}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="size-15 rounded-[13px] bg-error-100 flex items-center justify-center shrink-0">
                    <Icon size={28} className="text-error-500" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-h5 font-medium text-content-500 leading-snug">{item.title}</p>
                    <p className="text-body-md text-grey-main leading-snug line-clamp-2">{item.description}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-grey-main group-hover:text-primary-600 transition-colors shrink-0" />
              </Link>
              {idx < items.length - 1 && <div className="h-px w-full bg-grey-main/35 mt-5 max-w-104.75 mx-auto" />}
            </div>
          )
        })}
      </div>

      <Link
        href="/hacker/reports"
        className="text-body-lg font-light text-primary-600 underline decoration-solid hover:opacity-80 transition-opacity text-center"
      >
        Go to all notifications
      </Link>
    </div>
  )
}

function WalletCard() {
  const wallet = mockWallet

  return (
    <div className="bg-white rounded-card p-6 flex flex-col gap-6">
      <h2 className="text-h3 font-semibold text-content-500">Wallet</h2>

      <div className="flex gap-3">
        {/* Available */}
        <div
          className="flex-1 rounded-card border px-3.5 py-2.25 flex flex-col gap-1"
          style={{ borderColor: '#16dbcc', background: 'rgba(220,250,248,0.7)' }}
        >
          <div className="flex items-center gap-0.75">
            <CircleCheck size={14} className="shrink-0" style={{ color: '#16dbcc' }} />
            <span className="text-body-sm font-medium text-[#16dbcc]">Available</span>
          </div>
          <p className="text-h1 font-bold text-content-500 leading-none">
            ${wallet.available.toLocaleString()}
          </p>
          <p className="text-[10px] font-medium" style={{ color: 'rgba(133,160,178,0.7)' }}>
            Ready for withdrawal
          </p>
        </div>

        {/* Pending */}
        <div
          className="flex-1 rounded-card border px-3.5 py-2.25 flex flex-col gap-1"
          style={{ borderColor: '#ffc24c', background: 'rgba(255,245,217,0.7)' }}
        >
          <div className="flex items-center gap-0.5">
            <Clock4 size={14} className="shrink-0" style={{ color: '#ffce6f' }} />
            <span className="text-body-sm font-medium text-[#ffce6f]">Pending</span>
          </div>
          <p className="text-h1 font-bold text-content-500 leading-none">
            ${wallet.pending.toLocaleString()}
          </p>
          <p className="text-[10px] font-medium" style={{ color: 'rgba(133,160,178,0.7)' }}>
            8 transactions awaiting approval
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-9.5">
        <div className="flex flex-col gap-1 w-29">
          <p className="text-body-sm font-medium text-grey-main">Total transactions</p>
          <p className="text-h4 font-bold text-content-500">${wallet.totalTransactions.toLocaleString()}</p>
        </div>
        <div className="flex flex-col gap-1 w-29">
          <p className="text-body-sm font-medium text-grey-main">Total earnings</p>
          <p className="text-h4 font-bold text-content-500">${wallet.totalEarnings.toLocaleString()}</p>
        </div>
        <div className="flex flex-col gap-1 w-29">
          <p className="text-body-sm font-medium text-grey-main">Last reward</p>
          <p className="text-h4 font-bold text-content-500">{wallet.lastRewardDaysAgo} days ago</p>
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: AcademyCourse }) {
  return (
    <div className="bg-white rounded-card px-6 py-2.75 flex items-start justify-between gap-11.25">
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <p className="text-[10px] font-medium text-grey-main">Suggested</p>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <p className="text-h5 font-medium text-content-500 truncate">{course.title}</p>
            <p className="text-body-md text-grey-main line-clamp-1">{course.description}</p>
          </div>
          <div className="flex items-center gap-5 text-label-2xs text-grey-main">
            <span className="flex items-center gap-1">
              <UsersRound size={16} />
              {course.studentsCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock4 size={14} />
              {course.durationWeeks} weeks
            </span>
          </div>
        </div>
      </div>
      <DifficultyBadge difficulty={course.difficulty} className="shrink-0 mt-1" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HackerDashboardPage() {
  const { setTitle } = useNav()

  useEffect(() => {
    const firstName = mockHackerProfile.name.split(' ')[0]
    setTitle(`Welcome, ${firstName}!`)
  }, [setTitle])

  const stats = mockHackerStats

  return (
    <div className="flex flex-col gap-6">

      {/* Stat cards row */}
      <div className="flex gap-6.25">
        <StatCard icon={Activity}   label="Active reports"   value={stats.activeReports} />
        <StatCard icon={Newspaper}  label="New reports"      value={stats.newReports} />
        <StatCard icon={BookCheck}  label="Accepted reports" value={stats.acceptedReports} />
        <StatCard icon={DollarSign} label="Paid reports"     value={stats.paidReports} />
      </div>

      {/* Two-column section */}
      <div className="flex gap-6">

        {/* LEFT column */}
        <div className="flex flex-col gap-6 w-137.75 shrink-0">
          <ReputationSnapshot />
          <ActionsNeeded items={mockActionItems} />
        </div>

        {/* RIGHT column */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <WalletCard />

          {/* Academy section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-h3 font-semibold text-content-500">New in academy</h2>
              <Link
                href="/hacker/academy"
                className={cn(
                  'text-body-lg font-medium text-grey-main underline decoration-solid',
                  'hover:text-primary-600 transition-colors'
                )}
              >
                Explore
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {mockAcademyCourses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
