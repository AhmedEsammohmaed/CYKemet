'use client'

import Link from 'next/link'
import { MailOpen } from 'lucide-react'

/**
 * Email Verification — "check your inbox" state
 * Shown immediately after registration
 */
export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">

      {/* Icon */}
      <div className="size-24 rounded-full bg-primary-50 flex items-center justify-center">
        <MailOpen size={48} className="text-primary-500" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3">
        <h1 className="text-[40px] font-semibold text-content-500">
          Check Your Email
        </h1>
        <p className="text-body-1 text-grey-main max-w-[400px]">
          We&apos;ve sent a verification link to your email address. Please click the link to activate your account.
        </p>
      </div>

      {/* Resend */}
      <p className="text-body-1 text-content-500">
        Didn&apos;t receive an email?{' '}
        <button
          type="button"
          className="font-bold text-primary-500 hover:underline"
          onClick={() => console.log('Resend verification email')}
        >
          Resend email
        </button>
      </p>

      <Link
        href="/login"
        className="text-label-2 text-grey-main underline hover:text-primary-500 transition-colors"
      >
        Back to sign in
      </Link>

    </div>
  )
}
