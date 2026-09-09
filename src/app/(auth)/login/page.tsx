'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CircleCheck } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { cn } from '@/lib/utils/cn'

interface LoginFormState {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginFormErrors {
  email?: string
  password?: string
}

/**
 * Sign In page — Figma node 4:988
 *
 * Heading: "Welcome back" — 56px semibold, primary-500
 * Email: selected state (blue 1.5px border) with circle-check icon
 * Password: default state (grey border) with eye toggle
 * OR divider, Facebook + Google social buttons
 */
export default function LoginPage() {
  const [form, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  function validate(): boolean {
    const next: LoginFormErrors = {}
    if (!form.email) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setIsLoading(true)
    // TODO: replace with real API call
    console.log('Login:', form)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
  }

  const emailFilled = form.email.length > 0 && !errors.email

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[50px]">

      {/* Heading */}
      <h1 className="text-[56px] font-semibold leading-tight text-primary-500 text-center w-full">
        Welcome back
      </h1>

      <div className="flex flex-col gap-[50px] w-full">

        {/* Fields */}
        <div className="flex flex-col gap-4 w-full">

          {/* Email */}
          <Input
            label="E-mail"
            type="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            error={errors.email}
            className={cn(emailFilled && 'border-primary-500')}
            rightElement={
              emailFilled ? (
                <CircleCheck size={24} className="text-primary-500 shrink-0" />
              ) : undefined
            }
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            error={errors.password}
          />

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between w-full">
            <Checkbox
              checked={form.rememberMe}
              onChange={(v) => setForm((p) => ({ ...p, rememberMe: v }))}
              label="Remember me"
              className='text-primary-950'
            />
            <Link
              href="/forgot-password"
              className="text-body-1 font-bold text-primary-500 underline decoration-solid hover:opacity-80 transition-opacity"
            >
              Forgot password
            </Link>
          </div>
        </div>

        {/* Sign in button */}
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
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </div>

      {/* ── OR divider ─────────────────────────────────────────── */}
      <div className="flex items-center gap-[5px] w-full">
        <div className="flex-1 h-px bg-content-200" />
        <span className="text-body-1 text-primary-500 px-2 shrink-0">or</span>
        <div className="flex-1 h-px bg-content-200" />
      </div>

      {/* ── Social buttons ─────────────────────────────────────── */}
      <div className="flex flex-col gap-[26px] w-full">

        {/* Facebook */}
        <button
          type="button"
          onClick={() => console.log('Facebook login')}
          className={cn(
            'w-full h-[60px] rounded-btn bg-primary-500',
            'flex items-center justify-center gap-[10px]',
            'text-body-1 text-white font-normal',
            'hover:opacity-90 active:opacity-80 transition-opacity'
          )}
        >
          <Image
            src="/images/auth/facebook.svg"
            alt="Facebook"
            width={26}
            height={26}
            className="object-contain"
            unoptimized
          />
          Sign in with Facebook
        </button>

        {/* Google */}
        <button
          type="button"
          onClick={() => console.log('Google login')}
          className={cn(
            'w-full h-[60px] rounded-btn bg-auth-left-bg',
            'border-[1.5px] border-solid border-content-200',
            'flex items-center justify-center gap-[6px]',
            'text-body-1 text-content-500 font-normal',
            'hover:border-content-400 active:opacity-80 transition-colors'
          )}
        >
          <Image
            src="/images/auth/google.svg"
            alt="Google"
            width={34}
            height={34}
            className="object-contain"
            unoptimized
          />
          Sign in with Google
        </button>
      </div>

      {/* No account yet */}
      <p className="text-body-1 text-content-500 text-center">
        Do not have account yet?{' '}
        <Link
          href="/register"
          className="font-bold text-primary-500 hover:underline"
        >
          Sign Up
        </Link>
      </p>

    </form>
  )
}
