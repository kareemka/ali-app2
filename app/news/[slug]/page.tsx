import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { buildNewsMetadata } from '@/lib/seo/news'
import { newsService } from '@/services/news.service'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const news = await newsService.getNewsBySlug(slug)

  if (!news) {
    return { title: 'خبر غير موجود' }
  }

  return buildNewsMetadata(news)
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const news = await newsService.getNewsBySlug(slug)

  if (!news) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="news-detail-page">
        <div className="news-detail-inner">
          <Link href="/#press" className="news-detail-back">
            ← العودة إلى الأخبار
          </Link>

          <article className="news-detail-article">
            <div className="news-detail-hero">
              <img src={news.image} alt={news.title} />
            </div>

            {news.dateLabel && (
              <time className="news-detail-date" dateTime={news.date}>
                {news.dateLabel}
              </time>
            )}

            <h1 className="news-detail-title">{news.title}</h1>

            {news.content && (
              <div className="news-detail-content">{news.content}</div>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
