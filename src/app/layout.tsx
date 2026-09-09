import { NavProvider } from '@/lib/context/NavContext'
import { CompanySidebar } from '@/components/shared/CompanySidebar'
import { CompanyTopNavbar } from '@/components/shared/CompanyTopNavbar'
import CompanyLogo from '@/assets/images/company-example-logo.png'

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <div className="min-h-screen bg-auth-left-bg">

        {/* Fixed sidebar */}
        <CompanySidebar />

        {/* Content area — offset by sidebar width */}
        <div className="ms-[280px] flex flex-col min-h-screen">

          {/* Sticky top navbar */}
          <CompanyTopNavbar
            avatarUrl={CompanyLogo.src}
            className="sticky top-0 z-10"
          />

          {/* Main scrollable content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>

      </div>
    </NavProvider>
  )
}
