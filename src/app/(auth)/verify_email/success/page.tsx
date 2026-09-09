import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'

/**
 * Email Verified — success confirmation
 * Shown after user clicks the email verification link
 */
export default function EmailVerifiedPage() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">

      {/* Icon */}
      <div className="size-24 rounded-full bg-success-50 flex items-center justify-center">
        <BadgeCheck size={48} className="text-success-500" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3">
        <h1 className="text-[40px] font-semibold text-content-500">
          Email Verified!
        </h1>
        <p className="text-body-1 text-grey-main max-w-[360px]">
          Your email has been verified successfully. You can now access all features of CyKemet.com.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/login"
        className="w-full max-w-[360px] h-[60px] rounded-card bg-primary-500 text-white flex items-center justify-center text-h3 font-medium hover:opacity-90 active:opacity-80 transition-opacity"
      >
        Go to sign in
      </Link>

    </div>
  )
}
