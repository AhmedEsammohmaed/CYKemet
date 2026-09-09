export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Header card skeleton */}
      <div className="bg-white rounded-card px-[22px] pt-[22px] pb-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-5 bg-content-100 rounded" />
          <div className="h-7 w-40 bg-content-100 rounded" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-9 w-3/4 bg-content-100 rounded" />
          <div className="flex items-center gap-4">
            <div className="h-5 w-20 bg-content-100 rounded-full" />
            <div className="h-[22px] w-24 bg-content-100 rounded-[18px]" />
          </div>
        </div>
        <hr className="border-t border-content-100" />
        <div className="flex items-center gap-20">
          <div className="h-4 w-40 bg-content-100 rounded" />
          <div className="h-4 w-44 bg-content-100 rounded" />
          <div className="h-4 w-36 bg-content-100 rounded" />
        </div>
      </div>

      {/* Vulnerability details skeleton */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <div className="h-7 w-52 bg-content-100 rounded" />
        <div className="flex gap-[59px]">
          <div className="flex-1 h-[107px] bg-content-100 rounded-[12px]" />
          <div className="flex-1 h-[107px] bg-content-100 rounded-[12px]" />
        </div>
        <div className="h-[194px] bg-content-100 rounded-[12px]" />
        <div className="h-[312px] bg-content-100 rounded-[12px]" />
        <div className="h-[230px] bg-content-100 rounded-[12px]" />
        <div className="h-[169px] bg-content-100 rounded-[12px]" />
        <div className="h-[275px] bg-content-100 rounded-[12px]" />
      </div>

      {/* Attachments skeleton */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <div className="h-7 w-72 bg-content-100 rounded" />
        <div className="flex gap-[22px]">
          <div className="h-[140px] w-[426px] bg-content-100 rounded-[10px]" />
          <div className="h-[140px] w-[426px] bg-content-100 rounded-[10px]" />
        </div>
      </div>

      {/* Collaborators skeleton */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-6">
        <div className="h-7 w-36 bg-content-100 rounded" />
        <div className="flex items-center gap-[95px]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-3 items-center w-[130px]">
              <div className="size-[85px] rounded-full bg-content-100" />
              <div className="h-5 w-28 bg-content-100 rounded" />
              <div className="h-4 w-20 bg-content-100 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Activity skeleton */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <div className="h-7 w-28 bg-content-100 rounded" />
        <div className="flex flex-col gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="size-[72px] rounded-full bg-content-100 shrink-0" />
              <div className="flex flex-col gap-2 pt-1 flex-1">
                <div className="h-5 w-2/3 bg-content-100 rounded" />
                <div className="h-4 w-32 bg-content-100 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-[170px] bg-content-100 rounded-[12px]" />
        <div className="h-[60px] w-[227px] bg-content-100 rounded-[12px] self-end" />
      </div>

      {/* Report decisions skeleton */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <div className="h-7 w-44 bg-content-100 rounded" />
        <div className="flex gap-[59px]">
          <div className="flex-1 h-[60px] bg-content-100 rounded-[12px]" />
          <div className="flex-1 h-[60px] bg-content-100 rounded-[12px]" />
        </div>
        <div className="flex gap-[38px]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[128px] w-[180px] bg-content-100 rounded-[12px]" />
          ))}
        </div>
      </div>

      {/* Internal messages skeleton */}
      <div className="bg-white rounded-card px-[22px] py-[22px] flex flex-col gap-8">
        <div className="h-7 w-44 bg-content-100 rounded" />
        <div className="h-[127px] bg-content-100 rounded-[12px]" />
        <div className="h-[60px] w-[227px] bg-content-100 rounded-[12px] self-end" />
      </div>
    </div>
  )
}
