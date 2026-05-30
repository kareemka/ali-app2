import { create } from 'zustand'
import { backstageService } from '@/services/backstage.service'
import type { BackstageItem } from '@/types/backstage'

interface BackstageState {
  items: BackstageItem[]
  isLoading: boolean
  error: string | null
  fetchBackstage: () => Promise<void>
  reset: () => void
}

let abortController: AbortController | null = null

const initialState = {
  items: [] as BackstageItem[],
  isLoading: false,
  error: null as string | null,
}

export const useBackstageStore = create<BackstageState>((set) => ({
  ...initialState,

  fetchBackstage: async () => {
    const state = useBackstageStore.getState()
    if (state.items.length > 0 || state.isLoading) return

    abortController?.abort()
    abortController = new AbortController()
    const { signal } = abortController

    set({ isLoading: true, error: null })

    try {
      const items = await backstageService.getBackstage(signal)
      if (signal.aborted) return
      set({ items, isLoading: false })
    } catch (error) {
      if (signal.aborted) return
      console.error('Error fetching backstage:', error)
      set({
        error: 'تعذر تحميل معرض الأعمال حاليا.',
        isLoading: false,
      })
    }
  },

  reset: () => {
    abortController?.abort()
    abortController = null
    set(initialState)
  },
}))

export const useBackstage = () => useBackstageStore((s) => s.items)
export const useBackstageLoading = () => useBackstageStore((s) => s.isLoading)
export const useBackstageError = () => useBackstageStore((s) => s.error)
