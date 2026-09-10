'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface ActionExplanationModalProps {
  isOpen: boolean
  onClose: () => void
  actionName: string
}

function getActionColor(actionName: string): string {
  if (actionName === 'Approve & pay') return 'text-[#4ade80]'
  if (actionName === 'Reject')        return 'text-[#f43f5d]'
  return 'text-[#fbbe24]'
}

export function ActionExplanationModal({
  isOpen,
  onClose,
  actionName,
}: ActionExplanationModalProps) {
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (!isOpen) {
      setReason('')
      return
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div
        className="relative bg-white rounded-card shadow-[0px_4px_28.1px_0px_rgba(0,0,0,0.25)] w-[757px] p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="action-modal-title"
      >
        <div className="flex flex-col gap-[31px] items-end">
          <div className="flex flex-col gap-8 items-start w-full">

            {/* Header */}
            <div className="flex flex-col gap-2 items-start">
              <h2
                id="action-modal-title"
                className="font-semibold text-h3 text-[#1c1d1d] leading-[1.8]"
              >
                Action explanation
              </h2>
              <p className="font-normal text-body-lg text-[#85a0b2] leading-[1.8]">
                You are about to:{' '}
                <span className={cn('font-semibold', getActionColor(actionName))}>
                  {actionName}
                </span>
              </p>
            </div>

            {/* Reason textarea */}
            <div className="flex flex-col gap-6 items-start w-full">
              <p className="font-medium text-h5 text-[#1c1d1d] leading-normal">
                Reason or explanation{' '}
                <span className="text-[#f43f5d]">*</span>
              </p>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Provide a clear explanation for this action"
                className="w-full h-[132px] border border-[#85a0b2] rounded-[12px] px-8 py-5 font-normal text-body-lg text-content-500 placeholder:text-[#85a0b2] resize-none outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#85a0b2] text-white rounded-[12px] h-[60px] w-[227px] font-medium text-h3 transition-opacity hover:opacity-90"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-primary-500 text-white rounded-[12px] h-[60px] w-[227px] font-medium text-h3 transition-opacity hover:opacity-90"
            >
              Confirm action
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
