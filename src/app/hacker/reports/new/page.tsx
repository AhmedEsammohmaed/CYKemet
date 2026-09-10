'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import {
  ChevronDown,
  ShieldEllipsis,
  Swords,
  Puzzle,
  Key,
  PersonStanding,
  Layers,
  Lock,
  Component,
  Activity,
  UploadCloud,
  X,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { Checkbox } from '@/components/ui/Checkbox'
import { calculateCvssScore } from '@/lib/utils/cvss'
import { mockProgramOverview } from '@/lib/mock/hackers'
import { cn } from '@/lib/utils/cn'
import type {
  Severity,
  CvssVector,
  CvssAttackVector,
  CvssAttackComplexity,
  CvssPrivilegesRequired,
  CvssUserInteraction,
  CvssScope,
  CvssCIAImpact,
} from '@/types'

// ─── Constants ────────────────────────────────────────────────────────────────

const SEVERITIES: Array<{ value: Severity; label: string }> = [
  { value: 'informational', label: 'Informational' },
  { value: 'low',           label: 'Low' },
  { value: 'medium',        label: 'Medium' },
  { value: 'high',          label: 'High' },
  { value: 'critical',      label: 'Critical' },
]

const CWE_OPTIONS = [
  { value: 'CWE-79',  label: 'CWE-79 — Cross-Site Scripting (XSS)' },
  { value: 'CWE-89',  label: 'CWE-89 — SQL Injection' },
  { value: 'CWE-22',  label: 'CWE-22 — Path Traversal' },
  { value: 'CWE-352', label: 'CWE-352 — Cross-Site Request Forgery (CSRF)' },
  { value: 'CWE-200', label: 'CWE-200 — Information Exposure' },
  { value: 'CWE-287', label: 'CWE-287 — Authentication Bypass' },
  { value: 'CWE-94',  label: 'CWE-94 — Code Injection' },
  { value: 'CWE-611', label: 'CWE-611 — XML External Entity (XXE)' },
  { value: 'CWE-284', label: 'CWE-284 — Improper Access Control' },
  { value: 'CWE-502', label: 'CWE-502 — Deserialization of Untrusted Data' },
]

const DEFAULT_CVSS: CvssVector = {
  AV: 'local', AC: 'high', PR: 'low', UI: 'none', S: 'unchanged',
  C: 'low', I: 'high', A: 'none',
}

const AUTOSAVE_KEY = 'report-autosave'

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function SectionCard({ title, subtitle, children, className }: {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('bg-white rounded-card p-[22px] flex flex-col gap-5', className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 font-semibold text-content-500">{title}</h2>
        {subtitle && <p className="text-body-lg text-grey-main">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function FormInput({ placeholder, value, onChange, className }: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  className?: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'w-full h-[60px] border border-grey-main rounded-card px-[32px]',
        'text-body-lg text-content-500 placeholder:text-grey-main',
        'outline-none focus:border-primary-500 transition-colors bg-white',
        className
      )}
    />
  )
}

function FormSelect({ placeholder, options, value, onChange }: {
  placeholder: string
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const activeLabel = options.find((o) => o.value === value)?.label ?? placeholder

  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          'w-full h-[60px] border border-grey-main rounded-card px-[32px]',
          'flex items-center justify-between gap-2 bg-white',
          'text-body-lg transition-colors hover:border-primary-500',
          value ? 'text-content-500' : 'text-grey-main'
        )}
      >
        <span className="truncate">{activeLabel}</span>
        <ChevronDown size={18} className={cn('text-grey-main shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full mt-1 start-0 w-full bg-white rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-30 py-1 overflow-hidden max-h-[240px] overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={cn(
                'w-full text-start px-4 py-2 text-body-md transition-colors',
                value === opt.value
                  ? 'bg-secondary-50 text-primary-500 font-medium'
                  : 'text-content-500 hover:bg-auth-left-bg'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── CVSS metric card ─────────────────────────────────────────────────────────

function CvssOption({ label, description, selected, onClick }: {
  label: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-[220px] h-[65px] rounded-card border-[0.7px] px-[15px] py-[9px]',
        'flex flex-col gap-0.5 text-start transition-colors',
        selected ? 'border-primary-500' : 'border-grey-main hover:border-primary-500/50'
      )}
    >
      <span className={cn('text-h4 font-semibold leading-tight', selected ? 'text-primary-500' : 'text-grey-main')}>
        {label}
      </span>
      <span className={cn('text-body-sm font-medium leading-tight', selected ? 'text-primary-500' : 'text-grey-main')}>
        {description}
      </span>
    </button>
  )
}

function CvssMetricGroup({ icon: Icon, label, children }: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-primary-500" />
        <span className="text-h5 font-medium text-content-500">{label}</span>
      </div>
      <div className="flex gap-3 flex-wrap">{children}</div>
    </div>
  )
}

// ─── File upload dropzone ─────────────────────────────────────────────────────

function FileDropzone({ files, onChange }: {
  files: File[]
  onChange: (files: File[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    onChange([...files, ...dropped])
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    onChange([...files, ...Array.from(e.target.files)])
    e.target.value = ''
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'border-[2px] border-dashed border-primary-500 rounded-[17px] h-[397px]',
          'flex flex-col items-center justify-center gap-5 transition-colors',
          dragging && 'bg-secondary-50/50'
        )}
      >
        <UploadCloud size={89} className="text-primary-500 opacity-60" />
        <p className="text-h1 text-content-500 font-normal">Drag your file(s) to start uploading</p>

        <div className="flex items-center gap-3 w-[300px]">
          <div className="flex-1 h-px bg-[#e5e5e5]" />
          <span className="text-body-md text-grey-main">OR</span>
          <div className="flex-1 h-px bg-[#e5e5e5]" />
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="border-[2px] border-[#156fcb] rounded-full px-[25px] py-[12px] text-[#156fcb] text-[25px] font-semibold bg-white hover:bg-secondary-50 transition-colors"
        >
          Browse files
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={handleFileInput}
        />
      </div>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, i) => (
            <li key={i} className="flex items-center justify-between bg-auth-left-bg rounded-btn px-4 py-2">
              <span className="text-body-md text-content-500 truncate">{file.name}</span>
              <button type="button" onClick={() => removeFile(i)} className="text-grey-main hover:text-error-500 transition-colors ms-3 shrink-0">
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Markdown editor ─────────────────────────────────────────────────────────

function MarkdownEditor({ value, onChange, error }: {
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  const [tab, setTab] = useState<'write' | 'preview'>('write')

  return (
    <div className="flex flex-col gap-1">
      {/* Tab bar */}
      <div className="flex gap-0">
        {(['write', 'preview'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'px-5 py-2 text-label-md font-medium border-b-2 transition-colors capitalize',
              tab === t
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-grey-main hover:text-content-500'
            )}
          >
            {t === 'write' ? 'Write' : 'Preview'}
          </button>
        ))}
      </div>

      {/* Content area */}
      {tab === 'write' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Please provide a suitable description for your vulnerability (Markdown supported)"
          className={cn(
            'w-full h-[202px] border border-grey-main rounded-card px-[32px] py-4 resize-none',
            'text-body-lg text-content-500 placeholder:text-grey-main font-mono',
            'outline-none focus:border-primary-500 transition-colors bg-white'
          )}
        />
      ) : (
        <div
          className={cn(
            'w-full min-h-[202px] border border-grey-main rounded-card px-[32px] py-4 bg-white',
            'markdownPreview overflow-auto'
          )}
        >
          {value.trim()
            ? <ReactMarkdown>{value}</ReactMarkdown>
            : <p className="text-grey-main text-body-lg">Nothing to preview yet…</p>
          }
        </div>
      )}

      {error && <p className="text-label-sm text-error-500 ps-2">{error}</p>}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SubmitReportPage() {
  const { setTitle }   = useNav()
  const searchParams   = useSearchParams()
  const programId      = searchParams.get('program') ?? ''

  // Form state
  const [reportTitle,         setReportTitle]         = useState('')
  const [assetId,             setAssetId]             = useState('')
  const [cweId,               setCweId]               = useState('')
  const [vulnerabilityUrl,    setVulnerabilityUrl]    = useState('')
  const [description,         setDescription]         = useState('')
  const [severity,            setSeverity]            = useState<Severity | null>(null)
  const [useCvss,             setUseCvss]             = useState(false)
  const [cvssVector,          setCvssVector]          = useState<CvssVector>(DEFAULT_CVSS)
  const [pocFiles,            setPocFiles]            = useState<File[]>([])
  const [collaboratorUsername,setCollaboratorUsername]= useState('')
  const [rewardSplitPct,      setRewardSplitPct]      = useState(50)
  const [errors,              setErrors]              = useState<Record<string, string>>({})
  const [restoreBanner,       setRestoreBanner]       = useState(false)

  useEffect(() => { setTitle('Submit a report') }, [setTitle])

  // CVSS live score
  const cvssResult = calculateCvssScore(cvssVector)
  useEffect(() => {
    if (useCvss && cvssResult.severity !== 'none') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSeverity(cvssResult.severity as Severity)
    }
  }, [useCvss, cvssResult.severity])

  // Autosave restore check on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setRestoreBanner(true)
    } catch {}
  }, [])

  function restoreAutosave() {
    try {
      const saved = localStorage.getItem(AUTOSAVE_KEY)
      if (!saved) return
      const data = JSON.parse(saved) as Record<string, unknown>
      if (typeof data.title === 'string')              setReportTitle(data.title)
      if (typeof data.assetId === 'string')            setAssetId(data.assetId)
      if (typeof data.cweId === 'string')              setCweId(data.cweId)
      if (typeof data.vulnerabilityUrl === 'string')   setVulnerabilityUrl(data.vulnerabilityUrl)
      if (typeof data.description === 'string')        setDescription(data.description)
      if (typeof data.severity === 'string')           setSeverity(data.severity as Severity)
      if (typeof data.collaboratorUsername === 'string') setCollaboratorUsername(data.collaboratorUsername)
      if (typeof data.rewardSplitPct === 'number')     setRewardSplitPct(data.rewardSplitPct)
    } catch {}
    setRestoreBanner(false)
  }

  const doAutosave = useCallback(() => {
    try {
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({
        title: reportTitle, assetId, cweId, vulnerabilityUrl,
        description, severity, collaboratorUsername, rewardSplitPct,
      }))
    } catch {}
  }, [reportTitle, assetId, cweId, vulnerabilityUrl, description, severity, collaboratorUsername, rewardSplitPct])

  // Autosave every 30s
  useEffect(() => {
    const id = setInterval(doAutosave, 30_000)
    return () => clearInterval(id)
  }, [doAutosave])

  function setCvss<K extends keyof CvssVector>(key: K, val: CvssVector[K]) {
    setCvssVector((prev) => ({ ...prev, [key]: val }))
  }

  function validate() {
    const next: Record<string, string> = {}
    if (!reportTitle.trim())  next.title       = 'Title is required'
    if (!assetId)             next.assetId     = 'Please select an asset'
    if (!description.trim())  next.description = 'Description is required'
    if (!severity)            next.severity    = 'Please select a severity level'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSaveDraft() {
    doAutosave()
    alert('Draft saved!')
  }

  function handleSubmit() {
    if (!validate()) return
    console.log('Submitting report:', {
      programId, title: reportTitle, assetId, cweId, vulnerabilityUrl,
      description, severity, useCvss, cvssVector, collaboratorUsername, rewardSplitPct,
    })
    alert('Report submitted (mock)')
  }

  // Asset options from mock program
  const assetOptions = mockProgramOverview.scopeTargets
    ?.filter((t) => t.inScope)
    .map((t) => ({ value: t.target, label: `${t.target} (${t.type})` })) ?? []

  return (
    <div className="flex flex-col gap-6">

      {/* ── Autosave restore banner ───────────────────────────────────────── */}
      {restoreBanner && (
        <div className="bg-secondary-50 border border-primary-500/40 rounded-card px-5 py-3 flex items-center justify-between">
          <span className="text-label-md text-primary-500">You have an unsaved draft. Would you like to restore it?</span>
          <div className="flex gap-3">
            <button type="button" onClick={restoreAutosave} className="text-body-md font-semibold text-primary-500 hover:underline">Restore</button>
            <button type="button" onClick={() => { localStorage.removeItem(AUTOSAVE_KEY); setRestoreBanner(false) }} className="text-body-md text-grey-main hover:underline">Discard</button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — Vulnerability details                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <SectionCard
        title="Vulnerability details"
        subtitle="please provide detailed information about the vulnerability"
      >
        {/* Title */}
        <div className="flex flex-col gap-1">
          <FormInput
            placeholder="Enter a suitable title for your vulnerability"
            value={reportTitle}
            onChange={setReportTitle}
          />
          {errors.title && <p className="text-label-sm text-error-500 ps-2">{errors.title}</p>}
        </div>

        {/* Asset + CWE row */}
        <div className="flex gap-[59px]">
          <div className="flex flex-col gap-1 flex-1">
            <FormSelect
              placeholder="Select an asset"
              options={assetOptions}
              value={assetId}
              onChange={setAssetId}
            />
            {errors.assetId && <p className="text-label-sm text-error-500 ps-2">{errors.assetId}</p>}
          </div>
          <div className="flex-1">
            <FormSelect
              placeholder="Select CWE"
              options={CWE_OPTIONS}
              value={cweId}
              onChange={setCweId}
            />
          </div>
        </div>

        {/* URL */}
        <FormInput
          placeholder="Enter your vulnerability URL"
          value={vulnerabilityUrl}
          onChange={setVulnerabilityUrl}
        />

        {/* Description */}
        <MarkdownEditor
          value={description}
          onChange={setDescription}
          error={errors.description}
        />

        {/* Severity pills */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 flex-wrap">
            {SEVERITIES.map((s) => {
              const active = severity === s.value
              return (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => { if (!useCvss) setSeverity(s.value) }}
                  disabled={useCvss}
                  className={cn(
                    'w-[159px] h-[44px] rounded-card border text-h4 font-medium transition-colors',
                    active
                      ? 'bg-[#f2f8fd] border-primary-500 text-primary-500'
                      : 'bg-[rgba(232,246,255,0.6)] border-grey-main text-grey-main',
                    useCvss && 'cursor-not-allowed'
                  )}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
          {errors.severity && <p className="text-label-sm text-error-500">{errors.severity}</p>}
        </div>

        {/* CVSS checkbox */}
        <Checkbox
          checked={useCvss}
          onChange={setUseCvss}
          label="Calculate severity using CVSS"
          className={useCvss ? 'text-primary-500' : 'text-grey-main'}
        />
      </SectionCard>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — CVSS Calculator (conditional)                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {useCvss && (
        <SectionCard title="CVSS calculator" subtitle="Calculate the severity score">

          {/* Score display */}
          <div className="flex justify-center">
            <div
              className={cn(
                'w-[443px] h-[204px] rounded-[13px] border border-dashed border-primary-500 bg-[#f2f8fd]',
                'flex flex-col items-center justify-center gap-2'
              )}
            >
              <div className="flex items-center gap-1">
                <ShieldEllipsis size={16} className="text-primary-500" />
                <span className="text-body-lg font-medium text-primary-500">Base score</span>
              </div>
              <span className="text-[80px] font-extrabold text-primary-500 leading-none">
                {cvssResult.score.toFixed(1)}
              </span>
              <span className="text-body-lg font-medium text-primary-500 capitalize">
                {cvssResult.severity === 'none' ? 'None' : cvssResult.severity}
              </span>
            </div>
          </div>

          {/* Exploitability Metrics */}
          <h3 className="text-h3 font-semibold text-primary-500 mt-2">Exploitability Metrics</h3>

          <CvssMetricGroup icon={Swords} label="Attack Vector (AV)">
            {([ ['network','Network','Exploitable from the internet'], ['adjacent','Adjacent','Exploitable from the same network segment'], ['local','Local','Requires local system access'], ['physical','Physical','Requires physical access to device'] ] as const).map(([val, label, desc]) => (
              <CvssOption key={val} label={label} description={desc} selected={cvssVector.AV === val} onClick={() => setCvss('AV', val as CvssAttackVector)} />
            ))}
          </CvssMetricGroup>

          <CvssMetricGroup icon={Puzzle} label="Attack Complexity (AC)">
            {([ ['low','Low','No specialized conditions needed'], ['high','High','Requires special condition'] ] as const).map(([val, label, desc]) => (
              <CvssOption key={val} label={label} description={desc} selected={cvssVector.AC === val} onClick={() => setCvss('AC', val as CvssAttackComplexity)} />
            ))}
          </CvssMetricGroup>

          <CvssMetricGroup icon={Key} label="Privileges Required (PR)">
            {([ ['none','None','No authentication required'], ['low','Low','Basic user privileges needed'], ['high','High','Admin privileges needed'] ] as const).map(([val, label, desc]) => (
              <CvssOption key={val} label={label} description={desc} selected={cvssVector.PR === val} onClick={() => setCvss('PR', val as CvssPrivilegesRequired)} />
            ))}
          </CvssMetricGroup>

          <CvssMetricGroup icon={PersonStanding} label="User Interaction (UI)">
            {([ ['none','None','No user action required'], ['required','Required','User must perform action'] ] as const).map(([val, label, desc]) => (
              <CvssOption key={val} label={label} description={desc} selected={cvssVector.UI === val} onClick={() => setCvss('UI', val as CvssUserInteraction)} />
            ))}
          </CvssMetricGroup>

          <CvssMetricGroup icon={Layers} label="Scope (S)">
            {([ ['changed','Changed','Impact extends beyond vulnerable components'], ['unchanged','Unchanged','Impact limited to vulnerable component'] ] as const).map(([val, label, desc]) => (
              <CvssOption key={val} label={label} description={desc} selected={cvssVector.S === val} onClick={() => setCvss('S', val as CvssScope)} />
            ))}
          </CvssMetricGroup>

          {/* Impact Metrics */}
          <h3 className="text-h3 font-semibold text-primary-500 mt-2">Impact Metrics</h3>

          <CvssMetricGroup icon={Lock} label="Confidentiality Impact (C)">
            {([ ['none','None','No impact'], ['low','Low','Limited impact'], ['high','High','Total compromise'] ] as const).map(([val, label, desc]) => (
              <CvssOption key={val} label={label} description={desc} selected={cvssVector.C === val} onClick={() => setCvss('C', val as CvssCIAImpact)} />
            ))}
          </CvssMetricGroup>

          <CvssMetricGroup icon={Component} label="Integrity Impact (I)">
            {([ ['none','None','No impact'], ['low','Low','Limited impact'], ['high','High','Total compromise'] ] as const).map(([val, label, desc]) => (
              <CvssOption key={val} label={label} description={desc} selected={cvssVector.I === val} onClick={() => setCvss('I', val as CvssCIAImpact)} />
            ))}
          </CvssMetricGroup>

          <CvssMetricGroup icon={Activity} label="Availability Impact (A)">
            {([ ['none','None','No impact'], ['low','Low','Limited impact'], ['high','High','Total compromise'] ] as const).map(([val, label, desc]) => (
              <CvssOption key={val} label={label} description={desc} selected={cvssVector.A === val} onClick={() => setCvss('A', val as CvssCIAImpact)} />
            ))}
          </CvssMetricGroup>
        </SectionCard>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — Proof of concept                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <SectionCard title="Proof of concept">
        <FileDropzone files={pocFiles} onChange={setPocFiles} />
      </SectionCard>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — Collaborations                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <SectionCard
        title="Collaborations"
        subtitle="You can optionally invite collaborator to share the reward"
      >
        {/* Collaborator name */}
        <div className="flex flex-col gap-2">
          <label className="text-h5 font-medium text-content-500">Collaborator name</label>
          <FormInput
            placeholder="Enter collaborator username"
            value={collaboratorUsername}
            onChange={setCollaboratorUsername}
          />
        </div>

        {/* Reward split slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-h5 font-medium text-content-500">Reward split (%)</label>
            <span className="text-body-sm font-medium text-primary-500">{rewardSplitPct}%</span>
          </div>
          <div className="relative h-[6px] rounded-full" style={{ background: 'rgba(120,120,120,0.2)' }}>
            <div
              className="absolute inset-y-0 start-0 rounded-full bg-primary-500"
              style={{ width: `${rewardSplitPct}%` }}
            />
            <input
              type="range"
              min={0}
              max={100}
              value={rewardSplitPct}
              onChange={(e) => setRewardSplitPct(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
            />
          </div>
        </div>

        {/* Remove collaborator */}
        <div>
          <button
            type="button"
            onClick={() => { setCollaboratorUsername(''); setRewardSplitPct(50) }}
            className="h-[60px] w-[273px] rounded-card bg-grey-main text-white text-h3 font-medium hover:opacity-90 transition-opacity"
          >
            Remove collaborator
          </button>
        </div>
      </SectionCard>

      {/* ── Bottom actions ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 pb-4">
        <button
          type="button"
          onClick={handleSaveDraft}
          className="h-[60px] w-[227px] rounded-card bg-grey-main text-white text-h3 font-medium hover:opacity-90 transition-opacity"
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="h-[60px] w-[227px] rounded-card bg-primary-500 text-white text-h3 font-medium hover:opacity-90 transition-opacity"
        >
          Submit report
        </button>
      </div>

    </div>
  )
}
