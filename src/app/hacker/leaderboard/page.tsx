'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Crown, Medal, Trophy, Star, Newspaper, DollarSign, UserCheck } from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { cn } from '@/lib/utils/cn'
import { PillSwitcher } from '@/components/ui/PillSwitcher'
import {
  mockLeaderboardStats,
  mockLeaderboardOverall,
  mockLeaderboardCountry,
  mockLeaderboardMonthly,
} from '@/lib/mock/hackers'
import type { RankingTab, LeaderboardEntry, HackerLevel } from '@/types'

// ─── Level badge ──────────────────────────────────────────────────────────────

function LevelBadge({ level }: { level: HackerLevel }) {
  const styles: Record<HackerLevel, string> = {
    beginner:     'bg-[rgba(169,239,195,0.66)] border-success-500 text-success-500',
    intermediate: 'bg-[rgba(253,225,155,0.66)] border-warning-500 text-warning-500',
    advanced:     'bg-[rgba(252,207,214,0.66)] border-[rgba(244,63,93,0.66)] text-error-500',
  }
  const labels: Record<HackerLevel, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return (
    <div className={cn(
      'border-[1.5px] border-solid flex items-center justify-center h-[30px] w-[109px] rounded-[18px] shrink-0',
      styles[level]
    )}>
      <span className="text-body-md font-medium">{labels[level]}</span>
    </div>
  )
}

// ─── Rank indicator ────────────────────────────────────────────────────────────

function RankIndicator({ rank }: { rank: number }) {
  if (rank === 1) return (
    <div className="flex flex-col items-center gap-[8px] w-[41px]">
      <Crown size={36} className="text-[#ffbb38]" />
      <span className="text-h3 font-bold text-[#ffbb38] leading-none">#1</span>
    </div>
  )
  if (rank === 2) return (
    <div className="flex flex-col items-center gap-[8px] w-[41px]">
      <Medal size={36} className="text-success-500" />
      <span className="text-h3 font-bold text-success-500 leading-none">#2</span>
    </div>
  )
  if (rank === 3) return (
    <div className="flex flex-col items-center gap-[8px] w-[41px]">
      <Trophy size={36} className="text-severity-high" />
      <span className="text-h3 font-bold text-severity-high leading-none">#3</span>
    </div>
  )
  return (
    <div className="flex flex-col items-center justify-center w-[41px]">
      <span className="text-h3 font-bold text-content-500">#{rank}</span>
    </div>
  )
}

// ─── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({ username, avatarUrl }: { username: string; avatarUrl: string | null }) {
  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={username}
        width={79}
        height={79}
        className="size-[79px] rounded-full object-cover shrink-0"
      />
    )
  }
  const initials = username
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  return (
    <div className="size-[79px] rounded-full bg-secondary-50 flex items-center justify-center shrink-0">
      <span className="text-h3 font-semibold text-primary-500">{initials}</span>
    </div>
  )
}

// ─── Entry row ─────────────────────────────────────────────────────────────────

function EntryRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div className="bg-white rounded-card h-[118px] w-full px-[52px] py-[18px] flex items-center gap-[40px]">
      <RankIndicator rank={entry.rank} />
      <div className="flex items-center justify-between flex-1">
        {/* Left: avatar + username */}
        <div className="flex items-center gap-[22px]">
          <Avatar username={entry.username} avatarUrl={entry.avatarUrl} />
          <span className="text-h5 font-medium text-content-500">{entry.username}</span>
        </div>
        {/* Right: level badge + points */}
        <div className="flex items-center gap-[22px]">
          <LevelBadge level={entry.level} />
          <span className="text-h3 font-semibold text-content-500 w-[140px]">
            {entry.points.toLocaleString()}{' '}
            <span className="text-primary-500">Pts</span>
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const TABS = [
  { value: 'overall' as RankingTab, label: 'Overall ranking' },
  { value: 'country' as RankingTab, label: 'Country ranking' },
  { value: 'monthly' as RankingTab, label: 'Monthly ranking' },
]

const levelAbbr = (level: HackerLevel) =>
  ({ beginner: 'Beg', intermediate: 'Int', advanced: 'Adv' }[level])

export default function LeaderboardPage() {
  const { setTitle } = useNav()
  const [activeTab, setActiveTab] = useState<RankingTab>('overall')
  const stats = mockLeaderboardStats

  useEffect(() => { setTitle('Leaderboard') }, [setTitle])

  const entries: LeaderboardEntry[] =
    activeTab === 'overall' ? mockLeaderboardOverall
    : activeTab === 'country' ? mockLeaderboardCountry
    : mockLeaderboardMonthly

  return (
    <div className="flex flex-col gap-8">

      {/* ── Stat cards ── */}
      <div className="flex gap-[29px]">
        {/* Rank */}
        <div className="bg-white rounded-card h-[84px] w-[255px] px-[25px] py-[18px] flex items-center gap-[11px] shrink-0">
          <div className="bg-secondary-50 rounded-[35px] size-[70px] flex items-center justify-center shrink-0">
            <UserCheck size={28} className="text-primary-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-md font-medium text-grey-main">Rank</span>
            <span className="text-h1 font-bold text-content-500 leading-none">#{stats.rank}</span>
          </div>
        </div>
        {/* Level */}
        <div className="bg-white rounded-card h-[84px] w-[255px] px-[25px] py-[18px] flex items-center gap-[11px] shrink-0">
          <div className="bg-secondary-50 rounded-[35px] size-[70px] flex items-center justify-center shrink-0">
            <Star size={28} className="text-primary-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-md font-medium text-grey-main">Level</span>
            <span className="text-h1 font-bold text-content-500 leading-none">{levelAbbr(stats.level)}</span>
          </div>
        </div>
        {/* Total reports */}
        <div className="bg-white rounded-card h-[84px] w-[255px] px-[25px] py-[18px] flex items-center gap-[11px] shrink-0">
          <div className="bg-secondary-50 rounded-[35px] size-[70px] flex items-center justify-center shrink-0">
            <Newspaper size={28} className="text-primary-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-md font-medium text-grey-main">Total reports</span>
            <span className="text-h1 font-bold text-content-500 leading-none">{stats.totalReports}</span>
          </div>
        </div>
        {/* Profit */}
        <div className="bg-white rounded-card h-[84px] w-[255px] px-[25px] py-[18px] flex items-center gap-[11px] shrink-0">
          <div className="bg-secondary-50 rounded-[35px] size-[70px] flex items-center justify-center shrink-0">
            <DollarSign size={28} className="text-primary-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-md font-medium text-grey-main">Profit</span>
            <span className="text-h1 font-bold text-content-500 leading-none">{stats.profit}</span>
          </div>
        </div>
      </div>

      {/* ── Ranking switcher + list ── */}
      <div className="flex flex-col gap-6">

        {/* Tab switcher */}
        <PillSwitcher<RankingTab>
          options={TABS}
          value={activeTab}
          onChange={setActiveTab}
        />

        {/* Entries */}
        <div className="flex flex-col gap-6">
          {entries.map(entry => (
            <EntryRow key={entry.rank} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  )
}
