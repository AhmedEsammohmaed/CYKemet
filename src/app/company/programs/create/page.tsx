'use client'

import { useEffect, useState, useId } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { mockCompanyPrograms } from '@/lib/mock/company'
import { cn } from '@/lib/utils/cn'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ToggleSwitch } from '@/components/ui/ToggleSwitch'
import { Checkbox } from '@/components/ui/Checkbox'
import { RewardBoxBuilder, defaultRewardBox } from '@/components/ui/RewardBoxBuilder'
import { ScopeAssetRow } from '@/components/ui/ScopeAssetRow'
import type {
  ProgramDraft,
  ProgramPolicy,
  ProgramBudget,
  ScopeAsset,
  RewardBox,
  CompanyProgramType,
} from '@/types'

// ─── Step definitions ─────────────────────────────────────────────────────────

const STEPS = [
  { id: 'details',  label: 'Program details'     },
  { id: 'scope',    label: 'Scope setup'          },
  { id: 'rewards',  label: 'Reward system setup'  },
  { id: 'policy',   label: 'Policy setup'         },
  { id: 'budget',   label: 'Budget setup'         },
  { id: 'publish',  label: 'Review & Publish'     },
] as const

type StepId = typeof STEPS[number]['id']

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultPolicy: ProgramPolicy = {
  safeHarbor: false,
  submissionRules: '',
  disclosureGuidelines: '',
  nonEligible: '',
}

const defaultBudget: ProgramBudget = {
  total: 0,
  monthlyCap: 0,
  noMonthlyLimit: false,
  autoPause: false,
}

const defaultDraft: ProgramDraft = {
  name: '',
  description: '',
  type: 'public',
  inScope: [],
  outScope: [],
  rewardBoxes: [],
  policy: defaultPolicy,
  budget: defaultBudget,
  letUsTriage: false,
  agreedToTerms: false,
}

function newAsset(id: string): ScopeAsset {
  return { id, name: '', type: 'domain', maxImpact: 'low', environment: 'prod', rewardBoxId: '' }
}

// ─── Shared input styles ──────────────────────────────────────────────────────

const inputCls =
  'border border-secondary-400 rounded-xl h-[60px] ps-8 pe-4 w-full text-body-md placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 bg-white'

const textareaCls =
  'border border-secondary-400 rounded-xl min-h-[202px] p-8 w-full text-body-md placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 bg-white resize-y'

const selectCls =
  'border border-secondary-400 rounded-xl h-[60px] ps-8 pe-10 w-full text-body-md text-bg-dark focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 bg-white cursor-pointer appearance-none'

// ─── Toggle row ───────────────────────────────────────────────────────────────

interface ToggleRowProps {
  title: string
  subtitle: string
  checked: boolean
  onChange: (v: boolean) => void
}

function ToggleRow({ title, subtitle, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex flex-col gap-1">
        <p className="text-h4 font-medium text-bg-dark">{title}</p>
        <p className="text-body-md text-secondary-400">{subtitle}</p>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  )
}

// ─── Step indicator ───────────────────────────────────────────────────────────

interface StepIndicatorProps {
  currentStep: number
}

function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {STEPS.map((step, idx) => {
        const isActive    = idx === currentStep
        const isCompleted = idx < currentStep
        return (
          <span
            key={step.id}
            className={cn(
              'inline-flex items-center gap-1.5 px-[22px] h-[47px] rounded-2xl border text-body-lg font-medium whitespace-nowrap transition-colors',
              isActive
                ? 'bg-tint-DEFAULT border-primary-DEFAULT/66 text-primary-DEFAULT'
                : isCompleted
                  ? 'bg-tint-DEFAULT/50 border-primary-DEFAULT/30 text-primary-DEFAULT/70'
                  : 'bg-white border-secondary-400/30 text-secondary-400'
            )}
          >
            {isCompleted && <CheckCircle size={14} className="shrink-0" />}
            {step.label}
          </span>
        )
      })}
    </div>
  )
}

// ─── Reward box card ──────────────────────────────────────────────────────────

interface RewardBoxCardProps {
  box: RewardBox
  onSelect: () => void
  selected: boolean
}

function RewardBoxCard({ box, onSelect, selected }: RewardBoxCardProps) {
  const severityColors: Record<string, string> = {
    critical: 'text-severity-critical',
    high:     'text-severity-high',
    medium:   'text-severity-medium',
    low:      'text-severity-low',
  }

  return (
    <div className="relative bg-secondary-400/10 rounded-[10px] p-4 w-[300px] shrink-0 flex flex-col gap-4">
      {/* Box name pill */}
      <span className="absolute top-3 end-3 bg-tint-DEFAULT/66 border border-primary-DEFAULT/66 rounded-full px-2 py-0.5 text-label-xs font-medium text-primary-DEFAULT">
        {box.name || `Box ${box.id}`}
      </span>

      {/* Rows */}
      <div className="flex flex-col gap-3 pt-4">
        <p className="text-body-lg font-semibold text-bg-dark">Rewards</p>
        {box.rows.map(row => (
          <div key={row.severity} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className={cn('text-label-sm font-medium', severityColors[row.severity] ?? '')}>
                {row.severity.charAt(0).toUpperCase() + row.severity.slice(1)}
              </span>
              {row.rewardType === 'none' ? (
                <span className="text-label-sm text-secondary-400">—</span>
              ) : row.rewardType === 'coin' ? (
                <span className="text-label-sm font-medium text-bg-dark">
                  {row.min.toLocaleString()} – {row.max.toLocaleString()} coins
                </span>
              ) : (
                <span className="text-label-sm font-medium text-bg-dark">
                  ${row.min.toLocaleString()} – ${row.max.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Select button */}
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          'w-full h-[52px] rounded-xl font-medium text-body-lg transition-colors',
          selected
            ? 'bg-success-DEFAULT text-white'
            : 'bg-primary-DEFAULT text-white hover:bg-primary-DEFAULT/90'
        )}
      >
        {selected ? 'Selected' : 'Select box'}
      </button>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CreateProgramPage() {
  const { setTitle } = useNav()
  const router = useRouter()
  const uid = useId()

  useEffect(() => { setTitle('Create Program') }, [setTitle])

  const [step, setStep]   = useState(0)
  const [draft, setDraft] = useState<ProgramDraft>(defaultDraft)

  // Reward box builder overlay
  const [showBuilder, setShowBuilder]       = useState(false)
  const [builderBox, setBuilderBox]         = useState<RewardBox>(defaultRewardBox('new'))
  const [selectedBoxId, setSelectedBoxId]   = useState<string>('')

  // ─── Helpers ────────────────────────────────────────────────────────────────

  function patch<K extends keyof ProgramDraft>(key: K, value: ProgramDraft[K]) {
    setDraft(prev => ({ ...prev, [key]: value }))
  }

  function patchPolicy<K extends keyof ProgramPolicy>(key: K, value: ProgramPolicy[K]) {
    setDraft(prev => ({ ...prev, policy: { ...prev.policy, [key]: value } }))
  }

  function patchBudget<K extends keyof ProgramBudget>(key: K, value: ProgramBudget[K]) {
    setDraft(prev => ({ ...prev, budget: { ...prev.budget, [key]: value } }))
  }

  function addAsset() {
    const id = `${uid}-${Date.now()}`
    patch('inScope', [...draft.inScope, newAsset(id)])
  }

  function updateAsset(idx: number, val: ScopeAsset) {
    const updated = draft.inScope.map((a, i) => (i === idx ? val : a))
    patch('inScope', updated)
  }

  function removeAsset(idx: number) {
    patch('inScope', draft.inScope.filter((_, i) => i !== idx))
  }

  function addOutScopeAsset() {
    const id = `out-${uid}-${Date.now()}`
    patch('outScope', [...draft.outScope, newAsset(id)])
  }

  function updateOutScopeAsset(idx: number, val: ScopeAsset) {
    const updated = draft.outScope.map((a, i) => (i === idx ? val : a))
    patch('outScope', updated)
  }

  function removeOutScopeAsset(idx: number) {
    patch('outScope', draft.outScope.filter((_, i) => i !== idx))
  }

  function openBuilderForNew() {
    setBuilderBox(defaultRewardBox(`box-${uid}-${Date.now()}`))
    setShowBuilder(true)
  }

  function saveRewardBox() {
    patch('rewardBoxes', [...draft.rewardBoxes, builderBox])
    setShowBuilder(false)
  }

  function handlePublish() {
    const newId = `p${Date.now()}`
    mockCompanyPrograms.push({
      id:           newId,
      name:         draft.name || 'Untitled Program',
      type:         draft.type,
      status:       draft.letUsTriage ? 'paused' : 'active',
      budget:       draft.budget.total,
      monthlyBudget: draft.budget.monthlyCap,
      newReports:   0,
      totalReports: 0,
      createdAt:    new Date().toISOString().slice(0, 10),
    })
    router.push('/company/programs')
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Step indicator */}
      <StepIndicator currentStep={step} />

      {/* ── Step content ── */}

      {/* STEP 1 — Program details */}
      {step === 0 && (
        <div className="bg-white rounded-xl p-8 flex flex-col gap-8">
          <SectionHeader
            title="Program details"
            subtitle="Please provide detailed information about the program"
          />

          <div className="grid grid-cols-2 gap-6">
            {/* Program name */}
            <div className="flex flex-col gap-2">
              <label className="text-h5 font-medium text-bg-dark">Program name</label>
              <input
                type="text"
                value={draft.name}
                onChange={e => patch('name', e.target.value)}
                placeholder="Enter a suitable name for your program"
                className={inputCls}
              />
            </div>

            {/* Program type */}
            <div className="flex flex-col gap-2">
              <label className="text-h5 font-medium text-bg-dark">Program type</label>
              <select
                value={draft.type}
                onChange={e => patch('type', e.target.value as CompanyProgramType)}
                className={selectCls}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          {/* Program description */}
          <div className="flex flex-col gap-2">
            <label className="text-h5 font-medium text-bg-dark">Program description</label>
            <textarea
              value={draft.description}
              onChange={e => patch('description', e.target.value)}
              placeholder="Please provide suitable description for the created program"
              className={textareaCls}
            />
          </div>
        </div>
      )}

      {/* STEP 2 — Scope setup */}
      {step === 1 && (
        <div className="bg-white rounded-xl p-8 flex flex-col gap-8">
          <SectionHeader
            title="Scope setup"
            subtitle="Configure the targets and boundaries of this program"
          />

          {/* ── In-scope ── */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-h5 font-medium text-bg-dark">In scope</p>
              <p className="text-body-md text-secondary-400">
                Only reports related to these assets will be eligible for rewards
              </p>
            </div>

            {draft.inScope.length === 0 && (
              <p className="text-body-md text-secondary-400 py-2">
                No in-scope assets yet. Add your first asset below.
              </p>
            )}

            {draft.inScope.map((asset, idx) => (
              <ScopeAssetRow
                key={asset.id}
                value={asset}
                onChange={val => updateAsset(idx, val)}
                onRemove={() => removeAsset(idx)}
                rewardBoxes={draft.rewardBoxes}
                onCreateBox={openBuilderForNew}
              />
            ))}

            <button
              type="button"
              onClick={addAsset}
              className="inline-flex items-center gap-2 text-primary-DEFAULT text-body-lg font-medium hover:underline self-start"
            >
              <Plus size={18} />
              Add asset
            </button>
          </div>

          {/* ── Divider ── */}
          <hr className="border-t border-bg-light" />

          {/* ── Out-of-scope ── */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-h5 font-medium text-bg-dark">Out of scope</p>
              <p className="text-body-md text-secondary-400">
                Testing outside these assets may result in report rejection
              </p>
              {/* TODO: SRS distinguishes "paid scope" vs "unpaid scope" — add a paid/unpaid toggle per row when that design is available */}
            </div>

            {draft.outScope.length === 0 && (
              <p className="text-body-md text-secondary-400 py-2">
                No out-of-scope assets yet. Add any restricted targets below.
              </p>
            )}

            {draft.outScope.map((asset, idx) => (
              <ScopeAssetRow
                key={asset.id}
                value={asset}
                onChange={val => updateOutScopeAsset(idx, val)}
                onRemove={() => removeOutScopeAsset(idx)}
                rewardBoxes={draft.rewardBoxes}
                onCreateBox={openBuilderForNew}
              />
            ))}

            <button
              type="button"
              onClick={addOutScopeAsset}
              className="inline-flex items-center gap-2 text-primary-DEFAULT text-body-lg font-medium hover:underline self-start"
            >
              <Plus size={18} />
              Add out-of-scope asset
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Reward system setup */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          {!showBuilder ? (
            <>
              <div className="bg-white rounded-xl p-8 flex flex-col gap-8">
                <SectionHeader
                  title="Reward system setup"
                  subtitle="Select a pre-configured reward structure for your bug bounty program, or create a custom one"
                />

                <div className="flex gap-6 flex-wrap">
                  {/* Existing boxes */}
                  {draft.rewardBoxes.map(box => (
                    <RewardBoxCard
                      key={box.id}
                      box={box}
                      selected={selectedBoxId === box.id}
                      onSelect={() => setSelectedBoxId(box.id)}
                    />
                  ))}

                  {/* Create new box card */}
                  <button
                    type="button"
                    onClick={openBuilderForNew}
                    className="border-[1.7px] border-dashed border-primary-DEFAULT rounded-xl w-[300px] shrink-0 flex flex-col items-center justify-center gap-5 py-12 px-8 hover:bg-tint-DEFAULT/20 transition-colors"
                  >
                    <div className="bg-tint-DEFAULT rounded-full size-[100px] flex items-center justify-center">
                      <Plus size={48} className="text-primary-DEFAULT" strokeWidth={3} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-[22px] font-semibold text-primary-DEFAULT">Create new reward box</p>
                      <p className="text-body-md text-secondary-400">Define custom reward structure</p>
                    </div>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <RewardBoxBuilder
              value={builderBox}
              onChange={setBuilderBox}
              onCancel={() => setShowBuilder(false)}
              onSave={saveRewardBox}
            />
          )}
        </div>
      )}

      {/* STEP 4 — Policy setup */}
      {step === 3 && (
        <div className="bg-white rounded-xl p-8 flex flex-col gap-8">
          <SectionHeader
            title="Policy setup"
            subtitle="Configure the rules and participation guidelines for this program"
          />

          <div className="flex flex-col gap-2">
            <label className="text-h5 font-medium text-bg-dark">Program rules</label>
            <textarea
              value={draft.policy.submissionRules}
              onChange={e => patchPolicy('submissionRules', e.target.value)}
              placeholder="Define the rules researchers must follow while testing your assets"
              className={textareaCls}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-h5 font-medium text-bg-dark">Disclosure guidelines</label>
            <textarea
              value={draft.policy.disclosureGuidelines}
              onChange={e => patchPolicy('disclosureGuidelines', e.target.value)}
              placeholder="Explain how vulnerabilities should be reported and how disclosure will be handled"
              className={textareaCls}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-h5 font-medium text-bg-dark">Non-Eligible</label>
            <textarea
              value={draft.policy.nonEligible}
              onChange={e => patchPolicy('nonEligible', e.target.value)}
              placeholder="List vulnerabilities or issues that are not eligible for rewards"
              className={textareaCls}
            />
          </div>

          <ToggleRow
            title="Enable safe harbor"
            subtitle="Ensure researchers are protected from legal action when acting within the defined scope and guidelines"
            checked={draft.policy.safeHarbor}
            onChange={v => patchPolicy('safeHarbor', v)}
          />
        </div>
      )}

      {/* STEP 5 — Budget setup */}
      {step === 4 && (
        <div className="bg-white rounded-xl p-8 flex flex-col gap-8">
          <SectionHeader
            title="Budget setup"
            subtitle="Allocate and manage the budget for this security program"
          />

          {/* Total budget */}
          <div className="flex flex-col gap-2">
            <label className="text-h5 font-medium text-bg-dark">Total Program Budget</label>
            <input
              type="number"
              min={0}
              value={draft.budget.total || ''}
              onChange={e => patchBudget('total', Number(e.target.value))}
              placeholder="$ 0.00"
              className={inputCls}
            />
            <p className="text-body-md text-secondary-400">
              Set the maximum total budget allocated for this program
            </p>
          </div>

          {/* Monthly limit */}
          <div className="flex flex-col gap-3">
            <label className="text-h5 font-medium text-bg-dark">Monthly Spending Limit</label>
            <input
              type="number"
              min={0}
              value={draft.budget.monthlyCap || ''}
              onChange={e => patchBudget('monthlyCap', Number(e.target.value))}
              placeholder="$ 0.00"
              disabled={draft.budget.noMonthlyLimit}
              className={cn(inputCls, draft.budget.noMonthlyLimit && 'opacity-40 cursor-not-allowed')}
            />
            <Checkbox
              checked={draft.budget.noMonthlyLimit}
              onChange={v => patchBudget('noMonthlyLimit', v)}
              label="No monthly limit"
              className="text-body-lg font-medium text-bg-dark"
            />
            <p className="text-body-md text-secondary-400">
              Define the maximum payout allowed per month
            </p>
          </div>

          {/* Auto pause */}
          <ToggleRow
            title="Auto pause program"
            subtitle="Automatically pause the program when the budget limit is reached"
            checked={draft.budget.autoPause}
            onChange={v => patchBudget('autoPause', v)}
          />
        </div>
      )}

      {/* STEP 6 — Review & Publish */}
      {step === 5 && (
        <div className="bg-white rounded-xl p-8 flex flex-col gap-8">
          <SectionHeader
            title="Review & Publish"
            subtitle="Review your program details before publishing"
          />

          {/* Summary */}
          <div className="flex flex-col gap-3 p-6 bg-bg-light rounded-xl text-body-md">
            <div className="flex justify-between">
              <span className="text-secondary-400">Program name</span>
              <span className="font-medium text-bg-dark">{draft.name || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Type</span>
              <span className="font-medium text-bg-dark capitalize">{draft.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">In-scope assets</span>
              <span className="font-medium text-bg-dark">{draft.inScope.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Reward boxes</span>
              <span className="font-medium text-bg-dark">{draft.rewardBoxes.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Total budget</span>
              <span className="font-medium text-bg-dark">
                {draft.budget.total > 0 ? `EGP ${draft.budget.total.toLocaleString()}` : '—'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-400">Safe harbor</span>
              <span className="font-medium text-bg-dark">{draft.policy.safeHarbor ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {/* Let us triage */}
          <ToggleRow
            title="Let us do the triage for you"
            subtitle="Our admin team will review and triage incoming reports on your behalf"
            checked={draft.letUsTriage}
            onChange={v => patch('letUsTriage', v)}
          />

          {/* Legal agreement */}
          <Checkbox
            checked={draft.agreedToTerms}
            onChange={v => patch('agreedToTerms', v)}
            label="I agree to the Legal Agreement and Terms of Service"
            className="text-h4 font-medium text-bg-dark"
          />

          {/* Publish */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={!draft.agreedToTerms || !draft.name.trim()}
            className="w-full h-[60px] bg-primary-DEFAULT text-white text-h4 font-medium rounded-xl hover:bg-primary-DEFAULT/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Publish program
          </button>
        </div>
      )}

      {/* ── Navigation ── */}
      {!showBuilder && (
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-body-lg font-medium text-secondary-400 hover:text-bg-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            Back
          </button>

          {step < STEPS.length - 1 && (
            <button
              type="button"
              onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
              className="inline-flex items-center gap-2 bg-primary-DEFAULT text-white text-body-lg font-medium rounded-xl px-8 h-[52px] hover:bg-primary-DEFAULT/90 transition-colors"
            >
              Next
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
