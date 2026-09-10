import type {
  CompanyProgramStatus, CompanyProgramType, CompanyReportStatus,
  CompanyReport, CompanyReportStats,
  RemediationWorkspace, RemediationStats,
  WorkspaceDetail, WorkspaceReportDetail,
} from '@/types'
import type { Severity } from '@/types'

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface CompanyStats {
  activePrograms: number
  newReports: number
  totalReports: number
  budgetRemaining: string
}

export interface CompanyProgram {
  id: string
  name: string
  type: CompanyProgramType
  status: CompanyProgramStatus
  budget: number
  monthlyBudget: number
  newReports: number
  totalReports: number
  createdAt: string
}

export interface CompanyReport {
  id: string
  reportId: string
  severity: Severity
  submittedBy: string
  status: CompanyReportStatus
}

export interface VulnTypeData {
  name: string
  value: number
  color: string
}

export interface TrendDataPoint {
  label: string
  value: number
}

// ─── Program detail interfaces ────────────────────────────────────────────────

export interface ViewScopeRow {
  target: string
  type: string
  severity: Severity | null
  rewardBox: string | null
}

export interface ViewRewardRow {
  severity: Severity
  rewardType: 'bounty' | 'coin'
  bountyDisplay?: string
  coinMin?: number
  coinMax?: number
  avgBounty: string
  submissions: string
}

export interface ViewRewardBox {
  name: string
  rows: ViewRewardRow[]
}

export interface ChatMessage {
  id: string
  author: string
  role: 'Hacker' | 'Company'
  timeAgo: string
  text: string
  isOwn: boolean
}

export interface CompanyProgramDetail {
  id: string
  name: string
  type: CompanyProgramType
  status: CompanyProgramStatus
  budget: number
  monthlyBudget: number
  description: string
  endsOn: string
  inScope: ViewScopeRow[]
  outOfScope: ViewScopeRow[]
  rewardBoxes: ViewRewardBox[]
  programRules: string[]
  disclosureGuidelines: string[]
  nonEligible: string[]
  messages: ChatMessage[]
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const mockCompanyStats: CompanyStats = {
  activePrograms:  12300,
  newReports:      12500,
  totalReports:    12500,
  budgetRemaining: '12,500',
}

export const mockCompanyPrograms: CompanyProgram[] = [
  { id: 'p1', name: 'Web Application Audit',    type: 'public',  status: 'active',   budget: 200000, monthlyBudget: 20000, newReports: 34, totalReports: 500, createdAt: '2025-01-10' },
  { id: 'p2', name: 'Mobile App Security',      type: 'private', status: 'active',   budget: 150000, monthlyBudget: 15000, newReports: 18, totalReports: 312, createdAt: '2025-02-03' },
  { id: 'p3', name: 'API Security Review',      type: 'private', status: 'paused',   budget: 200000, monthlyBudget: 10000, newReports:  6, totalReports: 145, createdAt: '2025-01-20' },
  { id: 'p4', name: 'Cloud Infrastructure',     type: 'public',  status: 'active',   budget: 300000, monthlyBudget: 25000, newReports: 21, totalReports: 278, createdAt: '2024-12-15' },
  { id: 'p5', name: 'Authentication Hardening', type: 'private', status: 'draft',    budget:  80000, monthlyBudget:  8000, newReports:  0, totalReports:   0, createdAt: '2025-03-01' },
  { id: 'p6', name: 'Payment Gateway Audit',    type: 'public',  status: 'paused',   budget: 200000, monthlyBudget: 18000, newReports:  9, totalReports: 190, createdAt: '2025-01-05' },
  { id: 'p7', name: 'IoT Device Assessment',    type: 'public',  status: 'archived', budget: 120000, monthlyBudget: 12000, newReports:  0, totalReports:  42, createdAt: '2024-11-20' },
]

const defaultRewardBoxes: ViewRewardBox[] = [
  {
    name: 'Box 1',
    rows: [
      { severity: 'low',      rewardType: 'bounty', bountyDisplay: '200$ - 700$',       avgBounty: 'Avg.bounty $200', submissions: '21% submissions' },
      { severity: 'medium',   rewardType: 'coin',   coinMin: 1000, coinMax: 2000,        avgBounty: 'Avg.bounty $200', submissions: '21% submissions' },
      { severity: 'high',     rewardType: 'bounty', bountyDisplay: '5,000$ - 10,000$',  avgBounty: 'Avg.bounty $200', submissions: '21% submissions' },
      { severity: 'critical', rewardType: 'bounty', bountyDisplay: '30,000$ - 50,000$', avgBounty: 'Avg.bounty $200', submissions: '21% submissions' },
    ],
  },
  {
    name: 'Box 2',
    rows: [
      { severity: 'low',      rewardType: 'bounty', bountyDisplay: '200$ - 700$',       avgBounty: 'Avg.bounty $200', submissions: '21% submissions' },
      { severity: 'medium',   rewardType: 'coin',   coinMin: 1000, coinMax: 2000,        avgBounty: 'Avg.bounty $200', submissions: '21% submissions' },
      { severity: 'high',     rewardType: 'bounty', bountyDisplay: '5,000$ - 10,000$',  avgBounty: 'Avg.bounty $200', submissions: '21% submissions' },
      { severity: 'critical', rewardType: 'bounty', bountyDisplay: '30,000$ - 50,000$', avgBounty: 'Avg.bounty $200', submissions: '21% submissions' },
    ],
  },
]

export const mockProgramDetails: Record<string, CompanyProgramDetail> = {
  p1: {
    id: 'p1',
    name: 'Acme Corporation Bug Bounty',
    type: 'public',
    status: 'active',
    budget: 250000,
    monthlyBudget: 25000,
    description: 'We welcome security researchers to help us identify vulnerabilities in our web applications, APIs, and mobile platforms. This program is designed to reward ethical hackers who discover and responsibly disclose security issues.',
    endsOn: 'January 15, 2026',
    inScope: [
      { target: 'https://alphasec.trade',          type: 'Web',            severity: 'critical', rewardBox: 'Box 1' },
      { target: 'https://api.alphasec.trade',       type: 'Domain',         severity: 'high',     rewardBox: 'Box 2' },
      { target: 'https://contracts.alphasec.trade', type: 'Smart contract', severity: 'medium',   rewardBox: 'Box 1' },
      { target: 'https://mobile.alphasec.trade',    type: 'Other',          severity: 'low',      rewardBox: 'Box 2' },
    ],
    outOfScope: [
      { target: 'https://staging.alphasec.trade', type: 'Web',    severity: null, rewardBox: null },
      { target: 'https://dev.alphasec.trade',     type: 'Domain', severity: null, rewardBox: null },
      { target: 'https://beta.alphasec.trade',    type: 'Other',  severity: null, rewardBox: null },
      { target: 'https://old.alphasec.trade',     type: 'Other',  severity: null, rewardBox: null },
    ],
    rewardBoxes: defaultRewardBoxes,
    programRules: [
      'Theoretical vulnerabilities without any proof or demonstration',
      'Attacks requiring physical access to a user\'s device',
      'Self-XSS attacks that require a victim to enter malicious data',
      'Issues affecting only outdated browsers or platforms',
      'Vulnerabilities in third-party services not directly integrated',
    ],
    disclosureGuidelines: [
      'Do not discuss this program or any vulnerabilities (even resolved ones) outside of the program without express consent from the organization',
      'Do not publicly disclose vulnerabilities until the company has had a reasonable time to remediate',
      'Provide sufficient information to reproduce and validate the vulnerability',
      'Do not exploit vulnerabilities beyond what is necessary to demonstrate impact',
      'Theoretical vulnerabilities without any proof or demonstration',
    ],
    nonEligible: [
      'Do not discuss this program or any vulnerabilities (even resolved ones) outside of the program without express consent from the organization',
      'Vulnerabilities in out-of-scope systems or applications',
      'Issues previously reported by another researcher or internally identified',
      'Vulnerabilities requiring extensive user interaction unlikely in real scenarios',
      'Theoretical vulnerabilities without any proof or demonstration',
    ],
    messages: [
      { id: 'm1', author: 'Ali', role: 'Hacker',   timeAgo: '2 hours ago', text: 'Can you confirm whether staging environment is in scope for testing?',          isOwn: false },
      { id: 'm2', author: 'You', role: 'Company',  timeAgo: '2 hours ago', text: 'Yes, feel free to test! let us know if you need further assistance',             isOwn: true  },
    ],
  },
}

export const mockCompanyReports: CompanyReport[] = [
  { id: 'r1', reportId: 'VUL-230184785498', severity: 'critical', submittedBy: 'h4x0r_eg',    status: 'new'       },
  { id: 'r2', reportId: 'VUL-230184785512', severity: 'high',     submittedBy: 'sec_hunter',  status: 'in_review' },
  { id: 'r3', reportId: 'VUL-230184785534', severity: 'medium',   submittedBy: 'bugbountyX',  status: 'triaged'   },
  { id: 'r4', reportId: 'VUL-230184785549', severity: 'low',      submittedBy: 'null_byte',   status: 'resolved'  },
  { id: 'r5', reportId: 'VUL-230184785567', severity: 'high',     submittedBy: 'cairo_sec',   status: 'new'       },
  { id: 'r6', reportId: 'VUL-230184785581', severity: 'critical', submittedBy: 'pentest_pro', status: 'triaged'   },
  { id: 'r7', reportId: 'VUL-230184785603', severity: 'medium',   submittedBy: 'zero_day_eg', status: 'resolved'  },
]

export const mockVulnTypes: VulnTypeData[] = [
  { name: 'SQL Injection', value: 40, color: '#003bdf' },
  { name: 'XSS',           value: 25, color: '#fbbe24' },
  { name: 'CSRF',          value: 20, color: '#f43f5d' },
  { name: 'Other',         value: 15, color: '#ff7104' },
]

export const mockReportsTrend: TrendDataPoint[] = [
  { label: 'FEB 1',  value:  7 },
  { label: 'FEB 7',  value: 28 },
  { label: 'FEB 14', value: 13 },
  { label: 'FEB 20', value: 32 },
  { label: 'MAR 1',  value: 13 },
  { label: 'MAR 2',  value: 28 },
]

// ─── Team Members ─────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  role: string
}

export const mockTeamMembers: TeamMember[] = [
  { id: 'tm1', name: 'Ahmed Hassan',  role: 'Team lead'           },
  { id: 'tm2', name: 'Sara Khaled',   role: 'Security researcher' },
  { id: 'tm3', name: 'Omar Ali',      role: 'Developer'           },
  { id: 'tm4', name: 'Mona Ibrahim',  role: 'Team lead'           },
]

// ─── Remediation Hub ──────────────────────────────────────────────────────────

export const mockRemediationStats: RemediationStats = {
  workspaces:    56,
  teamMembers:   44,
  criticalIssues: 78,
  totalFindings: 66,
}

export const mockRemediationWorkspaces: RemediationWorkspace[] = [
  {
    id:            'ws1',
    name:          'Cloud Security',
    type:          'cloud',
    description:   'AWS, GCP & Azure infrastructure security monitoring',
    totalFindings: 14,
    severityCounts: { critical: 12, high: 14, medium: 44, low: 11 },
  },
  {
    id:            'ws2',
    name:          'Mobile App Security',
    type:          'mobile',
    description:   'Android & iOS application security assessment',
    totalFindings: 22,
    severityCounts: { critical: 5, high: 8, medium: 6, low: 3 },
  },
  {
    id:            'ws3',
    name:          'Web Application Audit',
    type:          'web',
    description:   'Front-end and API layer vulnerability remediation',
    totalFindings: 31,
    severityCounts: { critical: 9, high: 11, medium: 7, low: 4 },
  },
  {
    id:            'ws4',
    name:          'Authentication System Review',
    type:          'mobile',
    description:   'OAuth 2.0 & session management hardening',
    totalFindings: 18,
    severityCounts: { critical: 4, high: 7, medium: 5, low: 2 },
  },
]

// ─── Workspace Detail ─────────────────────────────────────────────────────────

export const mockWorkspaceDetails: WorkspaceDetail[] = [
  {
    id:   'ws1',
    name: 'Workspace 01',
    stats: { newReports: 78, triaged: 56, inReview: 44, resolved: 66 },
    reports: [
      { id: 'r01', title: 'API rate-limit bypass',           status: 'new',       researcher: 'bug.hunter', severity: 'low',      date: '2026-02-05' },
      { id: 'r02', title: 'Insecure S3 bucket exposure',     status: 'resolved',  researcher: 'bug.hunter', severity: 'low',      date: '2026-02-05' },
      { id: 'r03', title: 'JWT secret brute-force',          status: 'new',       researcher: 'bug.hunter', severity: 'high',     date: '2026-02-05' },
      { id: 'r04', title: 'SQL injection in search param',   status: 'resolved',  researcher: 'bug.hunter', severity: 'high',     date: '2026-02-05' },
      { id: 'r05', title: 'SSRF via image URL parameter',    status: 'resolved',  researcher: 'bug.hunter', severity: 'high',     date: '2026-02-05' },
      { id: 'r06', title: 'Broken object-level auth',        status: 'triaged',   researcher: 'bug.hunter', severity: 'low',      date: '2026-02-05' },
      { id: 'r07', title: 'RCE in file upload handler',      status: 'triaged',   researcher: 'bug.hunter', severity: 'critical', date: '2026-02-05' },
      { id: 'r08', title: 'CORS misconfiguration',           status: 'triaged',   researcher: 'bug.hunter', severity: 'medium',   date: '2026-02-05' },
      { id: 'r09', title: 'Privilege escalation via role',   status: 'in_review', researcher: 'bug.hunter', severity: 'medium',   date: '2026-02-05' },
      { id: 'r10', title: 'Stored XSS in comment field',     status: 'in_review', researcher: 'bug.hunter', severity: 'high',     date: '2026-02-05' },
    ],
    members: [
      { id: 'm1', name: 'Kriss Chin',    role: 'Team lead',           initials: 'K' },
      { id: 'm2', name: 'Ahmed Hassan',  role: 'Security researcher', initials: 'A' },
      { id: 'm3', name: 'Sara Khaled',   role: 'Developer',           initials: 'S' },
      { id: 'm4', name: 'Omar Ali',      role: 'Team lead',           initials: 'O' },
      { id: 'm5', name: 'Mona Ibrahim',  role: 'Security researcher', initials: 'M' },
    ],
  },
  {
    id:   'ws2',
    name: 'Workspace 02',
    stats: { newReports: 34, triaged: 21, inReview: 18, resolved: 42 },
    reports: [
      { id: 'r11', title: 'Hardcoded API key in APK',          status: 'new',       researcher: 'sec.eagle',  severity: 'critical', date: '2026-02-10' },
      { id: 'r12', title: 'Insecure local storage token',      status: 'triaged',   researcher: 'sec.eagle',  severity: 'medium',   date: '2026-02-10' },
      { id: 'r13', title: 'Deep-link hijacking',               status: 'new',       researcher: 'sec.eagle',  severity: 'high',     date: '2026-02-10' },
      { id: 'r14', title: 'Cleartext HTTP traffic',            status: 'resolved',  researcher: 'sec.eagle',  severity: 'medium',   date: '2026-02-10' },
      { id: 'r15', title: 'Exported activity vulnerability',   status: 'triaged',   researcher: 'sec.eagle',  severity: 'high',     date: '2026-02-10' },
      { id: 'r16', title: 'Path traversal in file download',   status: 'in_review', researcher: 'sec.eagle',  severity: 'high',     date: '2026-02-10' },
      { id: 'r17', title: 'WebView JS injection',              status: 'resolved',  researcher: 'sec.eagle',  severity: 'critical', date: '2026-02-10' },
      { id: 'r18', title: 'Biometric bypass via ADB',          status: 'in_review', researcher: 'sec.eagle',  severity: 'low',      date: '2026-02-10' },
      { id: 'r19', title: 'Unencrypted SQLite database',       status: 'resolved',  researcher: 'sec.eagle',  severity: 'medium',   date: '2026-02-10' },
      { id: 'r20', title: 'Broadcast receiver exposure',       status: 'new',       researcher: 'sec.eagle',  severity: 'low',      date: '2026-02-10' },
    ],
    members: [
      { id: 'm6',  name: 'Layla Nasser',  role: 'Team lead',           initials: 'L' },
      { id: 'm7',  name: 'Youssef Adel',  role: 'Security researcher', initials: 'Y' },
      { id: 'm8',  name: 'Hana Mostafa',  role: 'Developer',           initials: 'H' },
      { id: 'm9',  name: 'Tarek Fahmy',   role: 'Team lead',           initials: 'T' },
      { id: 'm10', name: 'Nour Samir',    role: 'Security researcher', initials: 'N' },
    ],
  },
]

// ─── Workspace Report Detail ──────────────────────────────────────────────────

const EXPECTED_RESULTS_CODE = `import React, { useState, useEffect } from "react";
import { defineProperties } from "figma:react";

export default function AnalogClock({
  updateInterval = 1000,
  secondHandColor = "red",
  minuteHandColor = "black",
  hourHandColor = "black",
}) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateClock = () => {
      // Get London's local time using en-GB format
      const londonTimeString = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
        hour12: false
      });
      const [hoursStr, minutesStr, secondsStr] = londonTimeString.split(":");
      setTime({
        hours: parseInt(hoursStr, 10),
        minutes: parseInt(minutesStr, 10),
        seconds: parseInt(secondsStr, 10)
      });
    };

    updateClock();
    const timerId = setInterval(updateClock, updateInterval);
    return () => clearInterval(timerId);
  }, [updateInterval]);
}`

export const mockWorkspaceReportDetail: WorkspaceReportDetail = {
  id:         'r01',
  title:      'SQL Injection in User Authentication Endpoint',
  status:     'resolved',
  researcher: 'Alex Thompson',
  severity:   'critical',
  date:       '2026-03-05',

  reportId:      'VR-2026-0342',
  submittedDate: 'March 5, 2026',
  hackerName:    'Alex Thompson',
  rewardAmount:  5089,

  vulnerabilityType: 'SQL Injection',
  affectedAsset:     'https://api.example.com/auth/login',

  description: 'The login endpoint is vulnerable to SQL injection attacks through the username parameter. An attacker can bypass authentication and gain unauthorized access to user accounts by injecting malicious SQL code. This vulnerability exists due to improper input sanitization and the use of string concatenation to build SQL queries.',

  stepsToReproduce: `1. Login with a normal user account
2. Navigate to Settings → API Keys
3. Intercept the API key generation request using Burp Suite
4. Send the same request multiple times simultaneously using:
   - Turbo Intruder
   - Burp Intruder
   - Any concurrency testing tool
5. Observe the response`,

  expectedResults: EXPECTED_RESULTS_CODE,

  impact: `- Bypasses business logic restrictions
- Allows users to maintain multiple active API keys
- Increases risk of API abuse and key leakage
- Complicates key revocation and access control`,

  recommendations: `It is recommended to implement proper synchronization mechanisms during the API key generation process to prevent concurrent requests from being processed simultaneously.

The system should enforce a single active API key per user by:
- Applying database-level constraints to ensure uniqueness.
- Introducing server-side locking or transactional checks before creating a new API key.
- Validating existing keys before processing any new generation request.

Additionally, logging and monitoring should be enhanced to detect abnormal or repeated key generation attempts.`,

  attachments: [
    { name: '2027-07-786%67-09-67.pdf' },
    { name: '2027-07-786%67-09-67.pdf' },
  ],

  collaborators: [
    { username: 'AliOmar', percentage: 60, role: 'collaborator' },
    { username: 'AliOmar', percentage: 60, role: 'collaborator' },
    { username: 'AliOmar', percentage: 60, role: 'creator'      },
  ],

  activity: [
    {
      id:        'a1',
      actorName: 'AliOmar',
      actorType: 'hacker',
      action:    'created the submission and has invited AliOla to collaborate',
      timestamp: 'Submitted 10 months ago',
    },
    {
      id:           'a2',
      actorName:    'CyberNest (you)',
      actorType:    'company',
      action:       'has changed the state to',
      timestamp:    '10 months ago',
      statusChange: 'triaged',
    },
    {
      id:        'a3',
      actorName: 'CyberNest (you)',
      actorType: 'company',
      action:    'sent a message',
      timestamp: '10 months ago',
      message:   'We are currently investigating the reported issue to validate its impact and reproducibility.\nIf additional information is required, we will reach out to you through this thread.',
    },
    {
      id:        'a4',
      actorName: 'AliOmar',
      actorType: 'hacker',
      action:    'submitted a response request from CyberNest with reason: issue is complicated',
      timestamp: '9 months ago',
      message:   "Thank you for reviewing the report.\nI'd like to add that the issue is consistently reproducible under concurrent requests, as mentioned in the steps above.",
    },
  ],
}
