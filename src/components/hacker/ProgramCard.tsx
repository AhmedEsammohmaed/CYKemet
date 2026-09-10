import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'
import { ProgramTypeTag } from '@/components/ui/ProgramTypeTag'
import type { Program } from '@/types'

export interface ProgramCardProps {
  program: Program
  className?: string
}

function CompanyLogoFallback({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="size-[80px] rounded-full bg-primary-500 flex items-center justify-center border-[3px] border-white">
      <span className="text-white text-[20px] font-semibold">{initials}</span>
    </div>
  )
}

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-[12px] w-[522px] h-[436px] flex flex-col overflow-hidden',
        className
      )}
    >
      {/* ── Banner ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[123px] w-full shrink-0 bg-[#d9d9d9] rounded-tl-[12px] rounded-tr-[12px]">
        {program.bannerImage && (
          <Image
            src={program.bannerImage}
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-col flex-1 px-[38px] pb-6">

        {/* Company logo — overlaps banner */}
        <div className="absolute -top-[40px] left-[40px]">
          {program.companyLogo ? (
            <Image
              src={program.companyLogo}
              alt={program.companyName}
              width={80}
              height={80}
              className="rounded-full object-cover size-[80px] border-[3px] border-white"
              unoptimized
            />
          ) : (
            <CompanyLogoFallback name={program.companyName} />
          )}
        </div>

        {/* Activity badge — absolute top-right of body */}
        <div className="absolute top-4 end-[38px]">
          <span
            className={cn(
              'inline-flex items-center h-[22px] px-[12px] rounded-[18px]',
              'text-[12px] font-medium border',
              program.isActive
                ? 'bg-[rgba(169,239,195,0.66)] border-[rgba(74,222,128,0.66)] text-[#4ade80]'
                : 'bg-[#fccfd6] border-[rgba(244,63,93,0.66)] text-[#f43f5d]'
            )}
          >
            {program.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Spacer to clear the logo overlap */}
        <div className="pt-[50px]" />

        {/* Program name */}
        <p className="text-[20px] font-semibold text-[#1c1d1d] leading-tight mb-2">
          {program.name}
        </p>

        {/* Description */}
        <p
          className="text-[12px] text-[#85a0b2] mb-4 line-clamp-2"
          style={{ lineHeight: '110.25%' }}
        >
          {program.description}
        </p>

        {/* Type tags */}
        <div className="flex items-center gap-[14px] mb-4 flex-wrap">
          {program.scopeTypes.map((scope) => (
            <ProgramTypeTag key={scope} type={scope} />
          ))}
          <ProgramTypeTag type="date" date={program.endsAt} />
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[12px] font-medium text-[#85a0b2]">Bounty</p>
            <p className="text-[18px] font-semibold text-[#1c1d1d]">
              {program.bountyMin}$ – {program.bountyMax}$
            </p>
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#85a0b2]">Total reports</p>
            <p className="text-[18px] font-semibold text-[#1c1d1d]">{program.totalReports}</p>
          </div>
        </div>

        {/* CTA button */}
        <Link
          href={`/hacker/programs/${program.id}`}
          className={cn(
            'block w-full h-[48px] rounded-[12px] mt-auto',
            'border-[0.8px] border-[#003bdf] bg-white',
            'flex items-center justify-center',
            'text-[22px] font-medium text-[#003bdf]',
            'hover:bg-[#e9f4fc] transition-colors duration-150'
          )}
        >
          Program overview
        </Link>
      </div>
    </div>
  )
}
