import type { CvssVector, Severity } from '@/types'

// ─── Numeric weights ──────────────────────────────────────────────────────────

const AV_WEIGHTS = { network: 0.85, adjacent: 0.62, local: 0.55, physical: 0.2 } as const
const AC_WEIGHTS = { low: 0.77, high: 0.44 } as const
const PR_UNCHANGED = { none: 0.85, low: 0.62, high: 0.27 } as const
const PR_CHANGED   = { none: 0.85, low: 0.68, high: 0.50 } as const
const UI_WEIGHTS   = { none: 0.85, required: 0.62 } as const
const CIA_WEIGHTS  = { none: 0, low: 0.22, high: 0.56 } as const

function roundUp(x: number): number {
  return Math.ceil(x * 10) / 10
}

export interface CvssResult {
  score: number
  severity: Severity | 'none'
}

export function calculateCvssScore(v: CvssVector): CvssResult {
  const av = AV_WEIGHTS[v.AV]
  const ac = AC_WEIGHTS[v.AC]
  const pr = v.S === 'unchanged' ? PR_UNCHANGED[v.PR] : PR_CHANGED[v.PR]
  const ui = UI_WEIGHTS[v.UI]
  const c  = CIA_WEIGHTS[v.C]
  const i  = CIA_WEIGHTS[v.I]
  const a  = CIA_WEIGHTS[v.A]

  const iss = 1 - (1 - c) * (1 - i) * (1 - a)

  const impact =
    v.S === 'unchanged'
      ? 6.42 * iss
      : 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15)

  const exploitability = 8.22 * av * ac * pr * ui

  let score: number
  if (impact <= 0) {
    score = 0
  } else if (v.S === 'unchanged') {
    score = roundUp(Math.min(impact + exploitability, 10))
  } else {
    score = roundUp(Math.min(1.08 * (impact + exploitability), 10))
  }

  // Clamp to valid range
  score = Math.max(0, Math.min(10, score))

  const severity = scoreToSeverity(score)
  return { score, severity }
}

function scoreToSeverity(score: number): Severity | 'none' {
  if (score === 0)           return 'none'
  if (score <= 3.9)          return 'low'
  if (score <= 6.9)          return 'medium'
  if (score <= 8.9)          return 'high'
  return 'critical'
}
