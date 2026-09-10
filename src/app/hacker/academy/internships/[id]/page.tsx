'use client'

import { useEffect } from 'react'
import {
  Star,
  MapPin,
  Clock,
  Medal,
  Users,
  TrendingUp,
  CheckCircle,
  Calendar,
  CalendarClock,
  CalendarCheck,
  ListChecks,
  Wrench,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { mockInternshipDetail } from '@/lib/mock/academy'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-card w-full px-5.5 py-5 flex flex-col gap-5 ${className ?? ''}`}>
      {children}
    </div>
  )
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-h3 font-semibold text-content-500">{children}</p>
}

function SubSection({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-primary-500">{icon}</span>
        <p className="text-h4 font-medium text-primary-500">{label}</p>
      </div>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc ms-6 flex flex-col gap-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-body-lg font-medium text-content-500">{item}</li>
      ))}
    </ul>
  )
}

function LocationBadge({ location }: { location: string }) {
  const map: Record<string, string> = {
    remote: 'bg-success-50 text-success-600',
    'on-site': 'bg-error-50 text-error-600',
    hybrid: 'bg-warning-50 text-warning-600',
  }
  return (
    <span className={`px-3 py-1 rounded-full text-body-md font-semibold capitalize ${map[location] ?? 'bg-secondary-50 text-primary-500'}`}>
      {location}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const isPaid = status === 'paid'
  return (
    <span className={`px-3 py-1 rounded-full text-body-md font-semibold capitalize ${isPaid ? 'bg-primary-50 text-primary-500' : 'bg-success-50 text-success-600'}`}>
      {isPaid ? 'Paid' : 'Open'}
    </span>
  )
}

const GAIN_ICONS: Record<string, React.ReactNode> = {
  medal: <Medal size={24} />,
  users: <Users size={24} />,
  star: <Star size={24} />,
  trending: <TrendingUp size={24} />,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InternshipDetailPage() {
  const { setTitle } = useNav()
  const intern = mockInternshipDetail

  useEffect(() => { setTitle('Internship details') }, [setTitle])

  return (
    <div className="flex flex-col gap-6">

      {/* ── Hero card ── */}
      <div className="bg-white rounded-card w-full px-5.5 py-5 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <LocationBadge location={intern.location} />
          <StatusBadge status={intern.status} />
        </div>
        <h1 className="text-title-3 font-semibold text-content-500">{intern.title}</h1>
        <p className="text-h5 font-normal text-grey-main leading-[1.8]">{intern.description}</p>
        <div className="flex items-center gap-6 text-body-lg font-medium text-content-500">
          <span className="flex items-center gap-1.5"><MapPin size={18} />{intern.location}</span>
          <span className="flex items-center gap-1.5"><Clock size={18} />{intern.durationMonths} months</span>
          <span className="flex items-center gap-1.5"><Star size={18} />{intern.rating}</span>
        </div>
        <button
          type="button"
          className="self-start bg-primary-500 h-15 w-56.75 rounded-card text-white text-h3 font-semibold flex items-center justify-center"
        >
          Apply now
        </button>
      </div>

      {/* ── Full description ── */}
      <SectionCard>
        <CardTitle>About this internship</CardTitle>
        <p className="text-body-lg font-medium text-content-500 leading-[1.8] whitespace-pre-line">{intern.fullDescription}</p>
      </SectionCard>

      {/* ── What you will do ── */}
      <SectionCard>
        <SubSection icon={<ListChecks size={24} />} label="What you will do">
          <BulletList items={intern.whatYouWillDo} />
        </SubSection>
      </SectionCard>

      {/* ── Technical requirements ── */}
      <SectionCard>
        <SubSection icon={<Wrench size={24} />} label="Technical requirements">
          <BulletList items={intern.technicalRequirements} />
        </SubSection>
      </SectionCard>

      {/* ── What you will gain ── */}
      <SectionCard>
        <CardTitle>What you&apos;ll gain</CardTitle>
        <div className="flex flex-col gap-4">
          {intern.whatYouWillGain.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-[48px] h-[48px] rounded-card bg-secondary-50 flex items-center justify-center shrink-0 text-primary-500">
                {GAIN_ICONS[item.icon] ?? <CheckCircle size={24} />}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-h5 font-semibold text-content-500">{item.title}</p>
                <p className="text-body-md font-normal text-grey-main">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Timeline ── */}
      <SectionCard>
        <CardTitle>Timeline</CardTitle>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] rounded-card bg-secondary-50 flex items-center justify-center shrink-0 text-primary-500">
              <Calendar size={24} />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-body-md font-medium text-grey-main">Start date</p>
              <p className="text-h5 font-semibold text-content-500">{intern.timeline.startDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] rounded-card bg-secondary-50 flex items-center justify-center shrink-0 text-primary-500">
              <CalendarClock size={24} />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-body-md font-medium text-grey-main">End date</p>
              <p className="text-h5 font-semibold text-content-500">{intern.timeline.endDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[48px] rounded-card bg-error-50 flex items-center justify-center shrink-0 text-error-600">
              <CalendarCheck size={24} />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-body-md font-medium text-grey-main">Application deadline</p>
              <p className="text-h5 font-semibold text-content-500">{intern.timeline.applicationDeadline}</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── CTA ── */}
      <div className="bg-white rounded-card w-full px-[132px] py-[45px] flex flex-col items-center gap-4 text-center">
        <p className="text-[30px] font-extrabold text-primary-500">Ready to Start Your Journey?</p>
        <p className="text-body-lg font-normal text-grey-main">Applications are reviewed on a rolling basis. Apply early to secure your spot.</p>
        <button type="button" className="bg-primary-500 h-15 w-[341px] rounded-card text-white text-h3 font-medium flex items-center justify-center mt-2">
          Apply now
        </button>
      </div>
    </div>
  )
}
