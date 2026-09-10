'use client'

import { useEffect } from 'react'
import {
  Coins,
  Clock,
  FileBadge,
  Star,
  Target,
  PackageCheck,
  TriangleAlert,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { mockCertificationDetail, mockHackerCoinsBalance } from '@/lib/mock/academy'

// ─── Shared sub-components ────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CertificationDetailPage() {
  const { setTitle } = useNav()
  const cert = mockCertificationDetail
  const balance = mockHackerCoinsBalance

  useEffect(() => { setTitle('Certificate details') }, [setTitle])

  return (
    <div className="flex flex-col gap-6">

      {/* ── Hero card ── */}
      <div className="bg-white rounded-card w-full px-5 py-5.5 flex flex-col gap-5">
        <DifficultyBadge difficulty={cert.level} className="self-start" />
        <h1 className="text-title-3 font-semibold text-content-500">{cert.title}</h1>
        <p className="text-h5 font-normal text-grey-main leading-[1.8]">
          Issued by: <span className="text-primary-500">{cert.issuedBy}</span>
        </p>
        <p className="text-h5 font-normal text-grey-main leading-[1.8]">{cert.fullDescription}</p>
        <div className="flex items-center gap-2.5 text-body-lg font-normal text-content-500">
          <span className="flex items-center gap-1"><Clock size={19} />{cert.durationHours} hours</span>
          <span className="flex items-center gap-1"><FileBadge size={19} />{cert.format}</span>
          <span className="flex items-center gap-1"><Star size={19} />{cert.rating}</span>
        </div>
        <div className="flex items-center gap-6">
          <button type="button" className="bg-primary-500 h-15 w-56.75 rounded-card text-white text-h3 font-semibold flex items-center justify-center">
            Get exam code
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-h2 font-semibold text-primary-500">{cert.priceCoins.toLocaleString()}</span>
            <Coins size={24} className="text-warning-500" />
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex gap-8 items-start">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">

          {/* Card A — Overview */}
          <SectionCard>
            <CardTitle>Overview</CardTitle>
            <p className="text-body-lg font-medium text-content-500 leading-[1.8]">{cert.overview}</p>
            <p className="text-h5 font-normal text-grey-main leading-[1.8]">
              After purchasing,{' '}
              <span className="text-primary-500 font-extrabold">
                you&apos;ll receive an exclusive 70% discount code
              </span>{' '}
              {cert.discountNote.replace("you'll receive an exclusive 70% discount code", '').trim()}
            </p>
          </SectionCard>

          {/* Card B — Topics tested on */}
          <SectionCard>
            <CardTitle>What you&apos;ll be tested on</CardTitle>
            <div className="flex flex-wrap gap-[17px]">
              {cert.topicsTestedOn.map((topic, i) => (
                <span
                  key={i}
                  className="bg-secondary-50 border border-primary-500 rounded-card h-[40px] px-4 py-1 text-h5 font-normal text-primary-500 flex items-center"
                >
                  {topic}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* Card C — Requirements */}
          <SectionCard>
            <CardTitle>Requirements &amp; Prerequisites</CardTitle>
            <SubSection icon={<Target size={24} />} label="Required Knowledge">
              <BulletList items={cert.requiredKnowledge} />
            </SubSection>
            <hr className="border-t border-[#e5e5e5]" />
            <SubSection icon={<PackageCheck size={24} />} label="Recommended Background">
              <BulletList items={cert.recommendedBackground} />
            </SubSection>
          </SectionCard>

          {/* Card D — Retake policy */}
          <SectionCard>
            <CardTitle>Retake policy</CardTitle>
            <div className="flex flex-col gap-4">
              {cert.retakePolicy.map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="w-[30px] h-[30px] rounded-full bg-secondary-50 flex items-center justify-center shrink-0">
                    <span className="text-h5 font-semibold text-primary-500">{step.step}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-h5 font-medium text-content-500">{step.title}</p>
                    <p className="text-body-md font-normal text-grey-main">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Card E — CTA */}
          <div className="bg-white rounded-card w-full px-[132px] py-[45px] flex flex-col items-center gap-4 text-center">
            <p className="text-[30px] font-extrabold text-primary-500">Ready to Get Certified?</p>
            <p className="text-body-lg font-normal text-grey-main">You can start the exam anytime. No scheduling required</p>
            <button type="button" className="bg-primary-500 h-15 w-[341px] rounded-card text-white text-h3 font-medium flex items-center justify-center mt-2">
              Get exam code
            </button>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="w-96.25 shrink-0">
          <div className="bg-white rounded-card px-5.5 py-5 flex flex-col gap-5">
            <p className="text-h3 font-semibold text-content-500">Certificate summary</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-title-3 font-bold text-primary-500 leading-none">{cert.priceCoins.toLocaleString()}</span>
                <Coins size={26} className="text-warning-500" />
              </div>
              <p className="text-label-xs font-medium text-grey-main">Bounty coins</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-body-md font-medium text-grey-main">Your balance</p>
              <div className="flex items-center gap-1">
                <span className="text-body-lg font-semibold text-content-500">{balance.toLocaleString()}</span>
                <Coins size={16} className="text-warning-500" />
              </div>
            </div>
            <button type="button" className="w-full h-15 bg-primary-500 rounded-card text-white text-h3 font-medium flex items-center justify-center">
              Get exam code
            </button>
            <div className="flex items-center gap-2">
              <TriangleAlert size={16} className="text-primary-500 shrink-0" />
              <p className="text-label-2xs font-semibold text-primary-500">Points will be deducted immediately after starting the exam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
