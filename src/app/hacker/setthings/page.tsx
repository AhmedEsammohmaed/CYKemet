'use client'

import { useEffect, useRef, useState } from 'react'
import {
  CircleCheckBig,
  Eye,
  EyeOff,
  IdCard,
  Pencil,
  ScanFace,
  UploadCloud,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useNav } from '@/lib/context/NavContext'
import { VerificationBadge } from '@/components/ui/VerificationBadge'
import type { VerificationStatus } from '@/components/ui/VerificationBadge'
import { ToggleSwitch } from '@/components/ui/ToggleSwitch'
import { PillSwitcher } from '@/components/ui/PillSwitcher'
import {
  mockProfileForm,
  mockNotificationSettings,
  mockKYCStatus,
} from '@/lib/mock/hackers'
import type {
  SettingsTab,
  ProfileFormData,
  SecurityFormData,
  NotificationSettings,
} from '@/types'

const SETTINGS_TABS = [
  { value: 'profile' as SettingsTab,       label: 'Profile' },
  { value: 'security' as SettingsTab,      label: 'Security' },
  { value: 'notifications' as SettingsTab, label: 'Notifications' },
  { value: 'kyc' as SettingsTab,           label: 'KYC' },
]

// ─── PasswordInput ────────────────────────────────────────────────────────────

function PasswordInput({
  value,
  onChange,
  placeholder,
  show,
  onToggleShow,
  label,
  required,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  show: boolean
  onToggleShow: () => void
  label: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-h5 font-medium text-content-500">
        {label}
        {required && <span className="text-error-500"> *</span>}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="border border-grey-main rounded-card h-[60px] px-[32px] pe-[56px] w-full text-body-lg focus:outline-none focus:border-primary-500"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute end-[18px] top-1/2 -translate-y-1/2 text-grey-main"
        >
          {show ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>
      </div>
    </div>
  )
}

// ─── FormInput ────────────────────────────────────────────────────────────────

function FormInput({
  label,
  value,
  onChange,
  required,
  className,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-h5 font-medium text-content-500">
        {label}
        {required && <span className="text-error-500"> *</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-grey-main rounded-card h-[60px] px-[32px] w-full text-body-lg focus:outline-none focus:border-primary-500"
      />
    </div>
  )
}

// ─── ProfileTab ───────────────────────────────────────────────────────────────

function ProfileTab({
  profile,
  setProfile,
}: {
  profile: ProfileFormData
  setProfile: React.Dispatch<React.SetStateAction<ProfileFormData>>
}) {
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const docInputRef = useRef<HTMLInputElement>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [docFiles, setDocFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setAvatarFile(file)
    if (file) setAvatarPreview(URL.createObjectURL(file))
  }

  function handleDocChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    setDocFiles((prev) => [...prev, ...files])
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setDocFiles((prev) => [...prev, ...files])
  }

  const initials = profile.nickname
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-white rounded-card p-[22px] flex flex-col gap-[28px]">
      {/* Avatar + form */}
      <div className="flex gap-[28px] items-start">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="relative size-[126px] group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
            <div className="size-[126px] rounded-full bg-secondary-50 overflow-hidden flex items-center justify-center">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[36px] font-semibold text-primary-500">{initials}</span>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 end-0 size-[34px] rounded-full bg-primary-500 flex items-center justify-center shadow">
              <Pencil size={18} className="text-white" />
            </div>
          </div>
          {avatarFile && (
            <p className="mt-2 text-body-sm text-grey-main max-w-[126px] truncate">{avatarFile.name}</p>
          )}
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Form fields */}
        <div className="flex-1 flex flex-col gap-[18px]">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-[22px]">
            <FormInput
              label="Nickname (public)"
              value={profile.nickname}
              onChange={(v) => setProfile((p) => ({ ...p, nickname: v }))}
              required
            />
            <FormInput
              label="Real name (private)"
              value={profile.realName}
              onChange={(v) => setProfile((p) => ({ ...p, realName: v }))}
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-[22px]">
            <FormInput
              label="E-Mail"
              value={profile.email}
              onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
              required
            />
            <FormInput
              label="Country"
              value={profile.country}
              onChange={(v) => setProfile((p) => ({ ...p, country: v }))}
              required
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label className="text-h5 font-medium text-content-500">
              Bio<span className="text-error-500"> *</span>
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              rows={5}
              className="border border-grey-main rounded-card h-[156px] px-[32px] py-[16px] w-full text-body-lg focus:outline-none focus:border-primary-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="flex flex-col gap-[14px]">
        <h3 className="text-h3 font-semibold text-content-500">Documents</h3>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'border-dashed border-[1.75px] rounded-[14px] h-[327px]',
            'flex flex-col items-center justify-center gap-[12px]',
            isDragging ? 'border-primary-500 bg-secondary-50/50' : 'border-primary-500'
          )}
        >
          <UploadCloud size={73} className="text-primary-500" />
          <p className="text-[23px] font-normal text-content-500">
            Drag your file(s) to start uploading
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 w-[300px]">
            <div className="flex-1 h-px bg-[#e5e5e5]" />
            <span className="text-body-md text-grey-main">OR</span>
            <div className="flex-1 h-px bg-[#e5e5e5]" />
          </div>

          <button
            type="button"
            onClick={() => docInputRef.current?.click()}
            className="border-[#156fcb] border-[1.75px] rounded-full px-[21px] py-[10px] text-[#156fcb] text-[21px] font-semibold"
          >
            Browse files
          </button>

          {docFiles.length > 0 && (
            <ul className="text-label-sm text-content-500 text-center">
              {docFiles.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
        </div>
        <input
          ref={docInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleDocChange}
        />
      </div>

      {/* Social links */}
      <div className="flex flex-col gap-[14px]">
        <h3 className="text-h3 font-semibold text-content-500">Social links</h3>
        <div className="flex gap-[21px]">
          <FormInput
            label="LinkedIn"
            value={profile.linkedin}
            onChange={(v) => setProfile((p) => ({ ...p, linkedin: v }))}
            required
            className="w-[274px]"
          />
          <FormInput
            label="GitHub"
            value={profile.github}
            onChange={(v) => setProfile((p) => ({ ...p, github: v }))}
            required
            className="w-[274px]"
          />
          <FormInput
            label="Website"
            value={profile.website}
            onChange={(v) => setProfile((p) => ({ ...p, website: v }))}
            required
            className="w-[274px]"
          />
        </div>
      </div>

      {/* Open to hiring */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-h3 font-semibold text-content-500">Open to hiring</p>
          <p className="text-body-lg font-normal text-grey-main">
            Let companies know you&apos;re available for security roles
          </p>
        </div>
        <ToggleSwitch
          checked={profile.openToHiring}
          onChange={(v) => setProfile((p) => ({ ...p, openToHiring: v }))}
        />
      </div>

      {/* Save */}
      <div>
        <button
          type="button"
          onClick={() => console.log('Save profile', profile)}
          className="bg-primary-500 h-[60px] w-[235px] rounded-card text-white text-h3 font-medium"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}

// ─── SecurityTab ──────────────────────────────────────────────────────────────

function SecurityTab({
  security,
  setSecurity,
}: {
  security: SecurityFormData
  setSecurity: React.Dispatch<React.SetStateAction<SecurityFormData>>
}) {
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  function handleUpdatePassword() {
    if (security.newPassword !== security.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    console.log('Update password')
  }

  return (
    <div className="bg-white rounded-card p-[22px] flex flex-col gap-[28px]">
      {/* Change password */}
      <div className="flex flex-col gap-[18px]">
        <div>
          <h3 className="text-h3 font-semibold text-content-500">Change password</h3>
          <p className="text-body-lg font-normal text-grey-main">
            Update your password regularly for better security
          </p>
        </div>

        <PasswordInput
          label="Current password"
          required
          value={security.currentPassword}
          onChange={(v) => setSecurity((s) => ({ ...s, currentPassword: v }))}
          show={showCurrentPw}
          onToggleShow={() => setShowCurrentPw((p) => !p)}
        />

        <div className="grid grid-cols-2 gap-[22px]">
          <PasswordInput
            label="New password"
            required
            value={security.newPassword}
            onChange={(v) => setSecurity((s) => ({ ...s, newPassword: v }))}
            placeholder="Enter your new password here"
            show={showNewPw}
            onToggleShow={() => setShowNewPw((p) => !p)}
          />
          <PasswordInput
            label="Confirm new password"
            required
            value={security.confirmPassword}
            onChange={(v) => setSecurity((s) => ({ ...s, confirmPassword: v }))}
            placeholder="Confirm your new password"
            show={showConfirmPw}
            onToggleShow={() => setShowConfirmPw((p) => !p)}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleUpdatePassword}
            className="bg-primary-500 h-[60px] w-[235px] rounded-card text-white text-h3 font-medium"
          >
            Update password
          </button>
        </div>
      </div>

      {/* 2FA */}
      <div className="flex items-center justify-between mt-[4px]">
        <div>
          <p className="text-h3 font-semibold text-content-500">Two-Factor Authentication</p>
          <p className="text-body-lg font-normal text-grey-main">
            Add an extra layer of security to your account
          </p>
        </div>
        <ToggleSwitch
          checked={security.twoFactorEnabled}
          onChange={(v) => setSecurity((s) => ({ ...s, twoFactorEnabled: v }))}
        />
      </div>
    </div>
  )
}

// ─── NotificationsTab ─────────────────────────────────────────────────────────

const notificationRows: {
  key: keyof NotificationSettings
  title: string
  subtitle: string
}[] = [
  { key: 'reportUpdates',  title: 'Report updates',  subtitle: 'Get notified when your reports are reviewed or updated' },
  { key: 'paymentAlerts',  title: 'Payment Alerts',  subtitle: 'Receive alerts for successful payments and withdrawals' },
  { key: 'programNews',    title: 'Program News',    subtitle: 'Stay updated on new programs and scope changes' },
  { key: 'weeklyDigest',   title: 'Weekly Digest',   subtitle: 'Receive a weekly summary of your activity' },
  { key: 'securityAlerts', title: 'Security Alerts', subtitle: 'Get notified of suspicious login attempts' },
]

function NotificationsTab({
  notifications,
  setNotifications,
}: {
  notifications: NotificationSettings
  setNotifications: React.Dispatch<React.SetStateAction<NotificationSettings>>
}) {
  return (
    <div className="bg-white rounded-card p-[22px] flex flex-col gap-[28px]">
      <div>
        <h3 className="text-h3 font-semibold text-content-500">Notification Preferences</h3>
        <p className="text-body-lg font-normal text-grey-main">
          Choose which notifications you want to receive
        </p>
      </div>

      <div className="flex flex-col gap-[22px]">
        {notificationRows.map(({ key, title, subtitle }) => (
          <div key={key} className="flex items-center justify-between h-[53px]">
            <div>
              <p className="text-h4 font-semibold text-content-500">{title}</p>
              <p className="text-body-lg font-normal text-grey-main">{subtitle}</p>
            </div>
            <ToggleSwitch
              checked={notifications[key]}
              onChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── KYCTab ───────────────────────────────────────────────────────────────────

function KYCTab() {
  const kyc = mockKYCStatus

  function docVerificationStatus(status: 'verified' | 'pending' | 'rejected'): VerificationStatus {
    if (status === 'rejected') return 'unverified'
    return status
  }

  return (
    <div className="bg-white rounded-card p-[22px] flex flex-col gap-[28px]">
      {/* Section 1 */}
      <div className="flex flex-col gap-[14px]">
        <div>
          <h3 className="text-h3 font-semibold text-content-500">KYC Verification</h3>
          <p className="text-body-lg font-normal text-grey-main">
            Complete identity verification to unlock withdrawals
          </p>
        </div>

        {/* Overall status */}
        <div className="bg-auth-left-bg rounded-card px-[22px] py-[25px] flex items-center justify-between">
          <div className="flex items-center gap-[14px]">
            <CircleCheckBig size={36} className="text-success-500" />
            <div>
              <p className="text-h4 font-semibold text-content-500">Identity verified</p>
              <p className="text-body-lg font-normal text-grey-main">
                Your identity has been successfully verified
              </p>
            </div>
          </div>
          <VerificationBadge status={kyc.overallVerified ? 'verified' : 'pending'} />
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col gap-[14px]">
        <h3 className="text-h3 font-semibold text-content-500">Submitted Documents</h3>

        <div className="flex gap-[18px]">
          {kyc.documents.map((doc) => (
            <div
              key={doc.type}
              className="bg-auth-left-bg rounded-card px-[22px] py-[25px] w-[512px] flex items-center justify-between"
            >
              <div className="flex items-center gap-[14px]">
                {doc.type === 'id' ? (
                  <IdCard size={36} className="text-primary-500" />
                ) : (
                  <ScanFace size={36} className="text-primary-500" />
                )}
                <div>
                  <p className="text-h4 font-semibold text-content-500">{doc.label}</p>
                  <p className="text-body-lg font-normal text-grey-main">
                    Submitted on {doc.submittedDate}
                  </p>
                </div>
              </div>
              <VerificationBadge status={docVerificationStatus(doc.status)} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="text-body-md font-normal text-grey-main">
        Need to update your documents? Contact support at support@cykemet.io
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { setTitle } = useNav()
  useEffect(() => { setTitle('Settings') }, [setTitle])

  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [profile, setProfile] = useState<ProfileFormData>(mockProfileForm)
  const [security, setSecurity] = useState<SecurityFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  })
  const [notifications, setNotifications] = useState<NotificationSettings>(mockNotificationSettings)

  return (
    <div className="flex flex-col gap-[22px]">
      {/* Tab switcher */}
      <PillSwitcher<SettingsTab>
        options={SETTINGS_TABS}
        value={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab content */}
      {activeTab === 'profile' && (
        <ProfileTab profile={profile} setProfile={setProfile} />
      )}
      {activeTab === 'security' && (
        <SecurityTab security={security} setSecurity={setSecurity} />
      )}
      {activeTab === 'notifications' && (
        <NotificationsTab notifications={notifications} setNotifications={setNotifications} />
      )}
      {activeTab === 'kyc' && <KYCTab />}
    </div>
  )
}
