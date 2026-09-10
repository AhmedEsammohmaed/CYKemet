'use client'

import Image from 'next/image'
import { Search, Settings, Bell } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useNav } from '@/lib/context/NavContext'

export interface TopNavbarProps {
  userName: string
  userRole: string
  userAvatar?: string
  className?: string
}

function AvatarFallback({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="size-[68px] rounded-full bg-primary-500 flex items-center justify-center shrink-0">
      <span className="text-white text-h4 font-semibold">{initials}</span>
    </div>
  )
}

export function TopNavbar({ userName, userRole, userAvatar, className }: TopNavbarProps) {
  const { title } = useNav()

  return (
    <header
      className={cn(
        'h-[96px] w-full bg-white flex items-center justify-between',
        'px-8 shrink-0',
        className
      )}
    >
      {/* Page title */}
      <h1 className="text-h2 font-semibold text-content-500 leading-none">
        {title}
      </h1>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div
          className={cn(
            'w-[273px] h-[46px] bg-auth-left-bg rounded-[10px]',
            'flex items-center gap-2 px-4'
          )}
        >
          <Search size={20} className="text-grey-main shrink-0" />
          <input
            type="text"
            placeholder="Search here"
            className={cn(
              'flex-1 bg-transparent text-body-2 text-content-500',
              'placeholder:text-grey-main outline-none border-none'
            )}
          />
        </div>

        {/* Settings icon */}
        <button
          type="button"
          aria-label="Settings"
          className="size-[46px] bg-auth-left-bg rounded-[10px] flex items-center justify-center hover:bg-secondary-50 transition-colors"
        >
          <Settings size={20} className="text-grey-main" />
        </button>

        {/* Notifications icon */}
        <button
          type="button"
          aria-label="Notifications"
          className="size-[46px] bg-auth-left-bg rounded-[10px] flex items-center justify-center hover:bg-secondary-50 transition-colors"
        >
          <Bell size={20} className="text-grey-main" />
        </button>

        {/* User info */}
        <div className="flex items-center gap-3">
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt={userName}
              width={68}
              height={68}
              className="rounded-full object-cover size-[68px] shrink-0"
              unoptimized
            />
          ) : (
            <AvatarFallback name={userName} />
          )}
          <div className="flex flex-col gap-0.5">
            <span className="text-h5 font-medium text-content-500 leading-tight whitespace-nowrap">
              {userName}
            </span>
            <span className="text-body-lg text-grey-main leading-tight whitespace-nowrap">
              {userRole}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
