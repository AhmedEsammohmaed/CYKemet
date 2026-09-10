'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { ToggleSwitch } from './ToggleSwitch'
import type { RewardBox, RewardBoxRow, RewardType, Severity } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RewardBoxBuilderProps {
  value: RewardBox
  onChange: (v: RewardBox) => void
  onCancel: () => void
  onSave: () => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SEVERITIES: { key: Severity; label: string; colorClass: string }[] = [
  { key: 'critical', label: 'Critical', colorClass: 'text-severity-critical' },
  { key: 'high',     label: 'High',     colorClass: 'text-severity-high'     },
  { key: 'medium',   label: 'Medium',   colorClass: 'text-severity-medium'   },
  { key: 'low',      label: 'Low',      colorClass: 'text-severity-low'      },
]

const REWARD_TYPE_OPTIONS: { value: RewardType; label: string }[] = [
  { value: 'bounty', label: 'Bounty ($)' },
  { value: 'coin',   label: 'Coins'      },
  { value: 'none',   label: 'None'       },
]

// ─── Default row factory ──────────────────────────────────────────────────────

function defaultRow(severity: Severity): RewardBoxRow {
  return { severity, rewardType: 'bounty', min: 0, max: 0 }
}

export function defaultRewardBox(id: string): RewardBox {
  return {
    id,
    name: '',
    rows: SEVERITIES.map(s => defaultRow(s.key)),
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function RewardBoxBuilder({ value, onChange, onCancel, onSave }: RewardBoxBuilderProps) {
  const [applyToAll, setApplyToAll] = useState(false)

  function updateRow(severity: Severity, patch: Partial<RewardBoxRow>) {
    const updated = value.rows.map(r => {
      if (!applyToAll && r.severity !== severity) return r
      return { ...r, ...patch }
    })
    onChange({ ...value, rows: updated })
  }

  function getRow(severity: Severity): RewardBoxRow {
    return value.rows.find(r => r.severity === severity) ?? defaultRow(severity)
  }

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_28px_rgba(0,0,0,0.25)] p-8 w-full">
      <div className="flex flex-col gap-8">

        {/* Title */}
        <h3 className="text-h3 font-semibold text-bg-dark">Reward customization</h3>

        {/* Name */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-h5 font-medium text-bg-dark">Reward box name</label>
            <input
              type="text"
              value={value.name}
              onChange={e => onChange({ ...value, name: e.target.value })}
              placeholder="e.g., Q1 bug bounty program, box 3"
              className="border border-secondary-400 rounded-xl h-[60px] ps-8 pe-8 w-full text-body-md placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 bg-white"
            />
          </div>

          {/* Severity configuration */}
          <div className="flex flex-col gap-5">
            <label className="text-h5 font-medium text-bg-dark">Severity configuration</label>

            <div className="flex flex-col gap-8">
              {SEVERITIES.map(({ key, label, colorClass }) => {
                const row = getRow(key)
                return (
                  <div key={key} className="flex items-center justify-between gap-5">
                    {/* Severity label */}
                    <span className={cn('text-h4 font-medium w-[100px] shrink-0', colorClass)}>
                      {label}
                    </span>

                    {/* Reward type */}
                    <div className="flex items-center gap-5 flex-1 justify-end">
                      <select
                        value={row.rewardType}
                        onChange={e => updateRow(key, { rewardType: e.target.value as RewardType })}
                        className="bg-secondary-400/10 rounded-xl h-[46px] ps-3 pe-6 text-body-lg font-medium text-bg-dark focus:outline-none cursor-pointer w-[180px] shrink-0"
                      >
                        {REWARD_TYPE_OPTIONS.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>

                      {/* Min */}
                      <input
                        type="number"
                        min={0}
                        value={row.min || ''}
                        onChange={e => updateRow(key, { min: Number(e.target.value) })}
                        placeholder="$ Min"
                        className="border border-secondary-400 rounded-xl h-[46px] ps-8 pe-4 text-body-md placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 w-[180px] shrink-0"
                      />

                      {/* Max */}
                      <input
                        type="number"
                        min={0}
                        value={row.max || ''}
                        onChange={e => updateRow(key, { max: Number(e.target.value) })}
                        placeholder="$ Max"
                        className="border border-secondary-400 rounded-xl h-[46px] ps-8 pe-4 text-body-md placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 w-[180px] shrink-0"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Apply same structure toggle */}
          <div className="flex items-center justify-between">
            <span className="text-h5 font-medium text-bg-dark">
              Apply same reward structure to all severities
            </span>
            <ToggleSwitch checked={applyToAll} onChange={setApplyToAll} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-8">
          <button
            type="button"
            onClick={onCancel}
            className="bg-secondary-400 text-white font-medium text-h5 rounded-xl h-[60px] w-[227px] hover:bg-secondary-400/90 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!value.name.trim()}
            className="bg-primary-DEFAULT text-white font-medium text-h5 rounded-xl h-[60px] w-[227px] hover:bg-primary-DEFAULT/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save reward box
          </button>
        </div>

      </div>
    </div>
  )
}
