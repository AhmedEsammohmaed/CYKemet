'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Grid2X2Check, UsersRound, TriangleAlert, Bug, Dot } from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { ProgramTypeTag } from '@/components/ui/ProgramTypeTag'
import { CreateWorkspaceModal } from '@/components/company/CreateWorkspaceModal'
import { mockRemediationStats, mockRemediationWorkspaces } from '@/lib/mock/company'
import type { RemediationWorkspace } from '@/types'

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: number
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="flex-1 bg-white rounded-card h-[84px] flex items-center justify-center gap-[11px] px-9 py-[18px]">
      <div className="size-[70px] rounded-[35px] bg-secondary-50 flex items-center justify-center shrink-0">
        <Icon size={28} className="text-primary-500" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-body-md text-grey-main">{label}</p>
        <p className="font-bold text-h1 text-black">{value}</p>
      </div>
    </div>
  )
}

// ─── Workspace Card ───────────────────────────────────────────────────────────

interface WorkspaceCardProps {
  workspace: RemediationWorkspace
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const { id, name, type, description, totalFindings, severityCounts } = workspace
  return (
    <div className="bg-white rounded-card p-[22px] h-[143px] flex items-center justify-between gap-[62px]">
      {/* Left block */}
      <div className="flex flex-col gap-5 w-[732px]">
        <div className="flex flex-col gap-2">
          {/* Row 1: name + type tag + findings */}
          <div className="flex items-center gap-6">
            <span className="font-semibold text-h3 text-black whitespace-nowrap">{name}</span>
            <ProgramTypeTag type={type} />
            <div className="flex items-center">
              <Dot size={28} className="text-grey-main" />
              <span className="font-medium text-h5 text-grey-main">{totalFindings} Findings</span>
            </div>
          </div>
          {/* Row 2: description */}
          <p className="font-medium text-h5 text-grey-main">{description}</p>
        </div>
        {/* Row 3: severity counts */}
        <div className="flex items-center gap-5">
          <span className="font-medium text-body-md text-severity-critical">{severityCounts.critical} Critical</span>
          <span className="font-medium text-body-md text-severity-high">{severityCounts.high} High</span>
          <span className="font-medium text-body-md text-severity-medium">{severityCounts.medium} Medium</span>
          <span className="font-medium text-body-md text-severity-low">{severityCounts.low} Low</span>
        </div>
      </div>
      {/* View workspace button — workspace detail page not yet built */}
      <Link
        href={`/company/workspaces/${id}`}
        className="h-[60px] w-[227px] bg-primary-500 text-white rounded-card font-medium text-h3 flex items-center justify-center shrink-0"
      >
        View workspace
      </Link>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RemediationPage() {
  const { setTitle } = useNav()
  useEffect(() => { setTitle('Workspace') }, [setTitle])
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <CreateWorkspaceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-h3 text-black">Your security triage workspace</h1>
          <p className="font-normal text-body-lg text-grey-main max-w-[639px]">
            Review, prioritize, and resolve vulnerability reports submitted by security researchers
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="h-[60px] w-[227px] bg-primary-500 text-white rounded-card font-medium text-h3 shrink-0"
        >
          New workspace
        </button>
      </div>

      {/* Stat cards */}
      <div className="flex gap-6">
        <StatCard icon={Grid2X2Check}  label="Workspaces"     value={mockRemediationStats.workspaces} />
        <StatCard icon={UsersRound}    label="Team members"   value={mockRemediationStats.teamMembers} />
        <StatCard icon={TriangleAlert} label="Critical issues" value={mockRemediationStats.criticalIssues} />
        <StatCard icon={Bug}           label="Total findings"  value={mockRemediationStats.totalFindings} />
      </div>

      {/* Workspace cards */}
      <div className="flex flex-col gap-8">
        {mockRemediationWorkspaces.map((ws) => (
          <WorkspaceCard key={ws.id} workspace={ws} />
        ))}
      </div>
    </div>
  )
}
