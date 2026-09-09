# CyberKemet.com — Egypt Cyber Platform
## Claude Code Master Instructions

---

## 1. Project Overview

**CyberKemet.com** is a multi-portal cybersecurity Bug Bounty & Security Services platform for Egypt.
Portals: Hackers, Companies, Developers, Normal Users, Admins.

- **Frontend:** Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4
- **Backend:** Laravel — NOT built yet. Use mock data for everything.
- **Languages:** Arabic (RTL) + English (LTR). Default: Light mode.

---

## 2. Figma Source of Truth

File: https://www.figma.com/design/A4Dc2JnyBcpLIXsFx0yEnr/CyKemet.com
Pages: Design system | Hacker Dashboard | Company Dashboard | Admin Dashboard | Main User Dashboard | Developer Dashboard

**Rules:**
- ALWAYS read the Figma frame before writing any component
- Design system page = single source of truth for all tokens
- Never guess a color, spacing, or font — verify in Figma first

---

## 3. Design System Rules

- **NEVER** hardcode hex colors or pixel values
- **ALWAYS** use named tokens from `tailwind.config.ts`
- Spacing follows Tailwind scale mapped to Figma grid
- Border radius values from Figma (named tokens: `rounded-card`, `rounded-btn`)

### Color tokens
```
Primary → colors.primary.*    Secondary → colors.secondary.*
Background → colors.bg.*      Error → colors.error.*
Success → colors.success.*    Warning → colors.warning.*
Tint → colors.tint.*
```

### Typography
```
Fonts: font-sans (Plus Jakarta Sans) | font-arabic (Cairo) | font-logo (logo only)

Titles:   text-title-1 (64px) / text-title-2 (40px) / text-title-3 (32px)
Headings: text-h1 (28px) / text-h2 (26px) / text-h3 (24px) / text-h4 (20px) / text-h5 (18px)
Body:     text-body-lg (16px) / text-body-md (14px) / text-body-sm (12px)
Labels:   text-label-lg (17px) / text-label-md (15px) / text-label-sm (13px)
          text-label-xs (12px) / text-label-2xs (11px)

All text utilities include line-height + letter-spacing (-0.4px) automatically.
```

### Icons
- All from `lucide-react`
- Sizes: sm=16px, md=20px, lg=24px, xl=32px
- Never use emoji as icons

---

## 4. Project Structure (key paths)
```
src/
├── app/
│   ├── (auth)/           login, register, verify, reset-password, verify-email
│   ├── hacker/           layout, dashboard, programs/[id], reports/[id], reports/new,
│   │                     academy/[courseId], academy/subscriptions/[id],
│   │                     academy/certifications/[id], academy/internships/[id],
│   │                     leaderboard, wallet, analytics, settings
│   ├── company/          layout, dashboard, faq,
│   │                     programs/, programs/create/, programs/create/preview/
│   ├── (developer)/      marketplace, contracts, workroom, wallet
│   ├── (user)/           dashboard, services, recruitment
│   └── (admin)/          dashboard, users, triage, finance, disputes, academy
├── components/
│   ├── ui/               Input, SeverityBadge, StatusSelect, VerificationBadge,
│   │                     ActivityBadge, DifficultyBadge, Toggle, Checkbox,
│   │                     ProgramTypeTag, RewardBox, ActionTag, Icon, AuthFormSkeleton,
│   │                     ToggleSwitch, SectionHeader, FormField, PillSwitcher,
│   │                     MarkdownEditor, RewardBoxBuilder, ScopeAssetRow
│   └── shared/           TopNavbar, HackerSidebar, StatCard,
│                         CompanySidebar, CompanyTopNavbar
├── lib/
│   ├── mock/             hackers.ts, reports.ts, academy.ts, wallet.ts, analytics.ts,
│   │                     company.ts
│   ├── utils/            cn.ts, format.ts, rtl.ts, cvss.ts
│   └── context/          NavContext.tsx
└── types/index.ts        ALL TypeScript interfaces
```

---

## 5. TypeScript Rules

- Strict mode ON — no `any`, no `unknown` without narrowing
- Every component has a named Props interface
- All mock data fully typed

### Core Types (in `src/types/index.ts`)
```typescript
type UserRole = 'hacker' | 'company' | 'developer' | 'user' | 'admin'
type ReportStatus = 'submitted' | 'triaged' | 'accepted' | 'rejected' | 'duplicate' |
                   'out_of_scope' | 'paid' | 'pending' | 'deleted' | 'draft'
type Severity = 'critical' | 'high' | 'medium' | 'low' | 'informational'
type ActionNeeded = 'add_details' | 'request_mediation' | 'verify_fix' |
                   'request_disclosure' | 'none'
type ActivityType = 'submitted' | 'triaged' | 'accepted' | 'rejected' | 'comment' |
                   'attachment' | 'severity_changed' | 'status_changed' |
                   'collaborator_added' | 'fix_requested' | 'fix_verified' | 'paid'
type ActorType = 'hacker' | 'company' | 'admin'
type CvssAttackVector = 'network' | 'adjacent' | 'local' | 'physical'
type CvssAttackComplexity = 'low' | 'high'
type CvssPrivilegesRequired = 'none' | 'low' | 'high'
type CvssUserInteraction = 'none' | 'required'
type CvssScope = 'unchanged' | 'changed'
type CvssCIAImpact = 'none' | 'low' | 'high'
// Company-specific
type CompanyProgramStatus = 'active' | 'paused' | 'draft' | 'archived'
type CompanyProgramType   = 'public' | 'private'
type RewardType           = 'bounty' | 'coin' | 'none'
```

---

## 6. Coding Rules

**Always:**
- Read Figma frame BEFORE writing the component
- Check `src/components/ui/` — reuse before creating
- Use `cn()` utility for conditional class merging
- Add mock data in `src/lib/mock/` so every page renders
- Every new page gets `loading.tsx` + `error.tsx`
- RTL-aware: use `ps-`/`pe-` (not `pl-`/`pr-`), `text-start`

**Never:**
- Hardcode hex colors or pixel values
- Use `any` type or inline styles (except dynamic values)
- Call real APIs
- Create a new UI primitive if one already exists

---

## 7. Key Patterns

### Dynamic page title (every portal page)
```tsx
'use client'
import { useEffect } from 'react'
import { useNav } from '@/lib/context/NavContext'
const { setTitle } = useNav()
useEffect(() => { setTitle('Page Name') }, [setTitle])
```

### Font classes
- `font-sans` → Plus Jakarta Sans (body)
- `font-arabic` → Cairo (Arabic)
- `font-righteous` → Righteous (logo ONLY)
- **NEVER** use `font-['Righteous:Regular',sans-serif]`

### Mock data imports
```typescript
import { mockHackerStats, mockHackerProfile } from '@/lib/mock/hackers'
import { mockHackerReports, mockReportDetail } from '@/lib/mock/reports'
import { mockAcademyCourses, mockCourseDetail } from '@/lib/mock/academy'
import { mockWalletStats, mockChartData } from '@/lib/mock/wallet'
import { mockAnalyticsStats, mockSkillRadar } from '@/lib/mock/analytics'
```

### Component pattern
```tsx
import { cn } from '@/lib/utils/cn'
interface MyComponentProps { data: MyType; className?: string }
export function MyComponent({ data, className }: MyComponentProps) {
  return <div className={cn('base-classes', className)}>{/* content */}</div>
}
```

---

## 8. Business Rules Summary

**Hacker:** Points Low=10/Med=20/High=30/Crit=40. KYC before withdrawal. Collab split must = 100%. Report autosave 30s to localStorage.

**Company:** Deposit before program activation. Triage actions need written justification. "Let us triage" → routes to Admin.

**Developer:** Manual admin review for activation. E-contract PDF auto-generated. Workroom unlocks after contract signed + escrow funded.

**Normal User:** Red line filter blocks offensive requests. HR pays coins to unlock hacker contact.

**Admin:** 5 roles (Super/Triage Specialist/Finance Officer/Content Editor/Support Agent). All actions immutably logged. 2FA mandatory. Auto-logout 15min idle.

---

## 9. Completed Phases ✅ (do NOT rebuild)

### Phase 1 — Design System
`src/app/globals.css` (@theme block, all tokens), `tailwind.config.ts`, `src/lib/design-tokens.ts`

### Phase 2 — UI Primitives (`src/components/ui/`)
`Input`, `SeverityBadge`, `StatusSelect`, `VerificationBadge`, `ActivityBadge`, `DifficultyBadge`, `Toggle`, `Checkbox`, `ProgramTypeTag`, `RewardBox`, `ActionTag`, `Icon`, `AuthFormSkeleton`

### Phase 3 — Auth Screens
login, forgot-password, verify-code, reset-password, password-updated, register, register/step-2, verify-email, verify-email/success

### Phase 4 — Hacker Foundation
`src/types/index.ts`, `NavContext.tsx`, `TopNavbar.tsx`, `HackerSidebar.tsx`, `hacker/layout.tsx`, `StatCard.tsx`, `hacker/dashboard/page.tsx`

### Phase 5 — Hacker Portal ✅ COMPLETE

All screens built, reviewed, and cleaned:
- **Dashboard** — stat cards, reputation snapshot, wallet summary, recent courses, action items
- **Programs** — list with search/filter; detail with tabs, scope, rewards, chat
- **Reports** — list with 8-col grid, filters, stat cards; submit form with CVSS calculator, markdown editor, file dropzone, 30s autosave; detail with timeline, syntax-highlighted code blocks, disclosure, response request
- **CyAcademy** — courses, subscriptions, gifts, certifications, internships + all detail pages
- **Leaderboard** — overall/country/monthly tabs
- **Wallet** — bank transfer + e-wallet tabs, working capital chart, transactions, card
- **Analytics** — skill radar, severity distribution, skill gap analysis, recommendations
- **Settings** — profile, security, notifications, KYC tabs

**Shared components added during cleanup (`src/components/ui/`):**
- `ToggleSwitch` — on/off toggle with `role="switch"` + `aria-checked`
- `SectionHeader` — title (text-h3 semibold) + optional subtitle (text-body-lg grey)
- `FormField` — label row (with optional red asterisk) + children slot
- `PillSwitcher` — generic `<T extends string>` tab switcher pill

**Mock data split into:**
- `src/lib/mock/hackers.ts` (266 lines) — profile, stats, programs, leaderboard, settings
- `src/lib/mock/reports.ts` (97 lines) — report list, report detail
- `src/lib/mock/academy.ts` (341 lines) — courses, subscriptions, gifts, certifications, internships
- `src/lib/mock/wallet.ts` (40 lines) — wallet stats, card, transactions, chart data
- `src/lib/mock/analytics.ts` (46 lines) — analytics stats, skill radar, severity, skill gaps, recommendations

**Utilities and editors added:**
- `src/lib/utils/cvss.ts` — full CVSS v3.1 score formula
- `src/components/ui/MarkdownEditor.tsx` — Write/Preview tab toggle (lives in `ui/`, not `shared/`)

**Packages added:** `react-markdown`, `react-syntax-highlighter`, `@types/react-syntax-highlighter`

---

## 10. Known Patterns — Do Not Repeat

Always use these instead of inline duplicates:

| Need | Component |
|------|-----------|
| Tab/pill switcher | `<PillSwitcher options={...} value={...} onChange={...} />` |
| Form field with label | `<FormField label="..." required>...</FormField>` |
| On/off toggle | `<ToggleSwitch checked={...} onChange={...} />` |
| Section title + subtitle | `<SectionHeader title="..." subtitle="..." />` |
| Severity badge | `<SeverityBadge severity="..." />` |
| Difficulty badge | `<DifficultyBadge difficulty="..." />` |
| Verification status | `<VerificationBadge status="..." />` |

---

## 11. Company Portal

Route prefix: `src/app/company/` — **no route-group parentheses**.

### Layout (`src/app/company/layout.tsx`)
- `'use client'`, wraps everything in `<NavProvider>`
- `<CompanySidebar />` fixed left 280px, `z-20`
- `<CompanyTopNavbar />` fixed top, `left-[280px] right-0 z-10`, 96px tall — reads title from NavContext
- `<main>` offset: `ml-[280px] mt-[96px] bg-auth-left-bg min-h-screen p-6`

### CompanySidebar nav items (in order)
| Icon | Label | href |
|------|-------|------|
| LayoutDashboard | Dashboard | /company/dashboard |
| Shield | Programs | /company/programs |
| Newspaper | Reports | /company/reports |
| UsersRound | Team management | /company/team |
| Grid2X2Check | Workspaces | /company/workspaces |
| WalletCards | Wallet | /company/wallet |
| Settings | Settings | /company/settings |
| MessageCircleQuestion | FAQ | /company/faq |

Programs sub-tree (vertical connector line + 2 sub-links) only shows when `pathname.startsWith('/company/programs')`.
Workspaces sub-tree (vertical connector line + Workspace 01 / Workspace 02) only shows when `pathname.startsWith('/company/workspaces')`.

### Completed company screens ✅
- `src/app/company/layout.tsx` + `CompanySidebar.tsx` + `CompanyTopNavbar.tsx`
- `src/app/company/dashboard/page.tsx` — stat cards, programs table, donut chart (recharts), line chart, recent reports table
- `src/app/company/faq/page.tsx` — FAQ accordion (icon + question + answer toggle) + contact support form (Name, E-mail, Message, Attachments)
- `src/app/company/programs/page.tsx` — programs table with search/filter (by status + type), "Create a program" CTA, per-row action buttons (View Program / Edit / Archived); + `loading.tsx` + `error.tsx`
- `src/app/company/programs/create/page.tsx` — 6-step wizard (Program Details → Scope Setup → Reward System Setup → Policy Setup → Budget Setup → Review & Publish); step indicator pills, `ScopeAssetRow` list, `RewardBoxBuilder` overlay; + `loading.tsx` + `error.tsx`
  - Scope Setup step has two subsections separated by `<hr>`: **In scope** (bound to `draft.inScope[]`) and **Out of scope** (bound to `draft.outScope[]`), both using `ScopeAssetRow`; TODO comment left for paid/unpaid scope toggle per SRS
  - On "Publish program" click (step 6): generates `newId = 'p${Date.now()}'`, writes both `sessionStorage('programDraftPendingId', newId)` and `sessionStorage('programDraft', JSON.stringify(draft))`, then navigates to `/company/programs/${newId}`
- `src/app/company/programs/[id]/page.tsx` — two-mode page (draft mode + view mode); + `loading.tsx` + `error.tsx`
  - **Draft mode** (newly created): on mount, checks `sessionStorage('programDraftPendingId') === id` AND `sessionStorage('programDraft')` → if match, renders full `ProgramDraft` preview: Overview card, In Scope / Out of Scope tables, Reward Box cards, Policy sections, safe harbor notice, legal agreement Checkbox, "Back to Edit" + "Publish program" buttons. On publish: `mockCompanyPrograms.push(newProgram)` + clear both sessionStorage keys + redirect to `/company/programs`
  - **View mode** (existing programs): finds program in `mockCompanyPrograms` by `id` → shows basic program fields (name, type, status, budget, monthlyBudget) + "Back to Programs" button; if not found, `router.replace('/company/programs')`
  - `letUsTriage = true` → new program status `'paused'`, otherwise `'active'`
  - **sessionStorage hand-off pattern**: create page writes draft + pending ID → `[id]` page reads on mount; "Back to Edit" navigates to `/company/programs/create` but React state on create page resets to empty
- `src/app/company/workspaces/page.tsx` — header + "New workspace" button (opens CreateWorkspaceModal), 4 stat cards (Workspaces/Team members/Critical issues/Total findings), list of workspace cards (name + ProgramTypeTag + findings count + description + severity counts + "View workspace" link); + `loading.tsx` + `error.tsx`
- `src/components/company/CreateWorkspaceModal.tsx` — two-view modal (create / user-not-found); create view: workspace name Input, category select (native select + custom visual overlay), team search field, member list with Checkbox per row; user-not-found view: TriangleAlert + title + subtitle + "Invite user" no-op; Escape key + backdrop click closes; state resets on close
- `src/app/company/workspaces/[workspaceId]/page.tsx` — dynamic workspace detail; 4 stat cards (New/Triaged/In review/Resolved), search toolbar + Status + Sort-by pills, two-column layout: left = reports table (title + ExternalLink + ReportStatusBadge + researcher + SeverityBadge + date) with client-side title search, right = members panel (avatar initials + name + role + UserRoundMinus no-op); UserRoundPlus opens CreateWorkspaceModal; unknown workspaceId redirects to /company/workspaces; + `loading.tsx` + `error.tsx`
  - `CompanySidebar` updated: adds workspace sub-tree (Workspace 01 / Workspace 02) when pathname starts with `/company/workspaces`
- `src/app/company/workspaces/[workspaceId]/reports/[reportId]/page.tsx` — report detail viewed by company; nav title = report ID from mock; 7 sections:
  1. **Report header card** — back ChevronLeft + reportId text-[26px], title text-[32px], SeverityBadge + ReportStatusBadge, divider, meta row (Hash/CalendarDays/UserRound icons + report ID / submitted date / hacker name)
  2. **Vulnerability details card** — two-column read-only boxes (Vuln type + Affected asset), Description h-[147px], Steps to reproduce h-[312px], Expected results (custom CodeBlock: white line-numbers panel + bg-secondary-50 code area, Prism SyntaxHighlighter oneLight style), Impact h-[169px], Recommendations h-[275px]
  3. **Attachments & Proof of concept card** — file cards (border-[rgba(0,59,223,0.66)] rounded-[10px] w-[426px] h-[140px]) with File icon + filename + Preview/Download no-op buttons
  4. **Collaborators card** — avatar initials circles size-[85px] + username–percentage + role label; gap-[95px] between collaborators
  5. **Activity card** — timeline with vertical connecting lines (absolute `start-9 top-[72px] h-[calc(100%-32px)]`); size-[72px] avatars; status-change entries show ReportStatusBadge inline; message entries show bordered bubble; message composer textarea h-[170px] + "Send message" button (mock no-op)
  6. **Report decisions card** — Triage controls (severity dropdown + reward input + CVSS Checkbox); Action Buttons (5: CirclePlay/CircleCheckBig/CircleX/BadgeInfo/CopyCheck) each opens ActionExplanationModal with the action name
  7. **Internal messages card** — "This section is not visible to the hacker" subtitle; textarea h-[127px] + "To: Everyone" visual selector (top-right absolute) + "Send message" button (mock no-op)
  + `loading.tsx` + `error.tsx`
- `src/components/company/ActionExplanationModal.tsx` — triggered by report decision action buttons; props `{ isOpen, onClose, actionName }`; action color: Approve & pay → text-[#4ade80], Reject → text-[#f43f5d], others → text-[#fbbe24]; textarea h-[132px] for reason; Cancel (bg-[#85a0b2]) + Confirm action (bg-primary-500) buttons; Escape key closes

### New types added (programs page)
- `CompanyProgramType = 'public' | 'private'` in `src/types/index.ts`
- `CompanyProgramStatus` extended with `'archived'`
- `CompanyProgram` interface extended: `type: CompanyProgramType`, `budget: number` (was string), `monthlyBudget: number`, `createdAt: string`

### New types added (create program page)
- `RewardType = 'bounty' | 'coin' | 'none'`
- `RewardBoxRow { severity, rewardType, min, max }`
- `RewardBox { id, name, rows: RewardBoxRow[] }`
- `ScopeAsset { id, name, type, maxImpact, environment, rewardBoxId }`
- `ProgramPolicy { safeHarbor, submissionRules, disclosureGuidelines, nonEligible }`
- `ProgramBudget { total, monthlyCap, noMonthlyLimit, autoPause }`
- `ProgramDraft { name, description, type, inScope, outScope, rewardBoxes, policy, budget, letUsTriage, agreedToTerms }`

### New UI primitives (create program page)
- `src/components/ui/RewardBoxBuilder.tsx` — reward box customization panel; props: `value: RewardBox, onChange, onCancel, onSave`; exports `defaultRewardBox()` factory
- `src/components/ui/ScopeAssetRow.tsx` — editable scope asset card; props: `value: ScopeAsset, onChange, onRemove, rewardBoxes, onCreateBox`

### New types added (workspaces hub)
- `RemediationWorkspace { id, name, type: 'web'|'cloud'|'mobile', description, totalFindings, severityCounts: { critical, high, medium, low } }` in `src/types/index.ts`
- `RemediationStats { workspaces, teamMembers, criticalIssues, totalFindings }` in `src/types/index.ts`

### New types added (workspace detail)
- `WorkspaceReportStatus = 'new' | 'triaged' | 'in_review' | 'resolved'` in `src/types/index.ts`
- `WorkspaceReport { id, title, status: WorkspaceReportStatus, researcher, severity: Severity, date }` in `src/types/index.ts`
- `WorkspaceMember { id, name, role, initials }` in `src/types/index.ts`
- `WorkspaceDetail { id, name, stats: { newReports, triaged, inReview, resolved }, reports: WorkspaceReport[], members: WorkspaceMember[] }` in `src/types/index.ts`

### New types added (workspace report detail)
- `WorkspaceCollaborator { username, percentage, role: 'collaborator' | 'creator' }` in `src/types/index.ts`
- `WorkspaceActivityEntry { id, actorName, actorType, action, timestamp, message?, statusChange? }` in `src/types/index.ts`
- `WorkspaceReportDetail extends WorkspaceReport` — adds `reportId, submittedDate, hackerName, vulnerabilityType, affectedAsset, description, stepsToReproduce, expectedResults, impact, recommendations, attachments[], collaborators[], activity[], rewardAmount` in `src/types/index.ts`

### Mock data
- `src/lib/mock/company.ts` — `CompanyStats`, `CompanyProgram[]` (7 rows, all statuses covered), `CompanyReport[]`, `VulnTypeData[]`, `TrendDataPoint[]`, `mockRemediationStats`, `mockRemediationWorkspaces[]` (4 entries: cloud/mobile/web/mobile), `mockTeamMembers[]` (4 entries: Team lead / Security researcher / Developer / Team lead) + `TeamMember` interface, `mockWorkspaceDetails[]` (2 entries: ws1 "Workspace 01" + ws2 "Workspace 02", each with 10 reports + 5 members), `mockWorkspaceReportDetail` (1 fully populated entry: SQL Injection report, id r01, 2 attachments, 3 collaborators, 4 activity entries)

---

## 12. Next Portal to Build

TBD — developer or admin portal (owner to decide).

When building any new portal, follow this pattern:
1. Read all Figma screens for that portal
2. Add types to `src/types/index.ts`
3. Create mock data in `src/lib/mock/[portal].ts`
4. Build layout (sidebar + navbar variant)
5. Build screens one by one, each with `loading.tsx` + `error.tsx`
6. Run cleanup pass: `npx tsc --noEmit` → `npx eslint src` → `npx next build`
7. Check if the component was already built in the hacker portal first — reuse if so
