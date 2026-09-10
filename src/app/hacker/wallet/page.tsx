'use client'

import { useEffect } from 'react'
import { useNav } from '@/lib/context/NavContext'
import { BalanceStats } from './_components/BalanceStats'
import { WorkingCapitalChart } from './_components/WorkingCapitalChart'
import { WithdrawFunds } from './_components/WithdrawFunds'
import { MyCard } from './_components/MyCard'
import { RecentTransactions } from './_components/RecentTransactions'

export default function WalletPage() {
  const { setTitle } = useNav()
  useEffect(() => { setTitle('Wallet') }, [setTitle])

  return (
    <div className="flex gap-[29px] items-start">

      {/* Left column */}
      <div className="flex flex-col gap-6 w-[734px] min-w-0">
        <BalanceStats />
        <WorkingCapitalChart />
        <WithdrawFunds />
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-6 w-[351px] shrink-0">
        <MyCard />
        <RecentTransactions />
      </div>

    </div>
  )
}
