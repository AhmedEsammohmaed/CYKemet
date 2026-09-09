'use client'

import { useState, useRef, type KeyboardEvent, type ClipboardEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const OTP_LENGTH = 6

export default function VerifyCodePage() {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(OTP_LENGTH).fill(null))

  function updateDigit(index: number, value: string) {
    const next = [...digits]
    next[index] = value.slice(-1)
    setDigits(next)
    setError(undefined)
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    const next = [...digits]
    pasted.split('').forEach((ch, i) => { next[i] = ch })
    setDigits(next)
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const code = digits.join('')
    if (code.length < OTP_LENGTH) return setError('Please enter all 6 digits')
    setIsLoading(true)
    // TODO: replace with real API call
    console.log('Verify code:', code)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
  }

  async function handleResend() {
    // TODO: replace with real API call
    console.log('Resend code')
    setDigits(Array(OTP_LENGTH).fill(''))
    inputRefs.current[0]?.focus()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[50px]">

      <div className="flex flex-col gap-4">
        <Link
          href="/forgot-password"
          className="flex items-center gap-2 text-label-2 text-grey-main hover:text-primary-500 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <h1 className="text-[40px] font-semibold leading-tight text-content-500">
          Verify Code
        </h1>
        <p className="text-body-1 text-grey-main">
          Enter the 6-digit code we sent to your email address.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* OTP inputs */}
        <div className="flex gap-3 justify-between">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => updateDigit(i, e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              aria-label={`Digit ${i + 1}`}
              className={cn(
                'flex-1 h-[60px] rounded-card text-center',
                'text-h3 font-semibold text-content-500',
                'border-[1.5px] border-solid bg-auth-left-bg',
                'outline-none transition-colors duration-150',
                digit
                  ? 'border-primary-500'
                  : 'border-content-200 focus:border-primary-500',
                error && 'border-error-500'
              )}
            />
          ))}
        </div>

        {error && <p className="text-label-3 text-error-500">{error}</p>}

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
          {isLoading ? 'Verifying…' : 'Verify'}
        </button>

        <p className="text-body-1 text-content-500 text-center">
          Didn&apos;t receive a code?{' '}
          <button
            type="button"
            onClick={handleResend}
            className="font-bold text-primary-500 hover:underline"
          >
            Resend code
          </button>
        </p>
      </div>

    </form>
  )
}
