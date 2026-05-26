import { PLACEHOLDER_IMAGE } from '@/lib/config'
import { slugify } from '@/lib/utils/slug'
import { getAssetUrl, withCacheBust } from '@/lib/utils/media'
import type { ApiNews, NewsItem } from '@/types/news'

export function formatNewsDate(date?: string | null): string {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function normalizeNews(item: ApiNews): NewsItem {
  const version = item.updatedAt ?? item.date
  const title = item.title?.trim() || 'بدون عنوان'
  const slug =
    item.slug?.trim() ||
    slugify(title) ||
    `خبر-${item.id}`

  return {
    id: item.id,
    slug,
    title,
    content: item.content?.trim() || '',
    image: withCacheBust(getAssetUrl(item.image), version),
    seoImage: withCacheBust(
      getAssetUrl(item.seoImage || item.image),
      version
    ),
    date: item.date ?? '',
    dateLabel: formatNewsDate(item.date),
  }
}

export function sortNews(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.date).getTime()
    const bTime = new Date(b.date).getTime()
    const safeA = Number.isNaN(aTime) ? 0 : aTime
    const safeB = Number.isNaN(bTime) ? 0 : bTime
    return safeB - safeA || b.id - a.id
  })
}

export function extractNews(payload: ApiNews[] | { data?: ApiNews[] }): ApiNews[] {
  return Array.isArray(payload) ? payload : payload.data ?? []
}

export function newsExcerpt(content: string, maxLength = 160): string {
  const plain = content.replace(/\s+/g, ' ').trim()
  if (plain.length <= maxLength) return plain
  return `${plain.slice(0, maxLength).trim()}…`
}
