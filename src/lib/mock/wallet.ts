import type {
  WalletStats,
  WalletCard,
  WalletTransaction,
  ChartDataPoint,
} from '@/types'

export const mockWalletStats: WalletStats = {
  availableBalance: '12,466$',
  pendingBalance:   '12,466$',
  totalSpending:    '12,466$',
}

export const mockWalletCard: WalletCard = {
  holderName: 'CARD HOLDER',
  balance:    '$5,756',
  last4:      '1234',
  validThru:  '12/22',
}

export const mockWalletTransactions: WalletTransaction[] = [
  { id: 'tx-1', label: 'Bounty - secureNest', date: '21 Jan 2026', amount: '-$850', direction: 'out' },
  { id: 'tx-2', label: 'Bounty - secureNest', date: '21 Jan 2026', amount: '+$459', direction: 'in' },
  { id: 'tx-3', label: 'Bounty - secureNest', date: '21 Jan 2026', amount: '-$850', direction: 'out' },
  { id: 'tx-4', label: 'Bounty - secureNest', date: '21 Jan 2026', amount: '+$459', direction: 'in' },
  { id: 'tx-5', label: 'Bounty - secureNest', date: '21 Jan 2026', amount: '-$850', direction: 'out' },
  { id: 'tx-6', label: 'Bounty - secureNest', date: '21 Jan 2026', amount: '+$459', direction: 'in' },
  { id: 'tx-7', label: 'Bounty - secureNest', date: '21 Jan 2026', amount: '+$459', direction: 'in' },
  { id: 'tx-8', label: 'Bounty - secureNest', date: '21 Jan 2026', amount: '+$459', direction: 'in' },
]

export const mockChartData: ChartDataPoint[] = [
  { date: 'Apr 14', income: 3000, expenses: 1500 },
  { date: 'Apr 15', income: 5500, expenses: 2000 },
  { date: 'Apr 16', income: 4000, expenses: 3000 },
  { date: 'Apr 17', income: 7000, expenses: 2500 },
  { date: 'Apr 18', income: 5500, expenses: 4000 },
  { date: 'Apr 19', income: 8000, expenses: 3500 },
  { date: 'Apr 20', income: 6000, expenses: 2000 },
]
