import { Newspaper, BookCheck, Clock4, DollarSign } from 'lucide-react'
import type { HackerReportStats } from '@/types'

function StatCard({ icon: Icon, label, value }: {
  icon: React.ElementType
  label: string
  value: string | number
}) {
  return (
    <div className="bg-white h-[84px] w-1/4 rounded-card flex items-center gap-4 px-5 shrink-0">
      <div className="size-[50px] rounded-full bg-secondary-50 flex items-center justify-center shrink-0">
        <Icon size={22} className="text-primary-500" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-body-md font-medium text-grey-main leading-tight">{label}</span>
        <span className="text-h1 font-bold text-content-500 leading-tight">{value}</span>
      </div>
    </div>
  )
}

export function ReportStats({ stats }: { stats: HackerReportStats }) {
  return (
    <div className="flex gap-6">
      <StatCard icon={Newspaper}  label="Total reports"    value={stats.totalReports} />
      <StatCard icon={BookCheck}  label="Accepted reports" value={stats.acceptedReports} />
      <StatCard icon={Clock4}     label="Pending reports"  value={stats.pendingReports} />
      <StatCard icon={DollarSign} label="Paid reports"     value={stats.paidReports.toLocaleString()} />
    </div>
  )
}
