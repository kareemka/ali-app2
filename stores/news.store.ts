import { create } from 'zustand'
import { newsService } from '@/services/news.service'
import type { NewsItem } from '@/types/news'

interface NewsState {
  news: NewsItem[]
  isLoading: boolean
  error: string | null
  selectedNews: NewsItem | null
  fetchNews: () => Promise<void>
  setSelectedNews: (item: NewsItem | null) => void
  reset: () => void
}

let abortController: AbortController | null = null

const initialState = {
  news: [] as NewsItem[],
  isLoading: false,
  error: null as string | null,
  selectedNews: null as NewsItem | null,
}

export const useNewsStore = create<NewsState>((set) => ({
  ...initialState,

  fetchNews: async () => {
    const state = useNewsStore.getState()
    if (state.news.length > 0 || state.isLoading) return

    abortController?.abort()
    abortController = new AbortController()
    const { signal } = abortController

    set({ isLoading: true, error: null })

    try {
      const news = await newsService.getNews(signal)
      if (signal.aborted) return
      set({ news, isLoading: false })
    } catch (error) {
      if (signal.aborted) return
      console.error('Error fetching news:', error)
      set({
        error: 'تعذر تحميل الأخبار حاليا.',
        isLoading: false,
      })
    }
  },

  setSelectedNews: (item) => set({ selectedNews: item }),

  reset: () => {
    abortController?.abort()
    abortController = null
    set(initialState)
  },
}))

export const useNews = () => useNewsStore((s) => s.news)
export const useNewsLoading = () => useNewsStore((s) => s.isLoading)
export const useNewsError = () => useNewsStore((s) => s.error)
export const useSelectedNews = () => useNewsStore((s) => s.selectedNews)
