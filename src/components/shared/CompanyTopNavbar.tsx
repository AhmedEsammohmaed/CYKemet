'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Settings, Bell, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useNav } from '@/lib/context/NavContext'

export interface CompanyTopNavbarProps {
  /** Company avatar image URL — falls back to initials circle if not provided */
  avatarUrl?: string
  className?: string
}

export function CompanyTopNavbar({ avatarUrl, className }: CompanyTopNavbarProps) {
  const { title, backHref } = useNav()

  return (
    <header
      className={cn(
        'h-[96px] w-full bg-white flex items-center justify-between px-8 shrink-0',
        className
      )}
    >
      {/* Page title */}
      {backHref ? (
        <Link href={backHref} className="flex items-center gap-2 group">
          <ChevronLeft size={24} className="text-content-500 group-hover:text-primary-DEFAULT transition-colors shrink-0" />
          <h1 className="text-[26px] font-semibold text-content-500 leading-none group-hover:text-primary-DEFAULT transition-colors">{title}</h1>
        </Link>
      ) : (
        <h1 className="text-[26px] font-semibold text-content-500 leading-none">{title}</h1>
      )}

      {/* Right side */}
      <div className="flex items-center gap-[86px]">

        {/* Settings + Bell — gap-[32px] between them */}
        <div className="flex items-center gap-[32px]">
          <button
            type="button"
            aria-label="Settings"
            className="size-[46px] bg-auth-left-bg rounded-[10px] flex items-center justify-center hover:bg-secondary-50 transition-colors"
          >
            <Settings size={30} className="text-grey-main" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="size-[46px] bg-auth-left-bg rounded-[10px] flex items-center justify-center hover:bg-secondary-50 transition-colors"
          >
            <Bell size={30} className="text-grey-main" />
          </button>
        </div>

        {/* Avatar + company name — gap-[11px] */}
        <div className="flex items-center gap-[11px]">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Company avatar"
              width={68}
              height={68}
              className="size-[68px] rounded-full object-cover shrink-0"
              unoptimized
            />
          ) : (
            <div className="size-[68px] rounded-full bg-primary-500 flex items-center justify-center shrink-0">
              <span className="text-white text-h4 font-semibold select-none">CN</span>
            </div>
          )}
          <div className="flex flex-col gap-[6px]">
            <span className="text-[18px] font-medium text-content-500 leading-none whitespace-nowrap">
              CyberNest
            </span>
            <span className="text-[16px] text-grey-main leading-none whitespace-nowrap">
              Company
            </span>
          </div>
        </div>

      </div>
    </header>
  )
}
