import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/config'
import { newsExcerpt } from '@/lib/utils/news'
import { newsHref } from '@/lib/utils/slug'
import type { NewsItem } from '@/types/news'

export function buildNewsMetadata(news: NewsItem): Metadata {
  const pageUrl = `${SITE_URL}${newsHref(news.slug)}`
  const description = newsExcerpt(news.content, 200)
  const ogImage = news.seoImage || news.image

  return {
    title: `${news.title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'ar_IQ',
      url: pageUrl,
      siteName: SITE_NAME,
      title: news.title,
      description,
      publishedTime: news.date || undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description,
      images: [ogImage],
    },
  }
}
