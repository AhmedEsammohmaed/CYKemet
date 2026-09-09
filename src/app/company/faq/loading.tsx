export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      {/* FAQ accordion skeleton */}
      <div
        className="bg-content-100 animate-pulse rounded-card"
        style={{ height: '438px' }}
      />
      {/* Contact support form skeleton */}
      <div
        className="bg-content-100 animate-pulse rounded-card"
        style={{ height: '847px' }}
      />
    </div>
  )
}
