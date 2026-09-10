'use client'

import { useEffect } from 'react'
import {
  Coins,
  UsersRound,
  Clock4,
  Star,
  Target,
  PackageCheck,
  Wrench,
  Key,
  AlignVerticalJustifyEnd,
  Lightbulb,
  TrendingUp,
  Clock,
  RotateCcw,
  CircleAlert,
  TriangleAlert,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { mockSubscriptionDetail, mockHackerCoinsBalance } from '@/lib/mock/academy'
import type { SubscriptionLevel } from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-card px-[22px] py-[20px] flex flex-col gap-5 ${className ?? ''}`}>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
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
    <ul className="list-disc ms-[24px] flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="text-body-lg font-medium text-content-500">{item}</li>
      ))}
    </ul>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SubscriptionDetailPage() {
  const { setTitle } = useNav()
  const sub = mockSubscriptionDetail

  useEffect(() => { setTitle('Subscription details') }, [setTitle])

  return (
    <div className="flex flex-col gap-6">

      {/* ── Hero card ── */}
      <div className="bg-white rounded-card w-full px-[22px] py-[20px] flex flex-col gap-4">
        <DifficultyBadge difficulty={sub.level} className="self-start" />
        <h1 className="text-title-3 font-semibold text-content-500">{sub.name}</h1>
        <p className="text-h5 font-normal text-grey-main leading-[1.8]">{sub.description}</p>
        <div className="flex items-center gap-6 text-body-lg font-medium text-content-500">
          <span className="flex items-center gap-1.5"><UsersRound size={19} />{sub.subscribersCount.toLocaleString()}</span>
          <span className="flex items-center gap-1.5"><Star size={19} />{sub.rating}</span>
          <span className="flex items-center gap-1.5"><Clock4 size={19} />{sub.durationWeeks} weeks</span>
        </div>
        <div className="flex items-center gap-[26px]">
          <button
            type="button"
            className="bg-primary-500 h-[60px] w-[227px] rounded-card text-white text-h3 font-medium flex items-center justify-center"
          >
            Subscribe now
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-h2 font-semibold text-primary-500">{sub.priceCoins.toLocaleString()}</span>
            <Coins size={25} className="text-warning-500" />
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex gap-6 items-start">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">

          {/* Card A — About */}
          <SectionCard>
            <SectionTitle>About this subscription</SectionTitle>
            <p className="text-h5 font-medium text-content-500 leading-[1.8] whitespace-pre-line">{sub.about}</p>
            <hr className="border-t border-[#e5e5e5]" />
            <SectionTitle>What you&apos;ll get access to</SectionTitle>
            <ul className="flex flex-col gap-4">
              {sub.whatYouGetAccess.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Target size={24} className="text-primary-500 shrink-0 mt-0.5" />
                  <p className="text-h5 font-medium text-content-500">{item}</p>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Card B — Technical requirements */}
          <SectionCard>
            <SectionTitle>Technical requirements</SectionTitle>
            <SubSection icon={<PackageCheck size={24} />} label="Prerequisites">
              <BulletList items={sub.prerequisites} />
            </SubSection>
            <SubSection icon={<Wrench size={24} />} label="Recommended tools">
              <BulletList items={sub.recommendedTools} />
            </SubSection>
            <SubSection icon={<Key size={24} />} label="System & Access Requirements">
              <BulletList items={sub.systemRequirements} />
            </SubSection>
          </SectionCard>

          {/* Card C — Labs & features */}
          <SectionCard>
            <SectionTitle>Labs &amp; features</SectionTitle>
            <SubSection icon={<AlignVerticalJustifyEnd size={24} />} label="Lab Environment">
              <p className="text-h5 text-content-500">
                <span className="font-semibold text-grey-main">Total labs: </span>
                <span className="font-medium">{sub.labEnvironment.totalLabs}</span>
              </p>
              <div className="flex items-center gap-3">
                <span className="text-h5 font-semibold text-grey-main">Difficulty:</span>
                <div className="flex items-center gap-2">
                  {sub.labEnvironment.difficulties.map((d) => (
                    <DifficultyBadge key={d} difficulty={d as SubscriptionLevel} />
                  ))}
                </div>
              </div>
            </SubSection>
            <hr className="border-t border-[#e5e5e5]" />
            <SubSection icon={<Lightbulb size={24} />} label="Real world scenarios">
              <BulletList items={sub.labEnvironment.realWorldScenarios} />
            </SubSection>
            <SubSection icon={<TrendingUp size={24} />} label="Progress tracking & scoring">
              <BulletList items={sub.labEnvironment.progressFeatures} />
            </SubSection>
          </SectionCard>

          {/* Card D — Subscription details */}
          <SectionCard>
            <SectionTitle>Subscription Details</SectionTitle>
            <SubSection icon={<Clock size={24} />} label="Access duration">
              <p className="text-body-lg font-medium text-content-500">{sub.accessDuration}</p>
            </SubSection>
            <SubSection icon={<RotateCcw size={24} />} label="Renewal & expiry policy">
              <BulletList items={sub.renewalPolicy} />
            </SubSection>
            <SubSection icon={<CircleAlert size={24} />} label="Refund Policy">
              <p className="text-body-lg font-medium text-content-500">{sub.refundPolicy}</p>
            </SubSection>
          </SectionCard>

          {/* Card E — Career impact */}
          <SectionCard>
            <SectionTitle>Career impact</SectionTitle>
            <p className="text-h5 font-medium text-content-500 leading-[1.8]">{sub.careerImpact}</p>
          </SectionCard>
        </div>

        {/* ── Right sidebar ── */}
        <div className="w-[385px] shrink-0">
          <div className="bg-white rounded-card px-[22px] py-[20px] flex flex-col gap-4">
            <SectionTitle>Subscription summary</SectionTitle>
            <div>
              <div className="flex items-end gap-2">
                <span className="text-title-3 font-bold text-primary-500 leading-none">{sub.priceCoins.toLocaleString()}</span>
                <Coins size={26} className="text-warning-500 mb-0.5" />
              </div>
              <p className="text-body-sm font-medium text-grey-main mt-1">Bounty coins</p>
            </div>
            <div className="flex items-center justify-between text-body-md font-medium text-grey-main">
              <span>Your balance</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-content-500">{mockHackerCoinsBalance.toLocaleString()}</span>
                <Coins size={14} className="text-warning-500" />
              </div>
            </div>
            <button
              type="button"
              className="bg-primary-500 w-full h-[60px] rounded-card text-white text-h3 font-medium flex items-center justify-center"
            >
              Subscribe now
            </button>
            <div className="flex items-center gap-2 text-label-2xs font-semibold text-primary-500">
              <TriangleAlert size={16} />
              <span>Points will be deducted immediately after subscription</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
