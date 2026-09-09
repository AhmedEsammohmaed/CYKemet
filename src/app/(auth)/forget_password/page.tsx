'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils/cn'

interface ForgotPasswordState {
  email: string
}

export default function ForgotPasswordPage() {
  const [form, setForm] = useState<ForgotPasswordState>({ email: '' })
  const [error, setError] = useState<string>()
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email) return setError('Email is required')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Enter a valid email')
    setError(undefined)
    setIsLoading(true)
    // TODO: replace with real API call
    console.log('Forgot password:', form.email)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="size-20 rounded-full bg-primary-50 flex items-center justify-center">
          <Mail size={36} className="text-primary-500" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-[40px] font-semibold text-content-500">Check your email</h1>
          <p className="text-body-1 text-grey-main max-w-[420px]">
            We sent a password reset link to{' '}
            <span className="text-primary-500 font-medium">{form.email}</span>
          </p>
        </div>
        <Link
          href="/login"
          className="text-body-1 font-bold text-primary-500 underline hover:opacity-80 transition-opacity"
        >
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[50px]">

      <div className="flex flex-col gap-4">
        <Link
          href="/login"
          className="flex items-center gap-2 text-label-2 text-grey-main hover:text-primary-500 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </Link>
        <h1 className="text-[40px] font-semibold leading-tight text-content-500">
          Forgot Password?
        </h1>
        <p className="text-body-1 text-grey-main">
          Enter the email address linked to your account and we&apos;ll send you a reset link.
        </p>
      </div>

      <div className="flex flex-col gap-[50px]">
        <Input
          label="E-mail"
          type="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={(e) => {
            setForm({ email: e.target.value })
            setError(undefined)
          }}
          error={error}
        />

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
          {isLoading ? 'Sending…' : 'Send reset link'}
        </button>
      </div>

    </form>
  )
}
