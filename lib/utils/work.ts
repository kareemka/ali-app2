import type { ApiShow, ShowsApiResponse } from '@/types/film'

export function extractWorks(payload: ShowsApiResponse): ApiShow[] {
  return Array.isArray(payload) ? payload : payload.data ?? []
}
