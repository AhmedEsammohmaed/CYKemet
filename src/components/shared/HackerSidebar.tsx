'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Shield,
  Newspaper,
  GraduationCap,
  Crown,
  Wallet,
  ChartNoAxesCombined,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard',   icon: LayoutDashboard, href: '/hacker/dashboard' },
  { label: 'Programs',    icon: Shield,          href: '/hacker/programs' },
  { label: 'Reports',     icon: Newspaper,       href: '/hacker/reports' },
  { label: 'CyAcademy',  icon: GraduationCap,   href: '/hacker/academy' },
  { label: 'Leaderboard', icon: Crown,           href: '/hacker/leaderboard' },
  { label: 'Wallet',      icon: Wallet,          href: '/hacker/wallet' },
  { label: 'Analytics',   icon: ChartNoAxesCombined, href: '/hacker/analytics' },
  { label: 'Settings',    icon: Settings,        href: '/hacker/settings' },
]

export function HackerSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed start-0 top-0 h-screen w-[280px] bg-white flex flex-col z-20">

      {/* Logo */}
      <div className="px-[15px] pt-9 pb-8">
        <span
          className="font-righteous text-title-2 leading-none font-normal bg-clip-text text-transparent select-none"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(0,59,223,0.9) 43.75%, rgba(131,163,239,0.96) 87.019%, #e9f4fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Cykemet
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1 px-[15px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 h-[35px] w-[250px] px-[23px] rounded-[10px]',
                'text-body-2 transition-colors duration-150',
                isActive
                  ? 'bg-secondary-50 text-content-500 font-medium'
                  : 'bg-transparent text-grey-main font-normal hover:bg-auth-left-bg'
              )}
            >
              <Icon
                size={18}
                className={cn(
                  'shrink-0',
                  isActive ? 'text-primary-500' : 'text-grey-main'
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Divider + Logout */}
      <div className="px-[15px] pb-8">
        <hr className="border-t border-[#e5e5e5] mb-4" />
        <button
          type="button"
          onClick={() => console.log('Log out')}
          className={cn(
            'flex items-center gap-3 h-[35px] w-full px-[23px] rounded-[10px]',
            'text-h5 font-medium text-grey-main',
            'hover:bg-auth-left-bg transition-colors duration-150'
          )}
        >
          <LogOut
            size={22}
            className="shrink-0 text-grey-main"
            style={{ transform: 'scaleX(-1)' }}
          />
          Log out
        </button>
      </div>
    </aside>
  )
}
