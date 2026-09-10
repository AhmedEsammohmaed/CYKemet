export default function CourseDetailLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="bg-white rounded-card w-full h-64" />
      <div className="flex gap-8 items-start">
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-card h-48" />
          <div className="bg-white rounded-card h-80" />
          <div className="bg-white rounded-card h-40" />
        </div>
        <div className="w-[385px] shrink-0 bg-white rounded-card h-72" />
      </div>
    </div>
  )
}
