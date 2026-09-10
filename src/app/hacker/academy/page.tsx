'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Coins,
  GraduationCap,
  UsersRound,
  Clock4,
  Star,
  BookOpen,
  WalletMinimal,
  Gift,
  Medal,
  Building2,
  Clock,
  FileBadge,
  MapPin,
  Truck,
  Hourglass,
  X,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { cn } from '@/lib/utils/cn'
import {
  mockAcademyStats,
  mockAcademyCourses,
  mockSubscriptions,
  mockGifts,
  mockCertifications,
  mockInternships,
} from '@/lib/mock/academy'
import type {
  AcademyTab,
  AcademyCourse,
  AcademySubscription,
  AcademyGift,
  GiftRedemptionForm,
  AcademyCertification,
  AcademyInternship,
  GiftLevel,
  InternshipStatus,
} from '@/types'

// ─── Hero banner content per tab ──────────────────────────────────────────────

const heroBannerContent: Record<AcademyTab, { title: string; subtitle: string }> = {
  courses:        { title: 'Learn. Earn. Advance.',         subtitle: 'Use your points to access courses, subscriptions, and certifications' },
  subscriptions:  { title: 'Power up your toolkit',         subtitle: 'Subscribe to premium tools and platforms using your coins' },
  gifts:          { title: 'Your coins, your rewards',       subtitle: 'Exchange your points for branded merchandise and premium gear' },
  certifications: { title: 'Earn what sets you apart',       subtitle: 'Take verified exams designed to validate your security expertise and strengthen your professional profile' },
  internships:    { title: 'Launch your career',             subtitle: 'Explore internships that help you grow, learn, and stand out' },
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS: { id: AcademyTab; label: string; icon: React.ReactNode }[] = [
  { id: 'courses',        label: 'Courses',        icon: <BookOpen size={19} /> },
  { id: 'subscriptions',  label: 'Subscriptions',  icon: <WalletMinimal size={19} /> },
  { id: 'gifts',          label: 'Gifts',          icon: <Gift size={19} /> },
  { id: 'certifications', label: 'Certifications', icon: <Medal size={19} /> },
  { id: 'internships',    label: 'Internships',    icon: <Building2 size={19} /> },
]

// ─── Badges ───────────────────────────────────────────────────────────────────

function GiftLevelBadge({ level }: { level: GiftLevel }) {
  const styles: Record<GiftLevel, string> = {
    new:   'bg-[rgba(233,244,252,0.66)] border-[rgba(0,59,223,0.66)] text-primary-500',
    pro:   'bg-[rgba(253,225,155,0.66)] border-warning-500 text-warning-500',
    elite: 'bg-[rgba(252,207,214,0.66)] border-[rgba(244,63,93,0.66)] text-error-500',
  }
  return (
    <span className={cn(
      'inline-flex items-center justify-center rounded-[18px] px-[15px] h-[30px] text-body-md font-medium border-[1.5px] capitalize',
      styles[level]
    )}>
      {level}
    </span>
  )
}

function InternStatusBadge({ status }: { status: InternshipStatus }) {
  return (
    <span className="inline-flex items-center justify-center rounded-[18px] px-[29px] h-[30px] text-body-md font-medium bg-[rgba(233,244,252,0.66)] border border-[rgba(0,59,223,0.66)] text-primary-500 capitalize">
      {status}
    </span>
  )
}

// ─── Course Card ──────────────────────────────────────────────────────────────

interface CourseCardProps { course: AcademyCourse; onView: (id: string) => void }

function CourseCard({ course, onView }: CourseCardProps) {
  return (
    <div className="bg-white rounded-card w-full overflow-hidden flex flex-col">
      <div className="w-full h-51.75 shrink-0 relative flex flex-col items-end p-5.5">
        {course.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.thumbnailUrl} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 bg-linear-to-br from-secondary-50 to-primary-500 opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <GraduationCap size={64} className="text-primary-500 opacity-40" />
            </div>
          </>
        )}
        <div className="relative z-10">
          <DifficultyBadge difficulty={course.difficulty} />
        </div>
      </div>
      <div className="px-4.5 py-4.5 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <p className="text-h4 font-semibold text-content-500 line-clamp-1">{course.title}</p>
            <p className="text-body-md font-normal text-grey-main leading-[1.8] line-clamp-2">{course.description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-body-md font-normal text-grey-main">By: <span className="text-primary-500">{course.instructor}</span></p>
              <div className="flex items-center gap-1">
                <span className="text-h4 font-semibold text-content-500">{course.priceCoins}</span>
                <Coins size={19} className="text-warning-500" />
              </div>
            </div>
            <div className="flex items-center gap-5 text-body-sm font-normal text-grey-main">
              <span className="flex items-center gap-1"><UsersRound size={16} />{course.studentsCount.toLocaleString()}</span>
              <span className="flex items-center gap-1"><Clock4 size={14} />{course.durationWeeks} weeks</span>
              <span className="flex items-center gap-1"><Star size={14} />{course.rating}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="w-full h-12 border border-primary-500 rounded-card text-primary-500 text-[22px] font-medium flex items-center justify-center"
          onClick={() => onView(course.id)}
        >
          View details
        </button>
      </div>
    </div>
  )
}

// ─── Subscription Card ────────────────────────────────────────────────────────

interface SubscriptionCardProps { sub: AcademySubscription; onSubscribe: (id: string) => void }

function SubscriptionCard({ sub, onSubscribe }: SubscriptionCardProps) {
  return (
    <div className="bg-white rounded-card p-[20px] flex flex-col gap-3">
      <DifficultyBadge difficulty={sub.level} className="self-start" />
      <p className="text-h4 font-semibold text-content-500">{sub.name}</p>
      <p className="text-body-lg font-normal text-grey-main leading-[1.6] line-clamp-3">{sub.description}</p>
      <div className="flex items-center gap-6 text-body-lg font-medium text-content-500">
        <span className="flex items-center gap-1.5"><UsersRound size={19} />{sub.subscribersCount.toLocaleString()}</span>
        <span className="flex items-center gap-1.5"><Star size={19} />{sub.rating}</span>
        <span className="flex items-center gap-1.5"><Clock4 size={19} />{sub.durationWeeks} weeks</span>
      </div>
      <div className="flex items-center gap-[26px] mt-1">
        <button
          type="button"
          className="bg-primary-500 h-[60px] w-[227px] rounded-card text-white text-h3 font-medium flex items-center justify-center shrink-0"
          onClick={() => onSubscribe(sub.id)}
        >
          Subscribe now
        </button>
        <div className="flex items-center gap-1.5">
          <span className="text-h2 font-semibold text-primary-500">{sub.priceCoins.toLocaleString()}</span>
          <Coins size={25} className="text-warning-500" />
        </div>
      </div>
    </div>
  )
}

// ─── Gift Card ────────────────────────────────────────────────────────────────

interface GiftCardProps { gift: AcademyGift; onRedeem: (id: string) => void }

function GiftCard({ gift, onRedeem }: GiftCardProps) {
  return (
    <div className="bg-white rounded-card w-[404px] p-[20px] flex flex-col">
      <GiftLevelBadge level={gift.level} />
      <div className="w-full h-[66px] bg-auth-left-bg rounded-btn flex items-center justify-center mt-[8px]">
        <Gift size={40} className="text-grey-main" />
      </div>
      <p className="text-h5 font-semibold text-content-500 mt-[8px]">{gift.name}</p>
      <p className="text-body-md font-normal text-grey-main line-clamp-2 mt-[4px]">{gift.description}</p>
      <div className="flex items-center justify-between mt-[12px]">
        <div className="flex items-center gap-1">
          <span className="text-h4 font-semibold text-content-500">{gift.priceCoins}</span>
          <Coins size={23} className="text-warning-500" />
        </div>
        <div className="flex items-center gap-[8px] text-body-md font-medium text-grey-main">
          <span className="flex items-center gap-1"><Truck size={14} />Physical delivery</span>
          <span className="flex items-center gap-1"><Hourglass size={14} />{gift.deliveryDays}-Day delivery</span>
          <span className="flex items-center gap-1"><Star size={14} />{gift.rating}</span>
        </div>
      </div>
      <button
        type="button"
        className="bg-primary-500 w-full h-[60px] rounded-card text-white text-h4 font-medium flex items-center justify-center mt-[16px]"
        onClick={() => onRedeem(gift.id)}
      >
        Redeem gift
      </button>
    </div>
  )
}

// ─── Gift Modal ───────────────────────────────────────────────────────────────

interface GiftModalProps {
  open: boolean
  giftId: string | null
  form: GiftRedemptionForm
  onChange: (field: keyof GiftRedemptionForm, value: string) => void
  onConfirm: () => void
  onClose: () => void
}

function GiftModal({ open, giftId, form, onChange, onConfirm, onClose }: GiftModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-modal w-[757px] p-[42px] relative">
        <button
          type="button"
          className="absolute top-[42px] right-[42px] cursor-pointer text-content-500 hover:text-primary-500 transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <p className="text-h3 font-semibold text-content-500">Confirm delivery details</p>
          <p className="text-body-lg font-normal text-grey-main mt-[8px]">We&apos;ll use this info to deliver your reward</p>
        </div>
        <div className="flex flex-col gap-[32px] mt-[32px]">
          {([
            { field: 'fullName',    label: 'Full name',         placeholder: 'Enter your full name' },
            { field: 'address',     label: 'Delivery address',  placeholder: 'Enter your delivery address' },
            { field: 'phoneNumber', label: 'Phone number',      placeholder: 'Enter your phone number' },
          ] as { field: keyof GiftRedemptionForm; label: string; placeholder: string }[]).map(({ field, label, placeholder }) => (
            <div key={field} className="flex flex-col gap-2">
              <label className="text-h5 font-medium text-content-500">{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                value={form[field]}
                onChange={(e) => onChange(field, e.target.value)}
                className="border border-grey-main h-[60px] rounded-card px-[32px] text-body-lg outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="bg-primary-500 w-full h-[60px] rounded-card text-white text-h3 font-medium flex items-center justify-center mt-[32px]"
          onClick={() => { console.log('Redeemed', giftId, form); onConfirm() }}
        >
          Confirm redemption
        </button>
      </div>
    </div>
  )
}

// ─── Certification Card ───────────────────────────────────────────────────────

interface CertificationCardProps { cert: AcademyCertification; onView: (id: string) => void }

function CertificationCard({ cert, onView }: CertificationCardProps) {
  return (
    <div className="bg-white rounded-card w-[404px] h-[302px] p-[20px] flex flex-col">
      <DifficultyBadge difficulty={cert.level} className="self-start" />
      <p className="text-h5 font-semibold text-content-500 mt-[12px] line-clamp-1">{cert.title}</p>
      <p className="text-body-md font-normal text-grey-main line-clamp-2 mt-[8px]">{cert.description}</p>
      <div className="flex items-center justify-between mt-[12px]">
        <div className="flex items-center gap-[12px] text-body-md font-medium text-grey-main">
          <span className="flex items-center gap-1"><Clock size={16} />{cert.durationHours} hours</span>
          <span className="flex items-center gap-1"><FileBadge size={16} />{cert.format}</span>
          <span className="flex items-center gap-1"><Star size={14} />{cert.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-h4 font-semibold text-content-500">{cert.priceCoins}</span>
          <Coins size={23} className="text-warning-500" />
        </div>
      </div>
      <button
        type="button"
        className="bg-primary-500 w-full h-[48px] rounded-card text-white text-h4 font-medium flex items-center justify-center mt-auto"
        onClick={() => onView(cert.id)}
      >
        View details
      </button>
    </div>
  )
}

// ─── Internship Card ──────────────────────────────────────────────────────────

interface InternshipCardProps { intern: AcademyInternship; onView: (id: string) => void }

function InternshipCard({ intern, onView }: InternshipCardProps) {
  const locationLabel: Record<AcademyInternship['location'], string> = {
    remote: 'Remote', 'on-site': 'On-site', hybrid: 'Hybrid',
  }
  return (
    <div className="bg-white rounded-card w-full h-[143px] px-[22px] py-[24px] flex items-center justify-between">
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-[12px]">
          <p className="text-h4 font-semibold text-content-500">{intern.title}</p>
          <InternStatusBadge status={intern.status} />
        </div>
        <p className="text-body-lg font-normal text-grey-main mt-[8px] line-clamp-1">{intern.description}</p>
        <div className="flex items-center gap-[24px] mt-[12px] text-body-md font-normal text-content-500">
          <span className="flex items-center gap-1"><MapPin size={14} />{locationLabel[intern.location]}</span>
          <span className="flex items-center gap-1"><Clock4 size={14} />{intern.durationMonths} months</span>
          <span className="flex items-center gap-1"><Star size={14} />{intern.rating}</span>
        </div>
      </div>
      <button
        type="button"
        className="bg-primary-500 h-[60px] w-[227px] rounded-card text-white text-h4 font-medium flex items-center justify-center shrink-0 ms-[24px]"
        onClick={() => onView(intern.id)}
      >
        View details
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AcademyPage() {
  const { setTitle } = useNav()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AcademyTab>('courses')
  const [giftModalOpen, setGiftModalOpen] = useState(false)
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null)
  const [giftForm, setGiftForm] = useState<GiftRedemptionForm>({ fullName: '', address: '', phoneNumber: '' })

  useEffect(() => { setTitle('CyAcademy') }, [setTitle])

  function handleGiftRedeem(id: string) {
    setSelectedGiftId(id)
    setGiftModalOpen(true)
  }

  function handleGiftConfirm() {
    setGiftModalOpen(false)
    setGiftForm({ fullName: '', address: '', phoneNumber: '' })
    setSelectedGiftId(null)
  }

  const banner = heroBannerContent[activeTab]

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* ── Section 1: Hero banner ── */}
        <div className="bg-white rounded-card w-full h-52.5 px-5.5 py-4.5 flex items-center">
          <div className="flex flex-col gap-3 max-w-126.5">
            <div className="flex flex-col gap-3">
              <h1 className="text-h3 font-semibold text-content-500">{banner.title}</h1>
              <p className="text-body-lg font-normal text-grey-main">{banner.subtitle}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[48px] font-bold text-content-500 leading-none">
                  {mockAcademyStats.coinsAvailable.toLocaleString()}
                </span>
                <Coins size={40} className="text-warning-500" />
              </div>
              <p className="text-body-lg font-normal text-grey-main">Coins available</p>
            </div>
          </div>
        </div>

        {/* ── Section 2: Tab pills ── */}
        <div className="flex items-center gap-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1 h-11.75 px-5.5 rounded-[17px]',
                'text-h4 font-medium border-[1.5px] transition-colors duration-150',
                activeTab === tab.id
                  ? 'bg-secondary-50 border-[rgba(0,59,223,0.66)] text-primary-500'
                  : 'bg-[rgba(232,246,255,0.6)] border-grey-main text-grey-main'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Section 3: Tab content ── */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-2 gap-6">
            {mockAcademyCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onView={(id) => router.push('/hacker/academy/' + id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="grid grid-cols-2 gap-[24px]">
            {mockSubscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                sub={sub}
                onSubscribe={(id) => router.push('/hacker/academy/subscriptions/' + id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'gifts' && (
          <div className="grid grid-cols-3 gap-[24px]">
            {mockGifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} onRedeem={handleGiftRedeem} />
            ))}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="grid grid-cols-3 gap-[24px]">
            {mockCertifications.map((cert) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                onView={(id) => router.push('/hacker/academy/certifications/' + id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'internships' && (
          <div className="flex flex-col gap-[16px]">
            {mockInternships.map((intern) => (
              <InternshipCard
                key={intern.id}
                intern={intern}
                onView={(id) => router.push('/hacker/academy/internships/' + id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Gift redemption modal ── */}
      <GiftModal
        open={giftModalOpen}
        giftId={selectedGiftId}
        form={giftForm}
        onChange={(field, value) => setGiftForm((prev) => ({ ...prev, [field]: value }))}
        onConfirm={handleGiftConfirm}
        onClose={() => { setGiftModalOpen(false); setSelectedGiftId(null) }}
      />
    </>
  )
}
