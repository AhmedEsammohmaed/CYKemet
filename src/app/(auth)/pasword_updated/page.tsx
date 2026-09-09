import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

/**
 * Password Updated success screen
 * Shown after a successful password reset flow
 */
export default function PasswordUpdatedPage() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">

      {/* Success icon */}
      <div className="size-24 rounded-full bg-success-50 flex items-center justify-center">
        <CheckCircle size={48} className="text-success-500" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3">
        <h1 className="text-[40px] font-semibold text-content-500">
          Password Updated!
        </h1>
        <p className="text-body-1 text-grey-main max-w-[380px]">
          Your password has been changed successfully. You can now sign in with your new password.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/login"
        className="w-full max-w-[360px] h-[60px] rounded-card bg-primary-500 text-white flex items-center justify-center text-h3 font-medium hover:opacity-90 active:opacity-80 transition-opacity"
      >
        Sign in
      </Link>

    </div>
  )
}
