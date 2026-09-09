# CyberKemet.com — Egypt Cyber Platform
## Claude Code Master Instructions

---

## 1. Project Overview

**CyberKemet.com** is a multi-portal cybersecurity Bug Bounty & Security Services platform for Egypt.
It connects Hackers, Companies, Developers, Normal Users, and Admins in one ecosystem.

- **Frontend:** Next.js 16 (App Router), TypeScript (strict), Tailwind CSS
- **Backend:** Laravel (not built yet — use mock data for all API calls)
- **Language support:** Arabic (RTL) + English (LTR)
- **Default theme:** Light mode

---

## 2. Figma Source of Truth

| Resource | URL |
|----------|-----|
| Full Figma File | https://www.figma.com/design/A4Dc2JnyBcpLIXsFx0yEnr/CyKemet.com |
| Design System Page | Page name: **"Design system"** |
| Hacker Dashboard | Page name: **"Hacker Dashboard"** |
| Company Dashboard | Page name: **"Company Dashboard"** |
| Admin Dashboard | Page name: **"Admin Dashboard"** |
| Main User Dashboard | Page name: **"Main User Dashboard"** |
| Developer Dashboard | Page name: **"Developer Dashboard"** |

### Figma Working Rules
- **ALWAYS** read the Figma frame before writing any component or page
- The **"Design system"** page is the single source of truth for all tokens
- Read the **Typography** frame for font rules
- Read the **primary / secondary / background / error / success / warning / tint** color frames
- Read the **palette** frame for the full color scale
- Read the **components** section for base UI component specs
- Read the **Icons** frame to know which icon set is used
- When reading a screen, also read its **component instances** to understand reused patterns
- Never guess a color, spacing, or font — always verify in Figma first

---

## 3. Design System Rules

### 3.1 Token Usage
- **NEVER** hardcode hex colors, pixel values, or font sizes
- **ALWAYS** use named tokens from `tailwind.config.ts`
- Token naming convention: `colors.primary.DEFAULT`, `colors.bg.card`, `colors.status.critical`, etc.
- Spacing follows Tailwind scale mapped to Figma's grid system
- Border radius values come from Figma — use named tokens (e.g. `rounded-card`, `rounded-btn`)

### 3.2 Color System (extract exact values from Figma "Design system" page)
```
Primary colors     → tailwind: colors.primary.*
Secondary colors   → tailwind: colors.secondary.*
Background colors  → tailwind: colors.bg.*
Error colors       → tailwind: colors.error.*
Success colors     → tailwind: colors.success.*
Warning colors     → tailwind: colors.warning.*
Tint colors        → tailwind: colors.tint.*
Palette scale      → tailwind: colors.gray.*, colors.blue.*, etc.
```

### 3.3 Typography (extract exact values from Figma "Typography" frame)
```
Font family        → var(--font-primary), var(--font-arabic)
Heading sizes      → text-h1, text-h2, text-h3, text-h4
Body sizes         → text-body-lg, text-body-md, text-body-sm
Label sizes        → text-label-lg, text-label-sm
Caption            → text-caption
```

### 3.4 Iconography
- Extract the icon set name from the Figma "Icons" frame
- All icons imported from a single source (e.g. `lucide-react` or a custom set)
- Icon sizes: `sm=16px`, `md=20px`, `lg=24px`, `xl=32px`
- Never use emoji as icons

### 3.5 Responsive Breakpoints
```
Mobile first — default styles are mobile
sm: 640px   → tablet portrait
md: 768px   → tablet landscape
lg: 1024px  → desktop
xl: 1280px  → wide desktop
```

---

## 4. Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── verify/page.tsx
│   ├── (hacker)/
│   │   ├── layout.tsx              ← hacker sidebar + navbar
│   │   ├── dashboard/page.tsx
│   │   ├── programs/
│   │   │   ├── page.tsx            ← program list
│   │   │   └── [id]/page.tsx       ← program detail
│   │   ├── reports/
│   │   │   ├── page.tsx            ← my reports list
│   │   │   ├── new/page.tsx        ← submit report
│   │   │   └── [id]/page.tsx       ← report lifecycle
│   │   ├── academy/
│   │   │   ├── page.tsx
│   │   │   ├── courses/page.tsx
│   │   │   ├── subscriptions/page.tsx
│   │   │   ├── certifications/page.tsx
│   │   │   ├── gifts/page.tsx
│   │   │   └── internships/page.tsx
│   │   ├── leaderboard/page.tsx
│   │   ├── wallet/page.tsx
│   │   └── analytics/page.tsx
│   ├── (company)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── programs/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       ├── scope/page.tsx
│   │   │       ├── policies/page.tsx
│   │   │       ├── reports/page.tsx
│   │   │       └── budget/page.tsx
│   │   ├── triage/
│   │   │   ├── page.tsx            ← central inbox
│   │   │   └── [reportId]/page.tsx ← triage workspace
│   │   ├── remediation/
│   │   │   ├── page.tsx
│   │   │   └── [taskId]/page.tsx
│   │   ├── finance/page.tsx
│   │   ├── reports/page.tsx
│   │   └── settings/page.tsx
│   ├── (developer)/
│   │   ├── layout.tsx
│   │   ├── marketplace/page.tsx
│   │   ├── contracts/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── workroom/[taskId]/page.tsx
│   │   └── wallet/page.tsx
│   ├── (user)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── recruitment/
│   │       ├── page.tsx
│   │       └── [hackerId]/page.tsx
│   └── (admin)/
│       ├── layout.tsx
│       ├── dashboard/page.tsx
│       ├── users/page.tsx
│       ├── triage/
│       │   ├── page.tsx
│       │   └── [reportId]/page.tsx
│       ├── finance/page.tsx
│       ├── disputes/page.tsx
│       ├── academy/page.tsx
│       ├── fraud/page.tsx
│       ├── marketing/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── ui/                         ← PRIMITIVES (no business logic)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Avatar.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Tabs.tsx
│   │   ├── Table.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Toast.tsx
│   │   ├── Spinner.tsx
│   │   ├── ProgressBar.tsx
│   │   └── index.ts                ← barrel export
│   ├── shared/                     ← CROSS-PORTAL COMPONENTS
│   │   ├── Sidebar.tsx
│   │   ├── TopNavbar.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── WalletCard.tsx
│   │   ├── StatusBadge.tsx         ← New/Triaged/Accepted/Paid/Rejected
│   │   ├── SeverityBadge.tsx       ← Critical/High/Medium/Low
│   │   ├── FileUpload.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── EmptyState.tsx
│   │   ├── PageHeader.tsx
│   │   └── ConfirmDialog.tsx
│   ├── hacker/
│   │   ├── CVSSCalculator.tsx
│   │   ├── ReportCard.tsx
│   │   ├── ProgramCard.tsx
│   │   ├── ReportTimeline.tsx
│   │   ├── SkillRadar.tsx
│   │   └── LeaderboardTable.tsx
│   ├── company/
│   │   ├── ProgramWizard.tsx
│   │   ├── ScopeManager.tsx
│   │   ├── RewardBox.tsx
│   │   ├── TriageWorkspace.tsx
│   │   └── BudgetTracker.tsx
│   ├── developer/
│   │   ├── JobCard.tsx
│   │   ├── BidForm.tsx
│   │   ├── EContractViewer.tsx
│   │   └── WorkroomChat.tsx
│   ├── user/
│   │   ├── ServiceCard.tsx
│   │   ├── TalentCard.tsx
│   │   └── SkillReportCard.tsx
│   └── admin/
│       ├── KYCCard.tsx
│       ├── TriageAssignment.tsx
│       ├── FraudAlert.tsx
│       └── RevenueChart.tsx
├── lib/
│   ├── mock/                       ← ALL MOCK DATA (JSON + typed)
│   │   ├── hackers.ts
│   │   ├── companies.ts
│   │   ├── programs.ts
│   │   ├── reports.ts
│   │   ├── developers.ts
│   │   ├── users.ts
│   │   ├── academy.ts
│   │   └── admin.ts
│   ├── utils/
│   │   ├── cn.ts                   ← clsx + tailwind-merge helper
│   │   ├── format.ts               ← dates, currency, numbers
│   │   └── rtl.ts                  ← RTL/LTR helpers
│   └── constants/
│       ├── routes.ts               ← all route constants
│       ├── severity.ts             ← CVSS severity levels
│       └── roles.ts                ← user role constants
├── types/
│   └── index.ts                    ← ALL TypeScript interfaces
├── hooks/
│   ├── useAuth.ts
│   ├── useWallet.ts
│   ├── useChat.ts
│   └── useFilters.ts
└── styles/
    └── globals.css
```

---

## 5. TypeScript Rules

- **Strict mode ON** — no `any`, no `unknown` without narrowing
- Every component has a named `Props` interface exported above the component
- Every API response shape has a typed interface in `src/types/index.ts`
- All mock data is fully typed — no implicit types
- Use `type` for unions/intersections, `interface` for object shapes

### Key Type Definitions (in `src/types/index.ts`)

```typescript
// User roles
type UserRole = 'hacker' | 'company' | 'developer' | 'user' | 'admin'

// Report lifecycle
type ReportStatus = 'new' | 'triaged' | 'accepted' | 'rejected' | 'duplicate' | 'out_of_scope' | 'paid'

// Severity levels
type Severity = 'critical' | 'high' | 'medium' | 'low' | 'informational'

// Wallet
type TransactionStatus = 'pending' | 'available' | 'withdrawn'

// Program types
type ProgramType = 'public' | 'private' | 'vdp'

// Developer vetting
type VettingStatus = 'pending' | 'vetted' | 'rejected'

// KYC
type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
```

---

## 6. Coding Rules (Non-Negotiable)

### Always
- ✅ Read Figma frame **before** writing the component
- ✅ Check `src/components/ui/` — reuse before creating
- ✅ Use `cn()` utility for conditional class merging
- ✅ Use design tokens from `tailwind.config.ts` only
- ✅ Add mock data in `src/lib/mock/` so every page renders
- ✅ Mobile-first responsive layout
- ✅ RTL-aware (`dir="rtl"` support, logical CSS properties)
- ✅ Every new page gets a loading state (`loading.tsx`) and error state (`error.tsx`)
- ✅ Commit after each completed screen

### Never
- ❌ Hardcode hex colors: `#1a2b3c` → use `bg-primary` or `text-bg-card`
- ❌ Hardcode pixel values: `style={{ width: '320px' }}` → use Tailwind classes
- ❌ Use `any` type
- ❌ Inline styles (except for dynamic values that can't be in Tailwind)
- ❌ Call real APIs (backend doesn't exist yet — use mock data)
- ❌ Create a new UI primitive if one already exists in `src/components/ui/`
- ❌ Skip TypeScript interfaces for props

---

## 7. Component Writing Pattern

Every component must follow this structure:

```tsx
// src/components/hacker/ReportCard.tsx

import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui'
import type { BugReport } from '@/types'

interface ReportCardProps {
  report: BugReport
  onClick?: (id: string) => void
  className?: string
}

export function ReportCard({ report, onClick, className }: ReportCardProps) {
  return (
    <div
      className={cn(
        'bg-bg-card rounded-card border border-bg-border p-4 cursor-pointer',
        'hover:border-primary transition-colors duration-200',
        className
      )}
      onClick={() => onClick?.(report.id)}
    >
      {/* component content */}
    </div>
  )
}
```

---

## 8. Mock Data Pattern

```typescript
// src/lib/mock/reports.ts
import type { BugReport } from '@/types'

export const mockReports: BugReport[] = [
  {
    id: 'RPT-001',
    title: 'SQL Injection in login endpoint',
    severity: 'critical',
    status: 'accepted',
    program: 'Vodafone Egypt',
    submittedAt: '2025-02-15T10:30:00Z',
    reward: 5000,
    // ...
  },
]
```

---

## 9. Portal-Specific Business Rules

### Hacker Portal
- Points: Low=10, Medium=20, High=30, Critical=40
- Ranks: based on cumulative points (read from Figma leaderboard screen)
- KYC required before any withdrawal
- `Open to Hiring` toggle controls visibility in talent search
- Collaboration: split bounty % must add up to 100%
- Report autosave every 30 seconds to localStorage

### Company Portal
- Must deposit budget before activating a program
- `Let us do the triage for you` checkbox → routes to Admin triage team
- Reward box: each severity has reward type (bounty/coin/none) + min/max range
- All triage actions require a written justification (shown to hacker)
- Fix validation: Confirm Fix & Pay OR Re-Open Task

### Developer Portal
- Account activation requires manual admin review (not instant)
- E-contract auto-generated as PDF after company accepts bid
- Secure workroom only unlocks after: contract signed + escrow funded
- Platform fee deducted automatically on payment release

### Normal User Portal
- "Red line" filter: block offensive service requests (keyword filter)
- Account recovery services: payment for effort, not guaranteed results
- HR recruiter: pays coins to unlock hacker contact info
- Verified Skill Report: purchasable PDF with hacker's real performance data

### Admin Portal
- Super Admin: full access
- Triage Specialist: reports and disputes only
- Finance Officer: invoices and withdrawals only
- Content Editor: academy and blog only
- Support Agent: user data and SOS only
- All admin actions logged immutably (who, what, when)
- Auto-logout after 15 minutes idle
- 2FA mandatory for all admin accounts

---

## 10. Implementation Order

Follow this exact order — do NOT skip ahead:

| Phase | What to build | Why |
|-------|--------------|-----|
| 1 | Design system → `tailwind.config.ts` + `globals.css` | Foundation for everything |
| 2 | TypeScript interfaces → `src/types/index.ts` | Needed before any component |
| 3 | UI primitives → `src/components/ui/` | Reused across all portals |
| 4 | Shared components → `src/components/shared/` | Reused across portals |
| 5 | Auth screens (login, register, verify) | Entry point for all portals |
| 6 | Hacker portal — all screens | Most complete in Figma |
| 7 | Company portal — all screens | Second most complete |
| 8 | Admin portal — all screens | Depends on company triage |
| 9 | Developer portal — all screens | |
| 10 | Normal User portal — all screens | |

---

## 11. Screen-by-Screen Prompt Template

Use this exact prompt for every screen in VS Code:

```
Read CLAUDE.md first.

Read this Figma frame: [PASTE FRAME URL HERE]

Convert it to a production Next.js page/component:
1. Match the design pixel-perfectly
2. Use ONLY tokens from tailwind.config.ts
3. Use ONLY existing components from src/components/ui/ and src/components/shared/
4. Add TypeScript interfaces to src/types/index.ts if new types are needed
5. Create mock data in src/lib/mock/ if needed
6. Save to the correct path in src/app/ or src/components/
7. After generating, tell me: any new reusable components I should extract?
```

---

## 12. Git Commit Convention

```
feat(hacker): add report submission page
feat(company): add program creation wizard
feat(ui): add CVSSCalculator component
fix(hacker): fix RTL layout in sidebar
chore: update tailwind tokens from design system
```

---

## 13. RTL / Bilingual Rules

- All layouts use CSS logical properties: `ps-` / `pe-` instead of `pl-` / `pr-`
- `dir` attribute set at layout level per portal (Arabic portals = RTL)
- Arabic font loaded separately in `globals.css`
- All user-facing strings go in `src/lib/constants/strings.ts` (no hardcoded Arabic/English text in components)
- Text alignment: `text-start` not `text-left`

---

## 14. When You're Stuck

1. Re-read the relevant Figma frame — the answer is usually there
2. Check `src/types/index.ts` for the correct data shape
3. Check `src/components/ui/` before creating something new
4. If a Figma frame is unclear, build the most logical interpretation and add a `// TODO: verify with designer` comment

---

## 15. Completed Phases (do not rebuild these)

### ✅ Phase 1 — Design System
- `src/app/globals.css` — `@theme {}` block with all tokens (Tailwind v4)
- `tailwind.config.ts` — minimal v4 config
- `src/lib/design-tokens.ts` — typed constants

### ✅ Phase 2 — UI Primitives (`src/components/ui/`)
`Input`, `SeverityBadge`, `StatusSelect`, `VerificationBadge`, `ActivityBadge`,
`DifficultyBadge`, `Toggle`, `Checkbox`, `ProgramTypeTag`, `RewardBox`, `ActionTag`,
`Icon`, `AuthFormSkeleton` — all exported from `index.ts`

### ✅ Phase 3 — Auth Screens (`src/app/(auth)/`)
`layout.tsx`, `login`, `forgot-password`, `verify-code`, `reset-password`,
`password-updated`, `register`, `register/step-2`, `verify-email`,
`verify-email/success` — all with `loading.tsx` + `error.tsx`

### ✅ Phase 4 — Hacker Foundation
- `src/types/index.ts` — all TypeScript interfaces
- `src/lib/context/NavContext.tsx` — dynamic page title context
- `src/lib/mock/hackers.ts` — dashboard mock data
- `src/components/shared/TopNavbar.tsx`
- `src/components/shared/HackerSidebar.tsx`
- `src/app/(hacker)/layout.tsx`
- `src/components/hacker/StatCard.tsx`
- `src/app/(hacker)/dashboard/page.tsx` ✅

### ✅ Phase 5 — Hacker Screens (in progress)
- `src/app/(hacker)/programs/page.tsx` — Programs list with ProgramCard + search/filter
- `src/app/(hacker)/programs/[id]/page.tsx` — Program overview with tabs, scope, rewards, chat
- `src/app/(hacker)/reports/page.tsx` — Reports list with table, filters, stat cards
- `src/app/(hacker)/reports/new/page.tsx` — Submit report with CVSS calculator, file dropzone, autosave
  - `src/lib/utils/cvss.ts` — CVSS v3.1 base score formula
- `src/app/(hacker)/reports/[id]/page.tsx` — Report detail with timeline, messages, actions

---

## 16. Font Setup (IMPORTANT)
Fonts are loaded via `next/font/google` in `src/app/layout.tsx`:
- **Plus Jakarta Sans** → CSS var: `--font-jakarta` → Tailwind: `font-sans`
- **Cairo** (Arabic) → CSS var: `--font-cairo` → Tailwind: `font-arabic`
- **Righteous** (logo only) → CSS var: `--font-righteous` → class: `font-righteous`

To use Righteous font: `className="font-righteous"`
**NEVER** use `font-['Righteous:Regular',sans-serif]` — use `font-righteous` instead

---

## 17. Known Patterns Established

### Dynamic page title
Every hacker page must call `useNav()` to set the title:
```tsx
'use client'
import { useEffect } from 'react'
import { useNav } from '@/lib/context/NavContext'

const { setTitle } = useNav()
useEffect(() => { setTitle('Page Name') }, [setTitle])
```

### Mock data location
All mock data in `src/lib/mock/[portal].ts`
Import pattern: `import { mockHackerStats } from '@/lib/mock/hackers'`

### Next hacker screens to build (in order):
1. Academy → `src/app/(hacker)/academy/page.tsx`
2. Leaderboard → `src/app/(hacker)/leaderboard/page.tsx`
3. Wallet → `src/app/(hacker)/wallet/page.tsx`
4. Analytics → `src/app/(hacker)/analytics/page.tsx`
5. Settings → `src/app/(hacker)/settings/page.tsx`
