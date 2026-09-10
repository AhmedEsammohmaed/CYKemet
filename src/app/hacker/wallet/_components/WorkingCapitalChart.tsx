'use client'

import { ChevronDown } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { mockChartData } from '@/lib/mock/wallet'

interface TooltipEntry {
  dataKey?: string | number
  name?: string | number
  value?: number
}

interface ChartTooltipProps {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-primary-500 text-white rounded-badge px-[10px] py-[6px] text-body-sm font-medium">
      <div className="mb-1 opacity-80">{label}</div>
      {payload.map(p => (
        <div key={String(p.dataKey)}>
          {p.name}: ${(p.value ?? 0).toLocaleString()}
        </div>
      ))}
    </div>
  )
}

export function WorkingCapitalChart() {
  return (
    <div className="bg-white rounded-card h-[291px] p-[22px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-h5 font-semibold text-content-500">Working Capital</span>
        <div className="flex items-center gap-[12px]">
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center gap-[4px]">
              <div className="size-[8px] rounded-full bg-success-500" />
              <span className="text-body-sm font-medium text-grey-main">Income</span>
            </div>
            <div className="flex items-center gap-[4px]">
              <div className="size-[8px] rounded-full bg-primary-500" />
              <span className="text-body-sm font-medium text-grey-main">Expenses</span>
            </div>
          </div>
          <button
            type="button"
            className="flex items-center gap-[4px] border border-[#e5e5e5] rounded-btn px-[10px] h-[30px] text-body-sm text-content-500"
          >
            Last 7 days <ChevronDown size={12} />
          </button>
          <button
            type="button"
            className="flex items-center gap-[4px] border border-[#e5e5e5] rounded-btn px-[10px] h-[30px] text-body-sm text-content-500"
          >
            Export statement <ChevronDown size={12} />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={164}>
        <AreaChart data={mockChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#003bdf" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#003bdf" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#e5e5e5" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#85a0b2' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#85a0b2' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => v >= 1000 ? `${v / 1000}K` : `${v}`}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#003bdf"
            strokeWidth={2}
            fill="url(#incomeGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#003bdf' }}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#4ade80"
            strokeWidth={2}
            fill="url(#expensesGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#4ade80' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
