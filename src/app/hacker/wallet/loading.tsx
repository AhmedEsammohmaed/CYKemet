export default function WalletLoading() {
  return (
    <div className="flex gap-4 items-start animate-pulse">
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white rounded-card h-24.75" />
        <div className="bg-white rounded-card h-72.75" />
        <div className="bg-white rounded-card h-150" />
      </div>
      <div className="w-87.75 shrink-0 flex flex-col gap-5.5">
        <div className="bg-white rounded-card h-56.25" />
        <div className="bg-white rounded-card h-125" />
      </div>
    </div>
  )
}
