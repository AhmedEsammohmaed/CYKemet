import { AuthFormSkeleton } from '@/components/ui/AuthFormSkeleton'

export default function VerifyCodeLoading() {
  return <AuthFormSkeleton rows={1} hasButton isOtp />
}
