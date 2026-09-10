// ─── Core Enumerations ────────────────────────────────────────────────────────

export type UserRole = 'hacker' | 'company' | 'developer' | 'user' | 'admin'

export type ReportStatus =
  | 'submitted'
  | 'triaged'
  | 'accepted'
  | 'rejected'
  | 'duplicate'
  | 'out_of_scope'
  | 'paid'
  | 'pending'
  | 'deleted'
  | 'draft'

export type ActionNeeded =
  | 'add_details'
  | 'request_mediation'
  | 'verify_fix'
  | 'request_disclosure'
  | 'none'

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'informational'

export type TransactionStatus = 'pending' | 'available' | 'withdrawn'

export type ProgramType = 'public' | 'private' | 'vdp'

/** Technology scope used on program cards / tags */
export type ProgramScopeType = 'web' | 'cloud' | 'mobile'

export type VettingStatus = 'pending' | 'vetted' | 'rejected'

export type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected'

export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced'

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl?: string
  kycStatus: KYCStatus
  createdAt: string
}

export interface HackerProfile extends User {
  role: 'hacker'
  username: string
  points: number
  coins: number
  rank: string
  rankLevel: number
  openToHiring: boolean
  vettingStatus: VettingStatus
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export interface BugReport {
  id: string
  title: string
  severity: Severity
  status: ReportStatus
  program: string
  submittedAt: string
  reward?: number
}

export interface HackerReport {
  id: string
  title: string
  createdAt: string
  program: string
  pointsEarned: number | null
  severity: Severity
  status: ReportStatus
  reward: string | null
  rewardType: 'cash' | 'coins' | null
  coinsMin?: number
  coinsMax?: number
  actionNeeded: ActionNeeded
}

export interface HackerReportStats {
  totalReports: number
  acceptedReports: number
  pendingReports: number
  paidReports: number
}

// ─── Programs ─────────────────────────────────────────────────────────────────

export type ScopeTargetSeverity = 'critical' | 'high' | 'medium' | 'low' | 'none'

export interface ScopeTarget {
  target: string
  type: string
  severity: ScopeTargetSeverity
  reward: string
  inScope: boolean
}

export interface RewardTier {
  severity: 'critical' | 'high' | 'medium' | 'low'
  cashRange?: string
  coinsRange?: string
  avgBounty: string
  submissionPct: string
  box: string
}

export interface ProgramMessage {
  id: string
  sender: 'hacker' | 'company'
  senderName: string
  role: string
  content: string
  timestamp: string
}

export interface Program {
  id: string
  name: string
  description: string
  type: ProgramType
  scopeTypes: ProgramScopeType[]
  companyName: string
  bannerImage?: string
  companyLogo?: string
  endsAt: string
  bountyMin: number
  bountyMax: number
  totalReports: number
  isActive: boolean
  createdAt: string
  // ─ Overview-only fields (optional) ─────────────────────────────────────────
  stats?: {
    totalPaid: number
    reportsSolved: number
    avgBountyRange: string
    topBountyRange: string
  }
  scopeTargets?: ScopeTarget[]
  rewards?: RewardTier[]
  rules?: string[]
  disclosureGuidelines?: string[]
  nonEligible?: string[]
  messages?: ProgramMessage[]
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

export interface WalletBalance {
  available: number
  pending: number
  totalTransactions: number
  totalEarnings: number
  lastRewardDaysAgo: number
}

// ─── Dashboard Stats (Hacker) ─────────────────────────────────────────────────

export interface HackerDashboardStats {
  activeReports: number
  newReports: number
  acceptedReports: number
  paidReports: number
}

// ─── Reputation ───────────────────────────────────────────────────────────────

export interface ReputationData {
  totalPoints: number
  totalCoins: number
  rank: string
  rankLevel: number
  nextRank: string
  progressPercent: number
  badgeCount: number
}

// ─── Academy ──────────────────────────────────────────────────────────────────

export type AcademyTab = 'courses' | 'subscriptions' | 'gifts' | 'certifications' | 'internships'

export interface AcademyStats {
  coinsAvailable: number
}

export interface AcademyCourse {
  id: string
  title: string
  description: string
  instructor: string
  priceCoins: number
  studentsCount: number
  durationWeeks: number
  rating: number
  thumbnailUrl: string | null
  difficulty: CourseDifficulty
}

export interface CourseModule {
  id: string
  title: string
  duration: string
}

export interface CourseInstructor {
  name: string
  title: string
  bio: string
  linkedinUrl: string
  githubUrl: string
  avatarUrl: string | null
}

export interface CourseDetail {
  id: string
  title: string
  description: string
  level: CourseDifficulty
  studentsCount: number
  rating: number
  durationWeeks: number
  instructor: CourseInstructor
  priceCoins: number
  whatYouWillLearn: string[]
  modules: CourseModule[]
  requirements: string[]
  includes: string[]
  totalModules: number
  totalLessons: number
}

// ─── CVSS ─────────────────────────────────────────────────────────────────────

export type CvssAttackVector       = 'network' | 'adjacent' | 'local' | 'physical'
export type CvssAttackComplexity   = 'low' | 'high'
export type CvssPrivilegesRequired = 'none' | 'low' | 'high'
export type CvssUserInteraction    = 'none' | 'required'
export type CvssScope              = 'unchanged' | 'changed'
export type CvssCIAImpact          = 'none' | 'low' | 'high'

export interface CvssVector {
  AV: CvssAttackVector
  AC: CvssAttackComplexity
  PR: CvssPrivilegesRequired
  UI: CvssUserInteraction
  S:  CvssScope
  C:  CvssCIAImpact
  I:  CvssCIAImpact
  A:  CvssCIAImpact
}

export interface ReportFormData {
  programId: string
  title: string
  assetId: string
  cweId: string
  vulnerabilityUrl: string
  description: string
  severity: Severity | null
  useCvss: boolean
  cvssVector: CvssVector
  pocFiles: File[]
  collaboratorUsername: string
  rewardSplitPct: number
}

// ─── Report Detail ────────────────────────────────────────────────────────────

export type ActivityType =
  | 'submitted'
  | 'triaged'
  | 'accepted'
  | 'rejected'
  | 'comment'
  | 'attachment'
  | 'severity_changed'
  | 'status_changed'
  | 'collaborator_added'
  | 'fix_requested'
  | 'fix_verified'
  | 'paid'

export type ActorType = 'hacker' | 'company' | 'admin'

export interface ReportActivity {
  id: string
  type: ActivityType
  actor: string
  actorRole: ActorType
  message: string
  timestamp: string
  isPrivate?: boolean
}

export interface ReportDetailCollaborator {
  username: string
  splitPct: number
}

export interface ReportDetail {
  id: string
  title: string
  status: ReportStatus
  severity: Severity
  program: string
  programId: string
  submittedAt: string
  updatedAt: string
  assetUrl: string
  cweId: string
  vulnerabilityUrl: string
  description: string
  reward: string | null
  rewardType: 'cash' | 'coins' | null
  pointsEarned: number | null
  cvssScore: number | null
  cvssVector: string | null
  pocFiles: Array<{ name: string; size: string; url: string }>
  collaborators: ReportDetailCollaborator[]
  activity: ReportActivity[]
  actionNeeded: ActionNeeded
}

// ─── Action Items ─────────────────────────────────────────────────────────────

export interface ActionItem {
  id: string
  title: string
  description: string
  type: 'report_update' | 'verification' | 'payment' | 'other'
  href: string
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

export type SubscriptionLevel = 'beginner' | 'intermediate' | 'advanced'

export interface AcademySubscription {
  id: string
  name: string
  description: string
  level: SubscriptionLevel
  subscribersCount: number
  rating: number
  durationWeeks: number
  priceCoins: number
  about: string
  whatYouGetAccess: string[]
  prerequisites: string[]
  recommendedTools: string[]
  systemRequirements: string[]
  labEnvironment: {
    totalLabs: string
    difficulties: SubscriptionLevel[]
    realWorldScenarios: string[]
    progressFeatures: string[]
  }
  accessDuration: string
  renewalPolicy: string[]
  refundPolicy: string
  careerImpact: string
}

// ─── Gifts ────────────────────────────────────────────────────────────────────

export type GiftLevel = 'new' | 'pro' | 'elite'

export interface AcademyGift {
  id: string
  name: string
  description: string
  priceCoins: number
  deliveryType: 'physical' | 'digital'
  deliveryDays: number
  rating: number
  level: GiftLevel
  imageUrl: string | null
}

export interface GiftRedemptionForm {
  fullName: string
  address: string
  phoneNumber: string
}

// ─── Certifications ───────────────────────────────────────────────────────────

export type CertificationLevel = 'beginner' | 'intermediate' | 'advanced'

export interface AcademyCertification {
  id: string
  title: string
  description: string
  level: CertificationLevel
  durationHours: number
  format: string
  rating: number
  priceCoins: number
}

export interface CertificationDetail extends AcademyCertification {
  issuedBy: string
  fullDescription: string
  discountNote: string
  topicsTestedOn: string[]
  requiredKnowledge: string[]
  recommendedBackground: string[]
  overview: string
  retakePolicy: Array<{ step: number; title: string; description: string }>
}

// ─── Internships ──────────────────────────────────────────────────────────────

export type InternshipLocation = 'remote' | 'on-site' | 'hybrid'
export type InternshipStatus = 'paid' | 'unpaid' | 'open' | 'closed'

export interface AcademyInternship {
  id: string
  title: string
  description: string
  location: InternshipLocation
  durationMonths: number
  rating: number
  status: InternshipStatus
}

export interface InternshipDetail extends AcademyInternship {
  fullDescription: string
  whatYouWillDo: string[]
  technicalRequirements: string[]
  whatYouWillGain: Array<{ icon: string; title: string; description: string }>
  timeline: {
    startDate: string
    endDate: string
    applicationDeadline: string
  }
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

export type WithdrawTab = 'bank' | 'ewallet'
export type TransactionDirection = 'in' | 'out'

export interface WalletStats {
  availableBalance: string
  pendingBalance: string
  totalSpending: string
}

export interface WalletTransaction {
  id: string
  label: string
  date: string
  amount: string
  direction: TransactionDirection
}

export interface WalletCard {
  holderName: string
  balance: string
  last4: string
  validThru: string
}

export interface ChartDataPoint {
  date: string
  income: number
  expenses: number
}

export interface BankWithdrawForm {
  bank: string
  accountName: string
  accountNumber: string
  iban: string
  swift: string
  amount: string
}

export interface EWalletWithdrawForm {
  provider: string
  accountName: string
  walletId: string
  confirmWalletId: string
  amount: string
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export type RecommendationType = 'course' | 'lab' | 'certificate' | 'internship'

export interface AnalyticsStats {
  totalBugs: number
  totalEarnings: string
  avgBounty: string
  acceptanceRate: string
}

export interface SkillRadarPoint {
  skill: string
  value: number
}

export interface SeverityDistribution {
  low: number
  medium: number
  critical: number
  high: number
}

export interface SkillGapItem {
  skill: string
  current: number
  target: number
}

export interface RecommendedAction {
  id: string
  title: string
  type: RecommendationType
  domain: string
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export type SettingsTab = 'profile' | 'security' | 'notifications' | 'kyc'

export interface ProfileFormData {
  nickname: string
  realName: string
  email: string
  country: string
  bio: string
  linkedin: string
  github: string
  website: string
  openToHiring: boolean
}

export interface SecurityFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  twoFactorEnabled: boolean
}

export interface NotificationSettings {
  reportUpdates: boolean
  paymentAlerts: boolean
  programNews: boolean
  weeklyDigest: boolean
  securityAlerts: boolean
}

export interface KYCDocument {
  type: 'id' | 'face'
  label: string
  submittedDate: string
  status: 'verified' | 'pending' | 'rejected'
}

export interface KYCVerification {
  overallVerified: boolean
  documents: KYCDocument[]
}

// ─── Company ──────────────────────────────────────────────────────────────────

export type CompanyProgramStatus = 'active' | 'paused' | 'draft' | 'archived'
export type CompanyProgramType   = 'public' | 'private'
export type CompanyReportStatus  = 'new' | 'in_review' | 'triaged' | 'resolved'

export interface CompanyReport {
  id:         string
  title:      string
  status:     CompanyReportStatus
  researcher: string
  severity:   Severity
  date:       string
}

export interface CompanyReportStats {
  total:       number
  resolved:    number
  triaged:     number
  rewardsPaid: number
}

export type RewardType = 'bounty' | 'coin' | 'none'

export interface RewardBoxRow {
  severity: Severity
  rewardType: RewardType
  min: number
  max: number
}

export interface RewardBox {
  id: string
  name: string
  rows: RewardBoxRow[]
}

export interface ScopeAsset {
  id: string
  name: string
  type: 'domain' | 'ip' | 'api' | 'app'
  maxImpact: Severity
  environment: 'prod' | 'staging' | 'dev'
  rewardBoxId: string
}

export interface ProgramPolicy {
  safeHarbor: boolean
  submissionRules: string
  disclosureGuidelines: string
  nonEligible: string
}

export interface ProgramBudget {
  total: number
  monthlyCap: number
  noMonthlyLimit: boolean
  autoPause: boolean
}

export interface ProgramDraft {
  name: string
  description: string
  type: CompanyProgramType
  inScope: ScopeAsset[]
  outScope: ScopeAsset[]
  rewardBoxes: RewardBox[]
  policy: ProgramPolicy
  budget: ProgramBudget
  letUsTriage: boolean
  agreedToTerms: boolean
}

// ─── Workspace Detail ─────────────────────────────────────────────────────────

export type WorkspaceReportStatus = 'new' | 'triaged' | 'in_review' | 'resolved'

export interface WorkspaceReport {
  id: string
  title: string
  status: WorkspaceReportStatus
  researcher: string
  severity: Severity
  date: string
}

export interface WorkspaceMember {
  id: string
  name: string
  role: string
  initials: string
}

export interface WorkspaceDetail {
  id: string
  name: string
  stats: { newReports: number; triaged: number; inReview: number; resolved: number }
  reports: WorkspaceReport[]
  members: WorkspaceMember[]
}

// ─── Workspace Report Detail ──────────────────────────────────────────────────

export interface WorkspaceCollaborator {
  username: string
  percentage: number
  role: 'collaborator' | 'creator'
}

export interface WorkspaceActivityEntry {
  id: string
  actorName: string
  actorType: 'hacker' | 'company'
  action: string
  timestamp: string
  message?: string
  statusChange?: WorkspaceReportStatus
}

export interface WorkspaceReportDetail extends WorkspaceReport {
  reportId: string
  submittedDate: string
  hackerName: string
  vulnerabilityType: string
  affectedAsset: string
  description: string
  stepsToReproduce: string
  expectedResults: string
  impact: string
  recommendations: string
  attachments: { name: string }[]
  collaborators: WorkspaceCollaborator[]
  activity: WorkspaceActivityEntry[]
  rewardAmount: number
}

// ─── Remediation Hub ──────────────────────────────────────────────────────────

export interface RemediationWorkspace {
  id: string
  name: string
  type: 'web' | 'cloud' | 'mobile'
  description: string
  totalFindings: number
  severityCounts: { critical: number; high: number; medium: number; low: number }
}

export interface RemediationStats {
  workspaces: number
  teamMembers: number
  criticalIssues: number
  totalFindings: number
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export type RankingTab = 'overall' | 'country' | 'monthly'

export type HackerLevel = 'beginner' | 'intermediate' | 'advanced'

export interface LeaderboardEntry {
  rank: number
  username: string
  avatarUrl: string | null
  level: HackerLevel
  points: number
  isCurrentUser?: boolean
}

export interface LeaderboardStats {
  rank: number
  level: HackerLevel
  totalReports: number
  profit: string
}
