import type {
  HackerReport,
  HackerReportStats,
  ReportDetail,
} from '@/types'

export const mockHackerReportStats: HackerReportStats = {
  totalReports: 50,
  acceptedReports: 12,
  pendingReports: 15,
  paidReports: 12500,
}

export const mockHackerReports: HackerReport[] = [
  { id: 'RPT-001', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: 2,    severity: 'critical', status: 'submitted', reward: null,            rewardType: 'coins', coinsMin: 1000, coinsMax: 2000, actionNeeded: 'request_mediation' },
  { id: 'RPT-002', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: 2,    severity: 'high',     status: 'deleted',   reward: '1000$ - 2000$', rewardType: 'cash',                             actionNeeded: 'add_details' },
  { id: 'RPT-003', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: 2,    severity: 'medium',   status: 'triaged',   reward: '3000$ - 1000$', rewardType: 'cash',                             actionNeeded: 'add_details' },
  { id: 'RPT-004', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: 2,    severity: 'low',      status: 'paid',      reward: null,            rewardType: 'coins', coinsMin: 1000, coinsMax: 2000, actionNeeded: 'verify_fix' },
  { id: 'RPT-005', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: 2,    severity: 'high',     status: 'rejected',  reward: null,            rewardType: 'coins', coinsMin: 1000, coinsMax: 2000, actionNeeded: 'request_disclosure' },
  { id: 'RPT-006', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: null, severity: 'low',      status: 'draft',     reward: null,            rewardType: 'coins', coinsMin: 1000, coinsMax: 2000, actionNeeded: 'none' },
  { id: 'RPT-007', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: 2,    severity: 'low',      status: 'pending',   reward: null,            rewardType: 'coins', coinsMin: 1000, coinsMax: 2000, actionNeeded: 'add_details' },
  { id: 'RPT-008', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: 2,    severity: 'low',      status: 'pending',   reward: null,            rewardType: 'coins', coinsMin: 1000, coinsMax: 2000, actionNeeded: 'none' },
  { id: 'RPT-009', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: 2,    severity: 'medium',   status: 'pending',   reward: '3000$ - 1000$', rewardType: 'cash',                             actionNeeded: 'verify_fix' },
  { id: 'RPT-010', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: null, severity: 'medium',   status: 'rejected',  reward: '3000$ - 1000$', rewardType: 'cash',                             actionNeeded: 'none' },
  { id: 'RPT-011', title: 'Insecure direct object reference in user API', createdAt: '08/12/2026', program: 'SecureNest', pointsEarned: null, severity: 'low',      status: 'pending',   reward: '3000$ - 1000$', rewardType: 'cash',                             actionNeeded: 'none' },
]

export const mockReportDetail: ReportDetail = {
  id: 'RPT-001',
  title: 'Insecure direct object reference in user API',
  status: 'triaged',
  severity: 'critical',
  program: 'SecureNest',
  programId: 'PRG-001',
  submittedAt: '08/12/2026',
  updatedAt: '09/12/2026',
  assetUrl: 'https://alphasec.trade',
  cweId: 'CWE-284',
  vulnerabilityUrl: 'https://alphasec.trade/api/v1/users/123',
  description: `## Summary\n\nThe \`/api/v1/users/:id\` endpoint does not validate that the authenticated user owns the resource being requested.\n\n## Steps to Reproduce\n\n1. Log in as User A (id=100)\n2. Change the \`id\` parameter to 101 in the request\n3. Observe that User B's profile data is returned\n\n\`\`\`http\nGET /api/v1/users/101 HTTP/1.1\nAuthorization: Bearer <token_of_user_100>\n\`\`\`\n\n## Impact\n\nAny authenticated user can read, modify, or delete another user's account data, including PII and payment information.\n\n## Recommended Fix\n\nAdd server-side ownership check: verify \`request.user.id === params.id\` before returning data.`,
  reward: '1000$ - 2000$',
  rewardType: 'cash',
  pointsEarned: 40,
  cvssScore: 8.8,
  cvssVector: 'AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
  pocFiles: [
    { name: 'proof_of_concept.mp4', size: '12.4 MB', url: '#' },
    { name: 'burp_request.txt',     size: '2.1 KB',  url: '#' },
  ],
  collaborators: [
    { username: 'ahmed_h', splitPct: 70 },
    { username: 'sec_omar', splitPct: 30 },
  ],
  actionNeeded: 'verify_fix',
  activity: [
    {
      id: 'ACT-001',
      type: 'submitted',
      actor: 'ahmed_h',
      actorRole: 'hacker',
      message: 'Report submitted.',
      timestamp: '08/12/2026 10:14',
    },
    {
      id: 'ACT-002',
      type: 'triaged',
      actor: 'SecureNest Security',
      actorRole: 'company',
      message: 'We have reproduced the issue. Moving to triage.',
      timestamp: '08/12/2026 14:32',
    },
    {
      id: 'ACT-003',
      type: 'comment',
      actor: 'ahmed_h',
      actorRole: 'hacker',
      message: 'Happy to provide additional proof if needed.',
      timestamp: '08/12/2026 15:00',
    },
    {
      id: 'ACT-004',
      type: 'severity_changed',
      actor: 'SecureNest Security',
      actorRole: 'company',
      message: 'Severity updated from High → Critical.',
      timestamp: '09/12/2026 09:00',
    },
    {
      id: 'ACT-005',
      type: 'fix_requested',
      actor: 'SecureNest Security',
      actorRole: 'company',
      message: 'Fix has been deployed to production. Please verify.',
      timestamp: '09/12/2026 17:45',
    },
  ],
}
