import type {
  HackerDashboardStats,
  ReputationData,
  WalletBalance,
  ActionItem,
  HackerProfile,
  Program,
  ScopeTarget,
  RewardTier,
  ProgramMessage,
  LeaderboardEntry,
  LeaderboardStats,
  ProfileFormData,
  NotificationSettings,
  KYCVerification,
} from '@/types'

export const mockHackerProfile: HackerProfile = {
  id: 'HKR-001',
  name: 'Ahmed Hassan',
  email: 'ahmed@example.com',
  role: 'hacker',
  username: 'ahmed_h',
  avatarUrl: undefined,
  kycStatus: 'verified',
  createdAt: '2024-01-15T00:00:00Z',
  points: 5678,
  coins: 2656,
  rank: 'Level Four',
  rankLevel: 4,
  openToHiring: true,
  vettingStatus: 'vetted',
}

export const mockHackerStats: HackerDashboardStats = {
  activeReports: 12300,
  newReports: 12500,
  acceptedReports: 12500,
  paidReports: 12500,
}

export const mockReputation: ReputationData = {
  totalPoints: 5678,
  totalCoins: 2656,
  rank: 'Level Four',
  rankLevel: 4,
  nextRank: 'Level Five',
  progressPercent: 60,
  badgeCount: 6,
}

export const mockWallet: WalletBalance = {
  available: 24500,
  pending: 24500,
  totalTransactions: 345000,
  totalEarnings: 550000,
  lastRewardDaysAgo: 3,
}

export const mockActionItems: ActionItem[] = [
  {
    id: 'ACT-001',
    title: 'Report needs update',
    description: 'Your security assessment report for placeholder requires additional information',
    type: 'report_update',
    href: '/hacker/reports/RPT-004',
  },
  {
    id: 'ACT-002',
    title: 'Fix verification request',
    description: 'Security verification failed. Please review and resubmit your credentials',
    type: 'verification',
    href: '/hacker/reports/RPT-007',
  },
]

// ── PROGRAMS ──────────────────────────────────────────────────────────────────

export const mockPrograms: Program[] = [
  {
    id: 'PRG-001',
    name: 'CyberNest',
    description:
      'Help secure our mobile platform by identifying vulnerabilities across authentication, data storage, and API communication layers.',
    type: 'public',
    scopeTypes: ['mobile'],
    companyName: 'CyberNest',
    endsAt: 'March 12, 2028',
    bountyMin: 500,
    bountyMax: 700,
    totalReports: 34,
    isActive: true,
    createdAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'PRG-002',
    name: 'CyberNest',
    description:
      'Find and report security issues in our web application including XSS, CSRF, SQLi, and business logic vulnerabilities.',
    type: 'private',
    scopeTypes: ['web'],
    companyName: 'CyberNest',
    endsAt: 'March 12, 2028',
    bountyMin: 500,
    bountyMax: 700,
    totalReports: 34,
    isActive: false,
    createdAt: '2024-07-15T00:00:00Z',
  },
  {
    id: 'PRG-003',
    name: 'CyberNest',
    description:
      'Investigate our cloud infrastructure for misconfigurations, exposed secrets, and privilege escalation paths.',
    type: 'public',
    scopeTypes: ['cloud'],
    companyName: 'CyberNest',
    endsAt: 'March 12, 2028',
    bountyMin: 500,
    bountyMax: 700,
    totalReports: 34,
    isActive: false,
    createdAt: '2024-08-01T00:00:00Z',
  },
  {
    id: 'PRG-004',
    name: 'CyberNest',
    description:
      'Scope covers all public-facing web endpoints, REST APIs, and the admin panel. OWASP Top 10 and beyond.',
    type: 'vdp',
    scopeTypes: ['web'],
    companyName: 'CyberNest',
    endsAt: 'March 12, 2028',
    bountyMin: 500,
    bountyMax: 700,
    totalReports: 34,
    isActive: true,
    createdAt: '2024-09-10T00:00:00Z',
  },
]

const RULE_TEXT =
  'Theoretical vulnerabilities without any proof or demonstration'
const DISCLOSURE_TEXT =
  'Do not discuss this program or any vulnerabilities (even resolved ones) outside of the program without express consent from the organization.'

const inScopeTargets: ScopeTarget[] = [
  { target: 'https://alphasec.trade', type: 'Web',            severity: 'critical', reward: 'Box 1', inScope: true },
  { target: 'https://alphasec.trade', type: 'Domain',         severity: 'high',     reward: 'Box 2', inScope: true },
  { target: 'https://alphasec.trade', type: 'Smart contract', severity: 'medium',   reward: 'Box 1', inScope: true },
  { target: 'https://alphasec.trade', type: 'Other',          severity: 'low',      reward: 'Box 2', inScope: true },
]

const outOfScopeTargets: ScopeTarget[] = [
  { target: 'https://alphasec.trade', type: 'Web',            severity: 'none', reward: 'None', inScope: false },
  { target: 'https://alphasec.trade', type: 'Domain',         severity: 'none', reward: 'None', inScope: false },
  { target: 'https://alphasec.trade', type: 'Smart contract', severity: 'none', reward: 'None', inScope: false },
  { target: 'https://alphasec.trade', type: 'Other',          severity: 'none', reward: 'None', inScope: false },
]

const rewardTiers: RewardTier[] = [
  { severity: 'low',      cashRange: '200$ - 700$',       avgBounty: '$450',    submissionPct: '35%', box: 'Box 1' },
  { severity: 'high',     cashRange: '5000$ - 10000$',    avgBounty: '$7500',   submissionPct: '20%', box: 'Box 1' },
  { severity: 'critical', cashRange: '30000$ - 50000$',   avgBounty: '$40000',  submissionPct: '5%',  box: 'Box 1' },
  { severity: 'medium',   coinsRange: '1000 - 2000',      avgBounty: '1500',    submissionPct: '40%', box: 'Box 2' },
]

const programMessages: ProgramMessage[] = [
  {
    id: 'MSG-001',
    sender: 'hacker',
    senderName: 'You',
    role: 'Hacker',
    content: 'Can you confirm whether staging environment is in scope?',
    timestamp: '2 hours ago',
  },
  {
    id: 'MSG-002',
    sender: 'company',
    senderName: 'CyberNest',
    role: 'Company',
    content: 'Yes, feel free to test! let us know if you need further assistance',
    timestamp: '2 hours ago',
  },
]

export const mockProgramOverview: Program = {
  id: 'cybernest-1',
  name: 'CyberNest',
  description:
    'A leading technology company focused on building secure, scalable, and innovative digital solutions. We partner with organizations across multiple sectors to deliver cutting-edge software, cloud infrastructure, and cybersecurity services.',
  type: 'public',
  scopeTypes: ['cloud'],
  companyName: 'CyberNest',
  endsAt: 'March 12, 2028',
  bountyMin: 1245,
  bountyMax: 9860,
  totalReports: 34,
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  stats: {
    totalPaid: 12500,
    reportsSolved: 12500,
    avgBountyRange: '1245$ - 3457$',
    topBountyRange: '1478$ - 9860$',
  },
  scopeTargets: [...inScopeTargets, ...outOfScopeTargets],
  rewards: rewardTiers,
  rules: Array(5).fill(RULE_TEXT),
  disclosureGuidelines: Array(5).fill(DISCLOSURE_TEXT),
  nonEligible: Array(5).fill(DISCLOSURE_TEXT),
  messages: programMessages,
}

// ── LEADERBOARD ───────────────────────────────────────────────────────────────

export const mockLeaderboardStats: LeaderboardStats = {
  rank: 12,
  level: 'advanced',
  totalReports: 50,
  profit: '1345$',
}

const baseEntries: LeaderboardEntry[] = [
  { rank: 1, username: 'Sara tawfeek', avatarUrl: null, level: 'advanced',     points: 12324 },
  { rank: 2, username: 'Sara tawfeek', avatarUrl: null, level: 'beginner',     points: 12324 },
  { rank: 3, username: 'Sara tawfeek', avatarUrl: null, level: 'advanced',     points: 12324 },
  { rank: 4, username: 'Sara tawfeek', avatarUrl: null, level: 'intermediate', points: 12324 },
  { rank: 5, username: 'Sara tawfeek', avatarUrl: null, level: 'beginner',     points: 12324 },
  { rank: 6, username: 'Sara tawfeek', avatarUrl: null, level: 'advanced',     points: 12324 },
  { rank: 7, username: 'Sara tawfeek', avatarUrl: null, level: 'intermediate', points: 12324 },
]

export const mockLeaderboardOverall: LeaderboardEntry[] = baseEntries
export const mockLeaderboardCountry: LeaderboardEntry[] = baseEntries.map(e => ({ ...e, points: e.points - 1000 }))
export const mockLeaderboardMonthly: LeaderboardEntry[] = baseEntries.map(e => ({ ...e, points: e.points - 2000 }))

// ── SETTINGS ──────────────────────────────────────────────────────────────────

export const mockProfileForm: ProfileFormData = {
  nickname: 'Jony Bill',
  realName: 'Jony Bill',
  email: 'JonyBill@miu.edu.eg.moe',
  country: 'Egypt',
  bio: 'Security researcher specializing in web application vulnerabilities. OWASP contributor and CTF enthusiast',
  linkedin: 'linkedin.com/in/jonybill',
  github: 'github.com/jonybill',
  website: 'jonybill.dev',
  openToHiring: true,
}

export const mockNotificationSettings: NotificationSettings = {
  reportUpdates: true,
  paymentAlerts: true,
  programNews: false,
  weeklyDigest: true,
  securityAlerts: true,
}

export const mockKYCStatus: KYCVerification = {
  overallVerified: true,
  documents: [
    { type: 'id',   label: 'ID document',      submittedDate: 'Jan 15, 2024', status: 'verified' },
    { type: 'face', label: 'Face verification', submittedDate: 'Jan 15, 2024', status: 'verified' },
  ],
}
