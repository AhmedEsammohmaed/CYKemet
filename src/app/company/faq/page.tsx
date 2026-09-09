'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Settings,
  WalletCards,
  Shield,
  Mail,
  ChevronDown,
  Paperclip,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useNav } from '@/lib/context/NavContext'
import { FormField } from '@/components/ui/FormField'

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  settings:      Settings,
  'wallet-cards': WalletCards,
  shield:        Shield,
  mail:          Mail,
}

const faqItems = [
  {
    icon: 'settings',
    question: 'How do i reset my password?',
    answer:
      'To reset your password, go to the login page and click "Forgot password". Enter your registered email and follow the instructions sent to your inbox.',
  },
  {
    icon: 'wallet-cards',
    question: 'What payment methods do you accept?',
    answer:
      'We accept bank transfers (IBAN), InstaPay, and Vodafone Cash for payouts. Companies can top up via bank transfer.',
  },
  {
    icon: 'shield',
    question: 'Is my data secure?',
    answer:
      'Yes. All personal data and financial reports are encrypted and never shown in public profiles. We comply with Egyptian data protection laws.',
  },
  {
    icon: 'mail',
    question: 'How can I contact support directly?',
    answer:
      'You can use the contact form below, or reach us at support@cykemet.com. We respond within 24 hours on business days.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const { setTitle } = useNav()
  useEffect(() => { setTitle('FAQ') }, [setTitle])

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [attachment, setAttachment] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleReset() {
    setForm({ name: '', email: '', message: '' })
    setAttachment(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function handleSubmit() {
    console.log('FAQ contact form submitted', { form, attachment })
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Card 1: FAQ Accordion ─────────────────────────────────────────── */}
      <div className="bg-white rounded-card p-6 flex flex-col gap-1">

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-h3 font-semibold text-content-500">
            Frequently Asked Questions
          </h2>
          <p className="text-body-md text-grey-main mt-1">
            Browse common questions and answers
          </p>
        </div>

        {/* Accordion rows */}
        {faqItems.map((item, i) => {
          const ItemIcon = iconMap[item.icon] ?? Settings
          const isOpen = openIndex === i
          const isLast = i === faqItems.length - 1

          return (
            <div key={i} className="flex flex-col w-full">
              {/* Separator above each row except the first */}
              {i > 0 && <hr className="border-t border-content-100" />}

              {/* Row header */}
              <button
                type="button"
                className="flex items-center gap-[6px] py-6 cursor-pointer w-full text-start"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <ItemIcon size={28} className="text-grey-main shrink-0" />
                <span className="text-body-lg font-medium text-content-500 flex-1 ps-1">
                  {item.question}
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-grey-main shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Answer */}
              {isOpen && (
                <p className="text-body-md text-grey-main ps-[34px] pb-4">
                  {item.answer}
                </p>
              )}

              {/* Separator after the last row */}
              {isLast && <hr className="border-t border-content-100" />}
            </div>
          )
        })}
      </div>

      {/* ── Card 2: Contact Support ───────────────────────────────────────── */}
      <div className="bg-white rounded-card p-6 flex flex-col gap-6">

        {/* Header */}
        <div>
          <h2 className="text-h3 font-semibold text-content-500">
            Contact support
          </h2>
          <p className="text-body-md text-grey-main mt-1">
            Can&apos;t find what you&apos;re looking for?{' '}
            <span className="font-bold text-content-500">Send us a message</span>{' '}
            and we&apos;ll get back to you within 24 hours
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">

          {/* Name */}
          <FormField label="Name" required>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={cn(
                'border border-grey-main rounded-[12px] h-[60px] px-[32px] w-full',
                'text-body-md text-content-500 bg-white',
                'placeholder:text-grey-main focus:outline-none focus:border-primary-500',
                'transition-colors'
              )}
            />
          </FormField>

          {/* E-mail */}
          <FormField label="E-mail" required>
            <input
              type="email"
              placeholder="Enter your E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={cn(
                'border border-grey-main rounded-[12px] h-[60px] px-[32px] w-full',
                'text-body-md text-content-500 bg-white',
                'placeholder:text-grey-main focus:outline-none focus:border-primary-500',
                'transition-colors'
              )}
            />
          </FormField>

          {/* Message */}
          <FormField label="Message" required>
            <textarea
              placeholder="Describe your issue or question in detail"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={cn(
                'border border-grey-main rounded-[12px] h-[158px] px-[32px] py-[20px] w-full',
                'text-body-md text-content-500 bg-white resize-none',
                'placeholder:text-grey-main focus:outline-none focus:border-primary-500',
                'transition-colors'
              )}
            />
          </FormField>

          {/* Attachments */}
          <div className="flex flex-col gap-2">
            <span className="text-body-md font-medium text-content-500">
              Attachments{' '}
              <span className="text-grey-main font-normal">(optional)</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 h-[49px] px-4 rounded-[12px] text-body-md text-content-500 cursor-pointer"
                style={{ backgroundColor: 'rgba(133,160,178,0.1)' }}
              >
                <Paperclip size={20} className="text-grey-main" />
                Choose file
              </button>
              {attachment && (
                <span className="text-body-sm text-grey-main">{attachment.name}</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-8 justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="h-[60px] w-[227px] text-h3 font-medium text-white rounded-[12px] bg-grey-main hover:opacity-90 transition-opacity"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[60px] w-[227px] text-h3 font-medium text-white rounded-[12px] bg-primary-500 hover:bg-primary-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

    </div>
  )
}
