import { apiClient } from '@/lib/api/client'
import { normalizeShow, sortFilms } from '@/lib/utils/film'
import { extractWorks } from '@/lib/utils/work'
import type { Film, ShowsApiResponse } from '@/types/film'

export const commercialsService = {
  async getCommercials(signal?: AbortSignal): Promise<Film[]> {
    const payload = await apiClient.get<ShowsApiResponse>('/commercials', {
      signal,
    })
    return sortFilms(extractWorks(payload).map(normalizeShow))
  },
}
