'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils/cn'

interface ResetPasswordForm {
  password: string
  confirmPassword: string
}

interface ResetPasswordErrors {
  password?: string
  confirmPassword?: string
}

export default function ResetPasswordPage() {
  const [form, setForm] = useState<ResetPasswordForm>({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<ResetPasswordErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  function validate(): boolean {
    const next: ResetPasswordErrors = {}
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword) next.confirmPassword = 'Passwords do not match'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    // TODO: replace with real API call
    console.log('Reset password:', form.password)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[50px]">

      <div className="flex flex-col gap-4">
        <Link
          href="/verify-code"
          className="flex items-center gap-2 text-label-2 text-grey-main hover:text-primary-500 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <h1 className="text-[40px] font-semibold leading-tight text-content-500">
          Reset Password
        </h1>
        <p className="text-body-1 text-grey-main">
          Create a new password for your account.
        </p>
      </div>

      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-6">
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={form.password}
            onChange={(e) => {
              setForm((p) => ({ ...p, password: e.target.value }))
              setErrors((p) => ({ ...p, password: undefined }))
            }}
            error={errors.password}
            hint="Minimum 8 characters"
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter new password"
            value={form.confirmPassword}
            onChange={(e) => {
              setForm((p) => ({ ...p, confirmPassword: e.target.value }))
              setErrors((p) => ({ ...p, confirmPassword: undefined }))
            }}
            error={errors.confirmPassword}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full h-[60px] rounded-card bg-primary-500 text-white',
            'text-h3 font-medium transition-opacity duration-200',
            'hover:opacity-90 active:opacity-80',
            'disabled:opacity-60 disabled:cursor-not-allowed'
          )}
        >
          {isLoading ? 'Resetting…' : 'Reset password'}
        </button>
      </div>

    </form>
  )
}
