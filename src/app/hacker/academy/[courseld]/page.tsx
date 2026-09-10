'use client'

import { useEffect } from 'react'
import {
  Coins,
  Target,
  ChevronRight,
  Users,
  Star,
  Clock,
  BookOpen,
  Linkedin,
  Github,
  User,
} from 'lucide-react'
import { useNav } from '@/lib/context/NavContext'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'
import { mockCourseDetail, mockHackerCoinsBalance } from '@/lib/mock/academy'
import type { CourseModule } from '@/types'

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-card w-full px-5.5 py-5.5 flex flex-col gap-5">
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-h3 font-semibold text-content-500">{children}</p>
  )
}

function ModuleRow({ index, module, isLast }: { index: number; module: CourseModule; isLast: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="text-primary-500 font-zcool text-h4">{index+1}</div>
          <p className="text-h5 font-medium text-content-500">{module.title}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-body-md font-normal text-grey-main">{module.duration}</span>
          <ChevronRight size={16} className="text-grey-main" />
        </div>
      </div>
      {!isLast && <hr className="border-content-100" />}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const { setTitle } = useNav()
  const course = mockCourseDetail
  const balance = mockHackerCoinsBalance

  useEffect(() => {
    setTitle(course.title)
  }, [setTitle, course.title])

  return (
    <div className="flex flex-col gap-6">

      {/* ── Hero card ── */}
      <div className="bg-white rounded-card w-full px-5.5 py-5 flex flex-col gap-5">
        {/* Level badge */}
        <DifficultyBadge difficulty={course.level} className="self-start" />

        {/* Title */}
        <h1 className="text-title-3 font-semibold text-content-500">
          {course.title}
        </h1>

        {/* Description */}
        <p className="text-h5 font-normal text-grey-main leading-[1.7]">
          {course.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-6 text-body-lg font-medium text-content-500">
          <span className="flex items-center gap-1.5">
            <Users size={19} className="text-content-500" />
            {course.studentsCount.toLocaleString()} students
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={19} className="text-warning-500" />
            {course.rating} rating
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={19} className="text-content-500" />
            {course.durationWeeks} weeks
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen size={19} className="text-content-500" />
            {course.instructor.name}
          </span>
        </div>

        {/* Enroll row */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="h-15 w-56.75 bg-primary-500 rounded-card text-white text-h3 font-semibold flex items-center justify-center"
          >
            Enroll now
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-h2 font-semibold text-primary-500">
              {course.priceCoins.toLocaleString()}
            </span>
            <Coins size={24} className="text-warning-500" />
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex gap-8 items-start">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-6 flex-1 min-w-0">

          {/* Card A — What you will learn */}
          <SectionCard>
            <div className="flex items-center gap-2">
              <SectionTitle>What you will learn</SectionTitle>
            </div>
            <ul className="flex flex-col gap-6">
              {course.whatYouWillLearn.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Target size={24} className="text-primary-500 shrink-0" />
                  <p className="text-h5 font-normal text-content-500 leading-[1.7]">{item}</p>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Card B — Course curriculum */}
          <SectionCard>
            <div className="flex items-center gap-2">
              <SectionTitle>Course curriculum</SectionTitle>
            </div>
            <div className="flex text-grey-main items-center gap-4.25">
              <span className="text-body-lg font-normal">
                {course.totalModules} modules
              </span>
              <span className="size-1.5 rounded-full bg-grey-main" aria-hidden="true" />
              <span className="text-body-lg font-normal">
                {course.totalLessons} lessons
              </span>
            </div>
            <div className="flex flex-col">
              {course.modules.map((mod, i) => (
                <ModuleRow
                  key={mod.id}
                  index={i}
                  module={mod}
                  isLast={i === course.modules.length - 1}
                />
              ))}
            </div>
          </SectionCard>

          {/* Card C — Instructor */}
          <SectionCard>
            <SectionTitle>Your instructor</SectionTitle>
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-22 h-22 rounded-full bg-secondary-50 shrink-0 flex items-center justify-center overflow-hidden">
                {course.instructor.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={course.instructor.avatarUrl}
                    alt={course.instructor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-primary-500 opacity-50" />
                )}
              </div>
              {/* Info */}
              <div className="flex flex-col gap-2">
                <p className="text-h5 font-medium text-content-500">{course.instructor.name}</p>
                <p className="text-body-md font-normal text-primary-500">{course.instructor.title}</p>
                <p className="text-label-xs font-normal text-grey-main leading-[1.7]">
                  {course.instructor.bio}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <a
                    href={course.instructor.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-content-500 hover:text-primary-500 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href={course.instructor.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-content-500 hover:text-primary-500 transition-colors"
                  >
                    <Github size={24} />
                  </a>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Card D — Requirements */}
          <SectionCard>
            <SectionTitle>Requirements</SectionTitle>
            <ul className="flex flex-col gap-3">
              {course.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2.25 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  <p className="text-h5 font-normal text-content-500 leading-[1.7]">{req}</p>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Card E — CTA */}
          <SectionCard>
            <div className="flex items-center justify-between">
              <div>
                <SectionTitle>Ready to start learning?</SectionTitle>
                <p className="text-h5 mt-1 font-normal text-grey-main leading-[1.7]">
                  Join 12,450 students already enrolled
                </p>
              </div>
              <button type="button" className="py-3.5 px-13.5 bg-primary-500 rounded-card text-white text-h3 font-medium">
                Enroll now
              </button>
            </div>
          </SectionCard>
        </div>

        {/* ── Right sidebar ── */}
        <div className="w-96.25 shrink-0 flex flex-col gap-0">
          <div className="bg-white rounded-card px-5.5 py-5.5 flex flex-col gap-5">
            <SectionTitle>Course Enrollment</SectionTitle>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-title-3 font-bold text-primary-500 leading-none">
                  {course.priceCoins.toLocaleString()}
                </span>
                <Coins size={26} className="text-warning-500" />
              </div>
              <p className="text-body-md font-normal text-grey-main">Bounty coins</p>
            </div>

            {/* Balance */}
            <div className="flex items-center justify-between">
              <p className="text-body-md font-normal text-grey-main">Your balance</p>
              <div className="flex items-center gap-1">
                <span className="text-body-lg font-semibold text-content-500">
                  {balance.toLocaleString()}
                </span>
                <Coins size={16} className="text-warning-500" />
              </div>
            </div>

            {/* Enroll button */}
            <button
              type="button"
              className="w-full h-13 bg-primary-500 rounded-card text-white text-body-lg font-semibold flex items-center justify-center"
            >
              Enroll now
            </button>

            <hr className="border-content-100" />

            {/* Includes */}
            <div className="flex flex-col gap-3">
              <p className="text-label-md font-semibold text-content-500">This course includes:</p>
              <ul className="flex flex-col gap-2.5">
                {course.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2.25 w-1 h-1 rounded-full bg-primary-500 shrink-0" />
                    <p className="text-body-md font-normal text-content-500 leading-[1.6]">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
