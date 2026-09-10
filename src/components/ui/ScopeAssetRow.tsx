'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { ScopeAsset, RewardBox, Severity } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScopeAssetRowProps {
  value: ScopeAsset
  onChange: (v: ScopeAsset) => void
  onRemove: () => void
  rewardBoxes: RewardBox[]
  onCreateBox?: () => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ASSET_TYPES: { value: ScopeAsset['type']; label: string }[] = [
  { value: 'domain', label: 'Domain' },
  { value: 'ip',     label: 'IP'     },
  { value: 'api',    label: 'API'    },
  { value: 'app',    label: 'App'    },
]

const ENVIRONMENTS: { value: ScopeAsset['environment']; label: string }[] = [
  { value: 'prod',    label: 'Production' },
  { value: 'staging', label: 'Staging'    },
  { value: 'dev',     label: 'Development' },
]

const IMPACTS: { key: Severity; label: string; activeClass: string }[] = [
  { key: 'low',      label: 'Low',      activeClass: 'bg-tint-DEFAULT border-primary-DEFAULT text-primary-DEFAULT' },
  { key: 'medium',   label: 'Medium',   activeClass: 'bg-tint-DEFAULT border-primary-DEFAULT text-primary-DEFAULT' },
  { key: 'high',     label: 'High',     activeClass: 'bg-tint-DEFAULT border-primary-DEFAULT text-primary-DEFAULT' },
  { key: 'critical', label: 'Critical', activeClass: 'bg-tint-DEFAULT border-primary-DEFAULT text-primary-DEFAULT' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function ScopeAssetRow({ value, onChange, onRemove, rewardBoxes, onCreateBox }: ScopeAssetRowProps) {
  const inactiveClass = 'bg-tint-DEFAULT/60 border-secondary-400 text-secondary-400'

  return (
    <div className="bg-white border border-secondary-400/30 rounded-xl p-6 flex flex-col gap-5 relative">
      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove asset"
        className="absolute top-4 end-4 text-secondary-400 hover:text-error-DEFAULT transition-colors"
      >
        <X size={18} />
      </button>

      {/* Row 1: Asset name + Asset type */}
      <div className="grid grid-cols-2 gap-6 pe-8">
        <div className="flex flex-col gap-2">
          <label className="text-h5 font-medium text-bg-dark">Asset name</label>
          <input
            type="text"
            value={value.name}
            onChange={e => onChange({ ...value, name: e.target.value })}
            placeholder="Enter asset"
            className="border border-secondary-400 rounded-xl h-[60px] ps-8 pe-4 text-body-md placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-h5 font-medium text-bg-dark">Asset type</label>
          <select
            value={value.type}
            onChange={e => onChange({ ...value, type: e.target.value as ScopeAsset['type'] })}
            className="border border-secondary-400 rounded-xl h-[60px] ps-8 pe-8 text-body-md text-bg-dark focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 w-full cursor-pointer appearance-none bg-white"
          >
            <option value="" disabled>Select an asset type</option>
            {ASSET_TYPES.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Environment + Reward box */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-h5 font-medium text-bg-dark">Environment</label>
          <select
            value={value.environment}
            onChange={e => onChange({ ...value, environment: e.target.value as ScopeAsset['environment'] })}
            className="border border-secondary-400 rounded-xl h-[60px] ps-8 pe-8 text-body-md text-bg-dark focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 w-full cursor-pointer appearance-none bg-white"
          >
            <option value="" disabled>Select environment</option>
            {ENVIRONMENTS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-h5 font-medium text-bg-dark">Reward box</label>
          <select
            value={value.rewardBoxId}
            onChange={e => {
              if (e.target.value === '__new__') {
                onCreateBox?.()
              } else {
                onChange({ ...value, rewardBoxId: e.target.value })
              }
            }}
            className="border border-secondary-400 rounded-xl h-[60px] ps-8 pe-8 text-body-md text-bg-dark focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 w-full cursor-pointer appearance-none bg-white"
          >
            <option value="">Select reward box</option>
            {rewardBoxes.map(b => (
              <option key={b.id} value={b.id}>{b.name || `Box ${b.id}`}</option>
            ))}
            <option value="__new__">+ Create new box</option>
          </select>
        </div>
      </div>

      {/* Row 3: Max impact level */}
      <div className="flex flex-col gap-3">
        <label className="text-h5 font-medium text-bg-dark">Max impact level</label>
        <div className="flex items-center gap-4 flex-wrap">
          {IMPACTS.map(({ key, label, activeClass }) => {
            const isActive = value.maxImpact === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange({ ...value, maxImpact: key })}
                className={cn(
                  'border rounded-xl h-11 px-6 text-body-lg font-medium transition-colors',
                  isActive ? activeClass : inactiveClass
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
