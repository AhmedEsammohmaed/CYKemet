'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Shield,
  Newspaper,
  UsersRound,
  Grid2X2Check,
  WalletCards,
  Settings,
  MessageCircleQuestion,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard',       icon: LayoutDashboard,       href: '/company/dashboard'   },
  { label: 'Programs',        icon: Shield,                href: '/company/programs'    },
  { label: 'Reports',         icon: Newspaper,             href: '/company/reports'     },
  { label: 'Team management', icon: UsersRound,            href: '/company/team'        },
  { label: 'Workspaces',      icon: Grid2X2Check,          href: '/company/workspaces'  },
  { label: 'Wallet',          icon: WalletCards,           href: '/company/wallet'      },
  { label: 'Settings',        icon: Settings,              href: '/company/settings'    },
  { label: 'FAQ',             icon: MessageCircleQuestion, href: '/company/faq'         },
]

export function CompanySidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed start-0 top-0 h-screen w-[280px] bg-white flex flex-col z-20">

      {/* Logo */}
      <div className="px-[19px] pt-[15px] pb-8">
        <span
          className="font-righteous text-[27px] leading-none font-normal bg-clip-text text-transparent select-none"
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
      <nav className="flex-1 flex flex-col gap-[10px] px-[15px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          const isPrograms = item.href === '/company/programs'

          const isRemediation = item.href === '/company/workspaces'

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-[6px] h-[35px] w-[250px] px-[23px] py-[5px] rounded-[10px]',
                  'text-[18px] font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-secondary-50 text-content-500'
                    : 'text-grey-main hover:bg-auth-left-bg'
                )}
              >
                <Icon size={22} className="shrink-0" />
                {item.label}
              </Link>

              {/* Programs sub-tree — visible only when on /company/programs/* */}
              {isPrograms && isActive && (
                <div className="relative mt-[8px] mb-[2px]">
                  <span className="absolute start-[34px] top-0 bottom-0 w-px bg-content-100" />
                  <div className="flex flex-col gap-[20px] ps-[50px]">
                    <Link
                      href="/company/programs"
                      className="text-[14px] font-medium text-grey-main hover:text-content-500 transition-colors leading-none"
                    >
                      Current programs
                    </Link>
                    <Link
                      href="/company/programs/create"
                      className="text-[14px] font-medium text-grey-main hover:text-content-500 transition-colors leading-none"
                    >
                      Create a program
                    </Link>
                  </div>
                </div>
              )}

              {/* Remediation sub-tree — visible only when on /company/workspaces/* */}
              {isRemediation && isActive && (
                <div className="relative mt-[8px] mb-[2px]">
                  <span className="absolute start-[34px] top-0 bottom-0 w-px bg-content-100" />
                  <div className="flex flex-col gap-[20px] ps-[50px]">
                    {(['ws1', 'ws2'] as const).map((wsId, idx) => {
                      const isWsActive = pathname.startsWith(`/company/workspaces/${wsId}`)
                      return (
                        <Link
                          key={wsId}
                          href={`/company/workspaces/${wsId}`}
                          className={cn(
                            'text-[14px] font-medium transition-colors leading-none',
                            isWsActive ? 'text-content-500' : 'text-grey-main hover:text-content-500'
                          )}
                        >
                          {`Workspace 0${idx + 1}`}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Divider + Logout */}
      <div className="px-[15px] pb-8">
        <hr className="border-t border-content-100 mb-[26px]" />
        <button
          type="button"
          onClick={() => console.log('Log out')}
          className={cn(
            'flex items-center gap-[6px] h-[35px] w-[250px] px-[23px] py-[5px] rounded-[10px]',
            'text-[18px] font-medium text-grey-main',
            'hover:bg-auth-left-bg transition-colors duration-150'
          )}
        >
          <LogOut size={22} className="shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  )
}
