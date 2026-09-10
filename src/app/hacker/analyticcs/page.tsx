'use client'

import { useEffect } from 'react'
import {
  Bug,
  DollarSign,
  Coins,
  BadgePercent,
  ArrowRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts'
import { useNav } from '@/lib/context/NavContext'
import { cn } from '@/lib/utils/cn'
import {
  mockAnalyticsStats,
  mockSkillRadar,
  mockSeverityDistribution,
  mockSkillGaps,
  mockRecommendedActions,
} from '@/lib/mock/analytics'
import type { RecommendationType, SkillGapItem, RecommendedAction } from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Pie order: Low → Medium → critical → High (clockwise from top)
const severityPieData = [
  { name: 'Low',      value: mockSeverityDistribution.low,      fill: '#003bdf' },
  { name: 'Medium',   value: mockSeverityDistribution.medium,   fill: '#fbbe24' },
  { name: 'critical', value: mockSeverityDistribution.critical, fill: '#f43f5d' },
  { name: 'High',     value: mockSeverityDistribution.high,     fill: '#ff7104' },
]

// Legend grid order matches Figma: col1=Low/Medium, col2=critical/High
const severityLegend = [
  { name: 'Low',      fill: '#003bdf' },
  { name: 'critical', fill: '#f43f5d' },
  { name: 'Medium',   fill: '#fbbe24' },
  { name: 'High',     fill: '#ff7104' },
]

function gapColor(gap: number) {
  if (gap >= 35) return 'text-error-500'
  if (gap >= 20) return 'text-[#ffbb38]'
  return 'text-success-500'
}

function typeLabel(type: RecommendationType) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillGapRow({ item }: { item: SkillGapItem }) {
  const gap = item.target - item.current
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex justify-between items-center">
        <span className="text-body-md font-medium text-primary-500">{item.skill}</span>
        <span className={cn('text-body-md font-medium', gapColor(gap))}>{gap}% Gap</span>
      </div>
      <div className="h-[7.5px] rounded-[3px] bg-[rgba(120,120,120,0.2)] w-full">
        <div
          className="h-full rounded-[3px] bg-primary-500"
          style={{ width: `${item.current}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-body-md font-medium text-[rgba(0,59,223,0.6)]">Current: {item.current}%</span>
        <span className="text-body-md font-medium text-primary-500">Target: {item.target}%</span>
      </div>
    </div>
  )
}

function RecommendedActionRow({ action }: { action: RecommendedAction }) {
  return (
    <button
      type="button"
      onClick={() => console.log('Navigate to recommendation', action.id)}
      className="flex flex-col gap-[8px] w-full text-start"
    >
      <div className="flex justify-between items-center w-full">
        <span className="text-h5 font-medium text-content-500">{action.title}</span>
        <ArrowRight size={20} className="text-content-500 shrink-0" />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="inline-flex items-center h-[30px] px-[15px] rounded-[18px] border-[1.5px] border-[rgba(0,59,223,0.66)] bg-[rgba(233,244,252,0.66)]">
          <span className="text-body-md font-medium text-primary-500">{typeLabel(action.type)}</span>
        </div>
        <span className="text-body-md text-grey-main">{action.domain}</span>
      </div>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { setTitle } = useNav()
  useEffect(() => { setTitle('Analytics') }, [setTitle])

  return (
    <div className="flex flex-col gap-6">

      {/* ── Hero card ── */}
      <div className="bg-white rounded-card w-full h-[213px] p-[22px] flex items-center">
        <div className="max-w-[662px]">
          <h1 className="text-title-3 font-semibold text-content-500">Measure your impact</h1>
          <p className="text-h5 text-grey-main mt-[12px]">
            Visualize your achievements, identify skill gaps, and plan your next career move
          </p>
          <div className="flex gap-[32px] mt-[32px]">
            <button
              type="button"
              onClick={() => console.log('Export Excel')}
              className="border border-primary-500 rounded-card h-[60px] w-[203px] text-primary-500 text-h3 font-medium"
            >
              Export Excel
            </button>
            <button
              type="button"
              onClick={() => console.log('Export PDF')}
              className="bg-primary-500 rounded-card h-[60px] w-[283px] text-white text-h3 font-medium"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── Stat cards row ── */}
      <div className="flex gap-[25px]">
        {/* Total bugs */}
        <div className="bg-white rounded-card h-[107px] w-[255px] px-[25px] py-[18px] flex items-center gap-[11px] shrink-0">
          <div className="bg-secondary-50 rounded-[35px] size-[70px] flex items-center justify-center shrink-0">
            <Bug size={28} className="text-primary-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-md font-medium text-grey-main">Total bugs</span>
            <span className="text-h1 font-bold text-content-500 leading-none">{mockAnalyticsStats.totalBugs}</span>
          </div>
        </div>
        {/* Total earnings */}
        <div className="bg-white rounded-card h-[107px] w-[255px] px-[25px] py-[18px] flex items-center gap-[11px] shrink-0">
          <div className="bg-secondary-50 rounded-[35px] size-[70px] flex items-center justify-center shrink-0">
            <DollarSign size={28} className="text-primary-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-md font-medium text-grey-main">Total earnings</span>
            <span className="text-h1 font-bold text-content-500 leading-none">{mockAnalyticsStats.totalEarnings}</span>
          </div>
        </div>
        {/* AVG bounty */}
        <div className="bg-white rounded-card h-[107px] w-[255px] px-[25px] py-[18px] flex items-center gap-[11px] shrink-0">
          <div className="bg-secondary-50 rounded-[35px] size-[70px] flex items-center justify-center shrink-0">
            <Coins size={28} className="text-primary-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-md font-medium text-grey-main">AVG bounty</span>
            <span className="text-h1 font-bold text-content-500 leading-none">{mockAnalyticsStats.avgBounty}</span>
          </div>
        </div>
        {/* Acceptance rate */}
        <div className="bg-white rounded-card h-[107px] w-[255px] px-[25px] py-[18px] flex items-center gap-[11px] shrink-0">
          <div className="bg-secondary-50 rounded-[35px] size-[70px] flex items-center justify-center shrink-0">
            <BadgePercent size={28} className="text-primary-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-body-md font-medium text-grey-main">Acceptance rate</span>
            <span className="text-h1 font-bold text-content-500 leading-none">{mockAnalyticsStats.acceptanceRate}</span>
          </div>
        </div>
      </div>

      {/* ── Row 2: Skills radar + Severity distribution ── */}
      <div className="flex gap-6">

        {/* Skills radar */}
        <div className="bg-white rounded-card h-[396px] p-[22px] w-[682px] shrink-0 flex flex-col gap-1">
          <h2 className="text-h3 font-semibold text-content-500">Skills radar</h2>
          <p className="text-body-lg text-grey-main">Your expertise distribution across domains</p>
          <div className="mt-2">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mockSkillRadar} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#003bdf" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#003bdf" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="skill"
                  tick={{ fontSize: 13, fill: '#85a0b2' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[20, 40, 60, 80, 100]}
                  tick={{ fontSize: 12, fill: '#85a0b2' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip formatter={(v) => [`${String(v)}%`, 'Skill level'] as [string, string]} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#003bdf"
                  strokeWidth={2}
                  fill="url(#skillGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: '#003bdf' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity distribution */}
        <div className="bg-white rounded-card h-[396px] px-[22px] py-[21px] flex-1 flex flex-col justify-between">
          <h2 className="text-h3 font-semibold text-content-500">Severity distribution</h2>
          <div className="w-full flex justify-center items-center">
            <PieChart width={220} height={220}>
              <Pie
                data={severityPieData}
                cx={110}
                cy={110}
                innerRadius={44}
                outerRadius={110}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              />

              <Tooltip formatter={(v) => [`${String(v)}%`] as [string]} />
            </PieChart>
          </div>
          {/* Legend 2×2 — col1: Low/Medium, col2: critical/High */}
          <div className="grid grid-cols-2 gap-y-[35px] gap-x-0">
            {severityLegend.map(entry => (
              <div key={entry.name} className="flex items-center gap-[13px]">
                <div className="size-[16px] rounded-full shrink-0" style={{ backgroundColor: entry.fill }} />
                <span className="text-body-lg font-medium text-grey-main">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Skill gap analysis + Recommended actions ── */}
      <div className="flex gap-6">

        {/* Skill gap analysis */}
        <div className="bg-white rounded-card h-[548px] px-[9px] py-[22px] w-[682px] shrink-0 flex flex-col gap-6">
          <div className="px-[13px]">
            <h2 className="text-h3 font-semibold text-content-500">Skill gap analysis</h2>
            <p className="text-body-lg text-grey-main leading-[1.8] mt-1">
              This view highlights the gap between your current skill levels and recommended target levels
            </p>
          </div>
          <div className="flex flex-col gap-[32px] px-[13px] overflow-y-auto">
            {mockSkillGaps.map(item => (
              <SkillGapRow key={item.skill} item={item} />
            ))}
          </div>
        </div>

        {/* Recommended actions */}
        <div className="bg-white rounded-card h-[548px] px-[22px] py-[21px] flex-1 flex flex-col gap-6 overflow-y-auto">
          <h2 className="text-h3 font-semibold text-content-500">Recommended actions</h2>
          <div className="flex flex-col gap-[32px]">
            {mockRecommendedActions.map(action => (
              <RecommendedActionRow key={action.id} action={action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
