import { mockWalletCard } from '@/lib/mock/wallet'

export function MyCard() {
  return (
    <div className="bg-white rounded-card p-[22px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-h3 font-semibold text-content-500">My Card</span>
        <button
          type="button"
          onClick={() => console.log('Add card')}
          className="text-body-lg font-medium text-primary-500"
        >
          + Add Card
        </button>
      </div>

      <div
        className="w-full h-[225px] rounded-modal relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #003bdf 0%, #0029a3 100%)' }}
      >
        {/* Top */}
        <div className="absolute top-[20px] start-[20px] end-[20px] flex justify-between items-start">
          <div className="flex flex-col gap-[2px]">
            <span className="text-body-sm text-white/50">Balance</span>
            <span className="text-h4 font-bold text-white">{mockWalletCard.balance}</span>
          </div>
          <div className="size-[35px] rounded-badge bg-white/40" />
        </div>

        {/* Middle */}
        <div className="absolute top-[90px] start-[20px] flex flex-col gap-[2px]">
          <span className="text-[10px] text-white/50">CARD HOLDER</span>
          <span className="text-body-md font-medium text-white">{mockWalletCard.holderName}</span>
        </div>
        <div className="absolute top-[90px] end-[20px] flex flex-col gap-[2px] text-end">
          <span className="text-[10px] text-white/50">VALID THRU</span>
          <span className="text-body-md font-medium text-white">{mockWalletCard.validThru}</span>
        </div>

        {/* Bottom strip */}
        <div className="absolute bottom-0 start-0 end-0 h-[70px] bg-black/20 rounded-b-[16px] flex items-center justify-between px-[20px]">
          <span className="text-h4 font-semibold text-white tracking-widest">
            3778 **** **** {mockWalletCard.last4}
          </span>
          <div className="relative flex items-center w-[48px] h-[30px]">
            <div className="size-[30px] rounded-full bg-[#eb5505] absolute start-0 opacity-90" />
            <div className="size-[30px] rounded-full bg-[#c00] absolute start-[18px] opacity-90" />
          </div>
        </div>
      </div>
    </div>
  )
}
