import { NavProvider } from '@/lib/context/NavContext'
import { HackerSidebar } from '@/components/shared/HackerSidebar'
import { TopNavbar } from '@/components/shared/TopNavbar'
import { mockHackerProfile } from '@/lib/mock/hackers'

export default function HackerLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <div className="min-h-screen bg-auth-left-bg">

        {/* Fixed sidebar */}
        <HackerSidebar />

        {/* Content area — offset by sidebar width */}
        <div className="ms-[280px] flex flex-col min-h-screen">

          {/* Sticky top navbar */}
          <TopNavbar
            userName={mockHackerProfile.name}
            userRole="Hacker"
            userAvatar={mockHackerProfile.avatarUrl}
            className="sticky top-0 z-10"
          />

          {/* Main scrollable content */}
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>

      </div>
    </NavProvider>
  )
}
