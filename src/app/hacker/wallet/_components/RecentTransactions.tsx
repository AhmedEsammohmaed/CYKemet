import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { mockWalletTransactions } from '@/lib/mock/wallet'
import type { WalletTransaction } from '@/types'

function TxRow({ tx }: { tx: WalletTransaction }) {
  return (
    <div className="flex items-center justify-between h-[41px]">
      <div className="flex items-center gap-[14px]">
        <div className="size-[40px] bg-auth-left-bg rounded-full flex items-center justify-center shrink-0">
          {tx.direction === 'out'
            ? <ArrowUpRight size={24} className="text-error-500" />
            : <ArrowDownLeft size={24} className="text-success-500" />
          }
        </div>
        <div className="flex flex-col">
          <span className="text-body-lg font-medium text-content-500 leading-tight">{tx.label}</span>
          <span className="text-body-md text-grey-main leading-tight">{tx.date}</span>
        </div>
      </div>
      <span className={cn(
        'text-body-lg font-semibold',
        tx.direction === 'out' ? 'text-error-500' : 'text-success-500'
      )}>
        {tx.amount}
      </span>
    </div>
  )
}

export function RecentTransactions() {
  return (
    <div className="bg-white rounded-card px-[18px] py-[22px] flex flex-col gap-3">
      <span className="text-h4 font-semibold text-content-500">Recent transactions</span>
      <div className="flex flex-col gap-3">
        {mockWalletTransactions.map((tx, i) => (
          <div key={tx.id}>
            <TxRow tx={tx} />
            {i < mockWalletTransactions.length - 1 && (
              <hr className="border-t border-auth-left-bg mt-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
