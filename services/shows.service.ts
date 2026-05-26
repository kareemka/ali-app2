import { apiClient } from '@/lib/api/client'
import { normalizeShow, sortFilms } from '@/lib/utils/film'
import { extractWorks } from '@/lib/utils/work'
import type { Film, ShowsApiResponse } from '@/types/film'

export const showsService = {
  async getFilms(signal?: AbortSignal): Promise<Film[]> {
    const payload = await apiClient.get<ShowsApiResponse>('/shows', { signal })
    return sortFilms(extractWorks(payload).map(normalizeShow))
  },
}
