import { apiClient } from '@/lib/api/client'
import type { Settings } from '@/types/settings'

export const settingsService = {
  async getSettings(signal?: AbortSignal): Promise<Settings[]> {
    return apiClient.get<Settings[]>('/settings', { signal })
  },
}
