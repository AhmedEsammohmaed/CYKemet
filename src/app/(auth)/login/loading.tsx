import { AuthFormSkeleton } from '@/components/ui/AuthFormSkeleton'

export default function LoginLoading() {
  return <AuthFormSkeleton rows={4} hasButton hasSubtitle />
}
