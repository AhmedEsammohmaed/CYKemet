import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Cairo, Righteous, ZCOOL_QingKe_HuangYou } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
})

const righteous = Righteous({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-righteous',
  display: 'swap',
})

const zcoolQingKeHuangYou = ZCOOL_QingKe_HuangYou({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-zcool-qingke',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CyKemet — Egypt Cyber Platform',
  description: 'Bug Bounty & Security Services Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${cairo.variable} ${righteous.variable} ${zcoolQingKeHuangYou.variable} scroll-smooth`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
