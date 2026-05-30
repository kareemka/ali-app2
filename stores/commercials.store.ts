import { create } from 'zustand'
import { commercialsService } from '@/services/commercials.service'
import type { Film } from '@/types/film'

interface CommercialsState {
  commercials: Film[]
  isLoading: boolean
  error: string | null
  selectedCommercial: Film | null
  fetchCommercials: () => Promise<void>
  setSelectedCommercial: (commercial: Film | null) => void
  reset: () => void
}

let abortController: AbortController | null = null

const initialState = {
  commercials: [] as Film[],
  isLoading: false,
  error: null as string | null,
  selectedCommercial: null as Film | null,
}

export const useCommercialsStore = create<CommercialsState>((set) => ({
  ...initialState,

  fetchCommercials: async () => {
    const state = useCommercialsStore.getState()
    if (state.commercials.length > 0 || state.isLoading) return

    abortController?.abort()
    abortController = new AbortController()
    const { signal } = abortController

    set({ isLoading: true, error: null })

    try {
      const commercials = await commercialsService.getCommercials(signal)
      if (signal.aborted) return
      set({ commercials, isLoading: false })
    } catch (error) {
      if (signal.aborted) return
      console.error('Error fetching commercials:', error)
      set({
        error: 'تعذر تحميل الإعلانات حاليا.',
        isLoading: false,
      })
    }
  },

  setSelectedCommercial: (commercial) =>
    set({ selectedCommercial: commercial }),

  reset: () => {
    abortController?.abort()
    abortController = null
    set(initialState)
  },
}))

export const useCommercials = () => useCommercialsStore((s) => s.commercials)
export const useCommercialsLoading = () => useCommercialsStore((s) => s.isLoading)
export const useCommercialsError = () => useCommercialsStore((s) => s.error)
export const useSelectedCommercial = () =>
  useCommercialsStore((s) => s.selectedCommercial)
