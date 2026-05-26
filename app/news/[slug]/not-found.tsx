import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default function NewsNotFound() {
  return (
    <>
      <Header />
      <main className="news-detail-page">
        <div className="news-detail-inner news-detail-inner--center">
          <h1 className="news-detail-title">الخبر غير موجود</h1>
          <p className="news-detail-content">
            ربما تم حذف الخبر أو أن الرابط غير صحيح.
          </p>
          <Link href="/#press" className="news-detail-back">
            العودة إلى الأخبار
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
