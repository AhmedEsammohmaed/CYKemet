import type {
  AnalyticsStats,
  SkillRadarPoint,
  SeverityDistribution,
  SkillGapItem,
  RecommendedAction,
} from '@/types'

export const mockAnalyticsStats: AnalyticsStats = {
  totalBugs:      3488,
  totalEarnings:  '457$',
  avgBounty:      '12,500',
  acceptanceRate: '20%',
}

export const mockSkillRadar: SkillRadarPoint[] = [
  { skill: 'Web',             value: 65 },
  { skill: 'Mobile',          value: 40 },
  { skill: 'Cloud',           value: 55 },
  { skill: 'API',             value: 45 },
  { skill: 'Network',         value: 81 },
  { skill: 'Scripting',       value: 70 },
  { skill: 'Threat modeling', value: 60 },
]

export const mockSeverityDistribution: SeverityDistribution = {
  low:      30,
  medium:   25,
  critical: 20,
  high:     25,
}

export const mockSkillGaps: SkillGapItem[] = [
  { skill: 'Web security',     current: 65, target: 90 },
  { skill: 'API Security',     current: 45, target: 85 },
  { skill: 'Cryptography',     current: 58, target: 85 },
  { skill: 'Network Security', current: 81, target: 90 },
]

export const mockRecommendedActions: RecommendedAction[] = [
  { id: 'rec-1', title: 'Advanced API security testing', type: 'course',      domain: 'API security' },
  { id: 'rec-2', title: 'OWASP Top 10 Hands-On Lab',     type: 'lab',         domain: 'Web Security' },
  { id: 'rec-3', title: 'OWASP Top 10 Hands-On Lab',     type: 'certificate', domain: 'Web Security' },
  { id: 'rec-4', title: 'OWASP Top 10 Hands-On Lab',     type: 'internship',  domain: 'Web Security' },
  { id: 'rec-5', title: 'OWASP Top 10 Hands-On Lab',     type: 'internship',  domain: 'Web Security' },
]
