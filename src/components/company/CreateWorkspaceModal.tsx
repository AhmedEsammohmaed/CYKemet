'use client'

import { useEffect, useState } from 'react'
import { Search, ChevronDown, TriangleAlert } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { cn } from '@/lib/utils/cn'
import { mockTeamMembers } from '@/lib/mock/company'

export interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
}

type Category = 'web' | 'cloud' | 'mobile'

// ─── Shared button style ───────────────────────────────────────────────────────

const primaryBtnCls =
  'w-full h-[60px] bg-primary-500 text-white rounded-card font-medium text-h3 flex items-center justify-center'

// ─── Field label ──────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-medium text-h5 text-content-500">{children}</p>
  )
}

// ─── Category select ──────────────────────────────────────────────────────────

interface CategorySelectProps {
  value: Category
  onChange: (v: Category) => void
}

function CategorySelect({ value, onChange }: CategorySelectProps) {
  const labels: Record<Category, string> = { web: 'Web', cloud: 'Cloud', mobile: 'Mobile' }
  return (
    <div className="relative w-full h-[60px]">
      {/* Visual layer */}
      <div className="w-full h-full border border-grey-main rounded-card px-8 flex items-center justify-between pointer-events-none">
        <span className="font-normal text-body-lg text-grey-main">{labels[value]}</span>
        <ChevronDown size={16} className="text-grey-main" />
      </div>
      {/* Native select — invisible but interactive */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Category)}
        className="absolute inset-0 opacity-0 cursor-pointer w-full"
        aria-label="Category"
      >
        <option value="web">Web</option>
        <option value="cloud">Cloud</option>
        <option value="mobile">Mobile</option>
      </select>
    </div>
  )
}

// ─── Create view ──────────────────────────────────────────────────────────────

interface CreateViewProps {
  workspaceName: string
  setWorkspaceName: (v: string) => void
  category: Category
  setCategory: (v: Category) => void
  searchQuery: string
  setSearchQuery: (v: string) => void
  selectedMembers: Set<string>
  toggleMember: (id: string, checked: boolean) => void
  onClose: () => void
}

function CreateView({
  workspaceName, setWorkspaceName,
  category, setCategory,
  searchQuery, setSearchQuery,
  selectedMembers, toggleMember,
  onClose,
}: CreateViewProps) {
  const filteredMembers = mockTeamMembers.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-8 pt-8 pb-9 px-8">
      {/* Title */}
      <p className="font-semibold text-h3 text-content-500">Create new workspace</p>

      <div className="flex flex-col gap-8">
        {/* Workspace name */}
        <div className="flex flex-col gap-6">
          <FieldLabel>Workspace name</FieldLabel>
          <Input
            placeholder="e.g., Cloud security"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="px-8 border-grey-main"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-6">
          <FieldLabel>Category</FieldLabel>
          <CategorySelect value={category} onChange={setCategory} />
        </div>
      </div>

      {/* Team access management */}
      <p className="font-medium text-h5 text-content-500">Team access management</p>

      <div className="flex flex-col gap-8">
        {/* Search field */}
        <div className="flex items-center gap-1.5 h-[46px] px-4 rounded-[10px] bg-grey-main/10">
          <Search size={18} className="text-grey-main shrink-0" />
          <input
            type="text"
            placeholder="Search a team member who can access the workspace"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-body-lg text-content-500 placeholder:text-grey-main font-normal"
          />
        </div>

        {/* Member list */}
        <div className="flex flex-col gap-8">
          {filteredMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <span className="font-medium text-body-lg text-content-500">
                {member.name} ({member.role})
              </span>
              <Checkbox
                checked={selectedMembers.has(member.id)}
                onChange={(checked) => toggleMember(member.id, checked)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Create workspace button — mock success: closes modal */}
      <button type="button" onClick={onClose} className={primaryBtnCls}>
        Create workspace
      </button>
    </div>
  )
}

// ─── User not found view ──────────────────────────────────────────────────────

function UserNotFoundView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-center px-[84px] py-[64px]">
      <div className="flex flex-col gap-8 items-center w-full">
        {/* Icon + title */}
        <div className="flex flex-col gap-1 items-center">
          <div className="flex items-center gap-1.5">
            <TriangleAlert size={50} className="text-primary-500 shrink-0" />
            <span
              className={cn(
                'font-extrabold text-[36px] text-primary-500 text-center leading-[50px]'
              )}
            >
              User is not on CyKemet yet!
            </span>
          </div>
          <p className="font-normal text-h4 text-primary-500 text-center leading-[1.8]">
            Invite them to join CyKemet first so they can create an account and access your workspace
          </p>
        </div>

        {/* Invite user button — mock no-op */}
        <button type="button" onClick={onClose} className={cn(primaryBtnCls)}>
          Invite user
        </button>
      </div>
    </div>
  )
}

// ─── Modal shell ──────────────────────────────────────────────────────────────

export function CreateWorkspaceModal({ isOpen, onClose }: CreateWorkspaceModalProps) {
  const [workspaceName, setWorkspaceName] = useState('')
  const [category, setCategory] = useState<Category>('cloud')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set())

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setWorkspaceName('')
      setCategory('cloud')
      setSearchQuery('')
      setSelectedMembers(new Set())
    }
  }, [isOpen])

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function toggleMember(id: string, checked: boolean) {
    setSelectedMembers((prev) => {
      const next = new Set(prev)
      checked ? next.add(id) : next.delete(id)
      return next
    })
  }

  const filteredMembers = mockTeamMembers.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const isUserNotFound = searchQuery.trim().length > 0 && filteredMembers.length === 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-[757px] max-h-[90vh] overflow-y-auto bg-white rounded-card shadow-[0px_4px_28.1px_0px_rgba(0,0,0,0.25)]"
      >
        {isUserNotFound ? (
          <UserNotFoundView onClose={onClose} />
        ) : (
          <CreateView
            workspaceName={workspaceName}
            setWorkspaceName={setWorkspaceName}
            category={category}
            setCategory={setCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedMembers={selectedMembers}
            toggleMember={toggleMember}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )
}
