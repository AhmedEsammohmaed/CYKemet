'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { cn } from '@/lib/utils/cn'

type UserRole = 'hacker' | 'company' | 'developer' | 'user'

interface RegisterStep2Form {
  password: string
  confirmPassword: string
  role: UserRole | null
  agreeTerms: boolean
}

interface RegisterStep2Errors {
  password?: string
  confirmPassword?: string
  role?: string
  agreeTerms?: string
}

const ROLE_OPTIONS: { value: UserRole; label: string; description: string }[] = [
  { value: 'hacker',    label: 'Hacker',    description: 'Find bugs & earn rewards' },
  { value: 'company',   label: 'Company',   description: 'Run a bug bounty program'  },
  { value: 'developer', label: 'Developer', description: 'Offer security services'   },
  { value: 'user',      label: 'User',      description: 'Access security services'  },
]

/**
 * Sign Up — Step 2 of 2
 * Password + role selection
 */
export default function RegisterStep2Page() {
  const [form, setForm] = useState<RegisterStep2Form>({
    password: '',
    confirmPassword: '',
    role: null,
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<RegisterStep2Errors>({})
  const [isLoading, setIsLoading] = useState(false)

  function validate(): boolean {
    const next: RegisterStep2Errors = {}
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword) next.confirmPassword = 'Passwords do not match'
    if (!form.role) next.role = 'Please select a role'
    if (!form.agreeTerms) next.agreeTerms = 'You must agree to the terms'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    // TODO: replace with real API call
    console.log('Register step 2:', form)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[50px]">

      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          href="/register"
          className="flex items-center gap-2 text-label-2 text-grey-main hover:text-primary-500 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-[6px] w-[20px] rounded-full bg-content-200" />
            <span className="h-[6px] w-[34px] rounded-full bg-primary-500" />
          </div>
          <span className="text-label-3 text-grey-main">Step 2 of 2</span>
        </div>

        <h1 className="text-[40px] font-semibold leading-tight text-content-500">
          Complete Setup
        </h1>
        <p className="text-body-1 text-grey-main">
          Choose a password and your role on the platform.
        </p>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-6">

          {/* Passwords */}
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
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
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={(e) => {
              setForm((p) => ({ ...p, confirmPassword: e.target.value }))
              setErrors((p) => ({ ...p, confirmPassword: undefined }))
            }}
            error={errors.confirmPassword}
          />

          {/* Role selector */}
          <div className="flex flex-col gap-3">
            <span className="text-h3 font-medium text-content-500">I am a…</span>
            <div className="grid grid-cols-2 gap-3">
              {ROLE_OPTIONS.map(({ value, label, description }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setForm((p) => ({ ...p, role: value }))
                    setErrors((p) => ({ ...p, role: undefined }))
                  }}
                  className={cn(
                    'flex flex-col gap-1 p-4 rounded-card text-start',
                    'border-[1.5px] border-solid transition-colors duration-150',
                    form.role === value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-content-200 bg-auth-left-bg hover:border-content-400'
                  )}
                >
                  <span
                    className={cn(
                      'text-label-2 font-semibold',
                      form.role === value ? 'text-primary-500' : 'text-content-500'
                    )}
                  >
                    {label}
                  </span>
                  <span className="text-label-4 text-grey-main">{description}</span>
                </button>
              ))}
            </div>
            {errors.role && (
              <p className="text-label-3 text-error-500">{errors.role}</p>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex flex-col gap-1">
            <Checkbox
              checked={form.agreeTerms}
              onChange={(v) => {
                setForm((p) => ({ ...p, agreeTerms: v }))
                setErrors((p) => ({ ...p, agreeTerms: undefined }))
              }}
              label="I agree to the Terms of Service and Privacy Policy"
            />
            {errors.agreeTerms && (
              <p className="text-label-3 text-error-500 ps-6">{errors.agreeTerms}</p>
            )}
          </div>
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
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </div>

    </form>
  )
}
