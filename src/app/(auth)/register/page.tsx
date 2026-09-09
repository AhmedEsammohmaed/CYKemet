'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils/cn'

interface RegisterStep1Form {
  fullName: string
  email: string
  phone: string
}

interface RegisterStep1Errors {
  fullName?: string
  email?: string
  phone?: string
}

/**
 * Sign Up — Step 1 of 2
 * Collects name, email, phone
 */
export default function RegisterPage() {
  const [form, setForm] = useState<RegisterStep1Form>({ fullName: '', email: '', phone: '' })
  const [errors, setErrors] = useState<RegisterStep1Errors>({})
  const [isLoading, setIsLoading] = useState(false)

  function setField<K extends keyof RegisterStep1Form>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
    setErrors((p) => ({ ...p, [key]: undefined }))
  }

  function validate(): boolean {
    const next: RegisterStep1Errors = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required'
    if (!form.email) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.phone.trim()) next.phone = 'Phone number is required'
    else if (!/^\+?[\d\s\-()]{8,}$/.test(form.phone)) next.phone = 'Enter a valid phone number'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    // TODO: persist step-1 data (context / localStorage) and navigate to step-2
    console.log('Register step 1:', form)
    await new Promise((r) => setTimeout(r, 400))
    setIsLoading(false)
    window.location.href = '/register/step-2'
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[50px]">

      {/* Header */}
      <div className="flex flex-col gap-4">

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-[6px] w-[34px] rounded-full bg-primary-500" />
            <span className="h-[6px] w-[20px] rounded-full bg-content-200" />
          </div>
          <span className="text-label-3 text-grey-main">Step 1 of 2</span>
        </div>

        <h1 className="text-[40px] font-semibold leading-tight text-content-500">
          Create Account
        </h1>
        <p className="text-body-1 text-grey-main">
          Let&apos;s get you started. Enter your basic information.
        </p>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => setField('fullName', e.target.value)}
            error={errors.fullName}
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+20 100 000 0000"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
            error={errors.phone}
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
          {isLoading ? 'Continuing…' : 'Continue'}
        </button>
      </div>

      {/* Sign in link */}
      <p className="text-body-1 text-content-500 text-center">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-primary-500 hover:underline">
          Sign In
        </Link>
      </p>

    </form>
  )
}
