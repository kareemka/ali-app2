import type { Metadata } from 'next'
import { Cinzel, Tajawal } from 'next/font/google'
import { SITE_URL } from '@/lib/config'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'علي فاضل | المخرج والمنتج العراقي',
  description: 'الموقع الرسمي للمخرج والكاتب والمنتج العراقي علي فاضل. خريج كلية الفنون الجميلة وأحد أبرز صناع المحتوى الدرامي والكوميدي في العراق.',
  keywords: 'علي فاضل, مخرج عراقي, ولاية بطيخ, كوميديا, دراما, العراق',
  openGraph: {
    type: 'website',
    locale: 'ar_IQ',
    siteName: 'علي فاضل',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cinzel.variable} ${tajawal.variable} bg-black`}>
      <body className="bg-black antialiased">{children}</body>
    </html>
  )
}
