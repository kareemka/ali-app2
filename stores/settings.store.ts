import { create } from 'zustand'
import { settingsService } from '@/services/settings.service'
import type { Settings } from '@/types/settings'

interface SettingsState {
  settings: Settings | null
  isLoading: boolean
  error: string | null
  fetchSettings: () => Promise<void>
  reset: () => void
}

let abortController: AbortController | null = null

const initialState = {
  settings: null as Settings | null,
  isLoading: false,
  error: null as string | null,
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...initialState,

  fetchSettings: async () => {
    const state = useSettingsStore.getState()
    if (state.settings !== null || state.isLoading) return

    abortController?.abort()
    abortController = new AbortController()
    const { signal } = abortController

    set({ isLoading: true, error: null })

    try {
      const response = await settingsService.getSettings(signal)
      if (signal.aborted) return
      // API might return an array or a single object
      const settingsData = Array.isArray(response) ? response[0] : response
      set({ settings: settingsData || null, isLoading: false })
    } catch (error) {
      if (signal.aborted) return
      console.error('Error fetching settings:', error)
      set({
        error: 'تعذر تحميل الإعدادات حاليا.',
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

export const useSettings = () => useSettingsStore((s) => s.settings)
export const useSettingsLoading = () => useSettingsStore((s) => s.isLoading)
export const useSettingsError = () => useSettingsStore((s) => s.error)
