import { apiClient } from '@/lib/api/client'
import { extractNews, normalizeNews, sortNews } from '@/lib/utils/news'
import type { ApiNews, NewsApiResponse, NewsItem } from '@/types/news'

export const newsService = {
  async getNews(signal?: AbortSignal): Promise<NewsItem[]> {
    const payload = await apiClient.get<NewsApiResponse>('/news', { signal })
    return sortNews(extractNews(payload).map(normalizeNews))
  },

  async getNewsBySlug(slug: string): Promise<NewsItem | null> {
    try {
      const item = await apiClient.get<ApiNews>(
        `/news/slug/${encodeURIComponent(slug)}`
      )
      return normalizeNews(item)
    } catch {
      return null
    }
  },
}
