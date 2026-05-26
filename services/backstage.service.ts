import { apiClient } from '@/lib/api/client'
import { PLACEHOLDER_IMAGE } from '@/lib/config'
import { getAssetUrl, withCacheBust } from '@/lib/utils/media'
import type {
  ApiBackstage,
  BackstageApiResponse,
  BackstageItem,
} from '@/types/backstage'

function normalizeBackstage(item: ApiBackstage): BackstageItem {
  const version = item.createdAt

  return {
    id: item.id,
    image: withCacheBust(getAssetUrl(item.image), version),
    title: item.title?.trim() || '',
  }
}

function extractBackstage(payload: BackstageApiResponse): ApiBackstage[] {
  return Array.isArray(payload) ? payload : payload.data ?? []
}

export const backstageService = {
  async getBackstage(signal?: AbortSignal): Promise<BackstageItem[]> {
    const payload = await apiClient.get<BackstageApiResponse>('/backstage', {
      signal,
    })
    const items = extractBackstage(payload).map(normalizeBackstage)

    return items.filter((item) => item.image !== PLACEHOLDER_IMAGE)
  },
}
