'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { PillSwitcher } from '@/components/ui/PillSwitcher'
import type { WithdrawTab, BankWithdrawForm, EWalletWithdrawForm } from '@/types'

const WITHDRAW_TABS = [
  { value: 'bank' as WithdrawTab,    label: 'Bank transfer' },
  { value: 'ewallet' as WithdrawTab, label: 'E-Wallet' },
]

const inputCls = 'border border-grey-main rounded-card h-[60px] px-[32px] w-full text-body-lg bg-white focus:outline-none focus:border-primary-500'
const labelCls = 'block text-h5 font-medium text-content-500 mb-[8px]'
const fieldCls = 'mb-[32px]'

export function WithdrawFunds() {
  const [withdrawTab, setWithdrawTab] = useState<WithdrawTab>('bank')
  const [bankForm, setBankForm] = useState<BankWithdrawForm>({
    bank: '', accountName: '', accountNumber: '', iban: 'EGY78657899', swift: 'EGY78657899', amount: '',
  })
  const [ewalletForm, setEWalletForm] = useState<EWalletWithdrawForm>({
    provider: '', accountName: '', walletId: '', confirmWalletId: '', amount: '',
  })

  return (
    <div className="bg-white rounded-card px-[22px] py-[22px]">
      <h2 className="text-h3 font-semibold text-content-500 mb-6">Withdraw funds</h2>

      {/* Tab switcher */}
      <PillSwitcher<WithdrawTab>
        options={WITHDRAW_TABS}
        value={withdrawTab}
        onChange={setWithdrawTab}
        className="bg-secondary-50 mb-8"
      />

      {/* Bank transfer form */}
      {withdrawTab === 'bank' && (
        <div>
          <div className={fieldCls}>
            <label className={labelCls}>Bank *</label>
            <div className="relative">
              <select
                value={bankForm.bank}
                onChange={e => setBankForm(f => ({ ...f, bank: e.target.value }))}
                className={cn(inputCls, 'appearance-none pr-[48px]', !bankForm.bank && 'text-grey-main')}
              >
                <option value="" disabled>Choose your bank</option>
                <option value="cib">CIB</option>
                <option value="nbe">NBE</option>
                <option value="ahli">Al Ahli Bank</option>
              </select>
              <ChevronDown size={20} className="absolute end-[16px] top-1/2 -translate-y-1/2 text-grey-main pointer-events-none" />
            </div>
          </div>

          <div className={fieldCls}>
            <label className={labelCls}>Bank account name *</label>
            <input
              type="text"
              placeholder="Enter the full account name"
              value={bankForm.accountName}
              onChange={e => setBankForm(f => ({ ...f, accountName: e.target.value }))}
              className={inputCls}
            />
          </div>

          <div className={fieldCls}>
            <label className={labelCls}>Bank account number *</label>
            <input
              type="text"
              placeholder="Enter your bank account number"
              value={bankForm.accountNumber}
              onChange={e => setBankForm(f => ({ ...f, accountNumber: e.target.value }))}
              className={inputCls}
            />
          </div>

          <div className={cn(fieldCls, 'flex gap-[12px]')}>
            <div className="flex-1">
              <label className={labelCls}>IBAN *</label>
              <input
                type="text"
                placeholder="EGY78657899"
                value={bankForm.iban}
                onChange={e => setBankForm(f => ({ ...f, iban: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div className="flex-1">
              <label className={labelCls}>SWIFT *</label>
              <input
                type="text"
                placeholder="EGY78657899"
                value={bankForm.swift}
                onChange={e => setBankForm(f => ({ ...f, swift: e.target.value }))}
                className={inputCls}
              />
            </div>
          </div>

          <div className={fieldCls}>
            <label className={labelCls}>Amount *</label>
            <input
              type="text"
              placeholder="MAX amount to be transferred is 7896$"
              value={bankForm.amount}
              onChange={e => setBankForm(f => ({ ...f, amount: e.target.value }))}
              className={inputCls}
            />
          </div>
        </div>
      )}

      {/* E-Wallet form */}
      {withdrawTab === 'ewallet' && (
        <div>
          <div className={fieldCls}>
            <label className={labelCls}>Wallet provider *</label>
            <div className="relative">
              <select
                value={ewalletForm.provider}
                onChange={e => setEWalletForm(f => ({ ...f, provider: e.target.value }))}
                className={cn(inputCls, 'appearance-none pr-[48px]', !ewalletForm.provider && 'text-grey-main')}
              >
                <option value="" disabled>Choose your wallet provider</option>
                <option value="vodafone">Vodafone Cash</option>
                <option value="instapay">InstaPay</option>
                <option value="fawry">Fawry</option>
              </select>
              <ChevronDown size={20} className="absolute end-[16px] top-1/2 -translate-y-1/2 text-grey-main pointer-events-none" />
            </div>
          </div>

          <div className={fieldCls}>
            <label className={labelCls}>Wallet account name *</label>
            <input
              type="text"
              placeholder="Enter the full account name"
              value={ewalletForm.accountName}
              onChange={e => setEWalletForm(f => ({ ...f, accountName: e.target.value }))}
              className={inputCls}
            />
          </div>

          <div className={fieldCls}>
            <label className={labelCls}>Wallet ID *</label>
            <input
              type="text"
              placeholder="Enter your wallet ID"
              value={ewalletForm.walletId}
              onChange={e => setEWalletForm(f => ({ ...f, walletId: e.target.value }))}
              className={inputCls}
            />
          </div>

          <div className={fieldCls}>
            <label className={labelCls}>Confirm your wallet ID *</label>
            <input
              type="text"
              placeholder="Confirm your wallet ID"
              value={ewalletForm.confirmWalletId}
              onChange={e => setEWalletForm(f => ({ ...f, confirmWalletId: e.target.value }))}
              className={inputCls}
            />
          </div>

          <div className={fieldCls}>
            <label className={labelCls}>Amount *</label>
            <input
              type="text"
              placeholder="MAX amount to be transferred is 7896$"
              value={ewalletForm.amount}
              onChange={e => setEWalletForm(f => ({ ...f, amount: e.target.value }))}
              className={inputCls}
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => console.log('Withdraw', withdrawTab, withdrawTab === 'bank' ? bankForm : ewalletForm)}
        className="bg-primary-500 w-full h-[60px] rounded-card text-white text-h3 font-medium"
      >
        Withdraw funds
      </button>
    </div>
  )
}
