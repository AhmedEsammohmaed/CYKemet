import { CircleCheck, Clock4, Receipt } from 'lucide-react'
import { mockWalletStats } from '@/lib/mock/wallet'

export function BalanceStats() {
  return (
    <div className="bg-white rounded-card h-[99px] flex items-stretch divide-x divide-auth-left-bg">
      <div className="flex items-center gap-[14px] px-[14px] w-[234px] shrink-0">
        <div className="size-[76px] bg-secondary-50 rounded-card flex items-center justify-center shrink-0">
          <CircleCheck size={32} className="text-success-500" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-h5 font-medium text-grey-main leading-tight">Available balance</span>
          <span className="text-title-3 font-bold text-content-500 leading-none">{mockWalletStats.availableBalance}</span>
        </div>
      </div>

      <div className="flex items-center gap-[14px] px-[14px] w-[234px] shrink-0">
        <div className="size-[76px] bg-secondary-50 rounded-card flex items-center justify-center shrink-0">
          <Clock4 size={32} className="text-warning-500" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-h5 font-medium text-grey-main leading-tight">Pending balance</span>
          <span className="text-title-3 font-bold text-content-500 leading-none">{mockWalletStats.pendingBalance}</span>
        </div>
      </div>

      <div className="flex items-center gap-[14px] px-[14px] w-[234px] shrink-0">
        <div className="size-[76px] bg-secondary-50 rounded-card flex items-center justify-center shrink-0">
          <Receipt size={32} className="text-grey-main" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-h5 font-medium text-grey-main leading-tight">Total spending</span>
          <span className="text-title-3 font-bold text-content-500 leading-none">{mockWalletStats.totalSpending}</span>
        </div>
      </div>
    </div>
  )
}
