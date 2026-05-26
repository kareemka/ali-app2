import { API_URL, PLACEHOLDER_IMAGE } from '@/lib/config'

export function isValidAsset(value?: string | null): value is string {
  if (!value) return false
  const trimmed = value.trim()
  return trimmed.length > 0 && trimmed !== 'null' && trimmed !== 'undefined'
}

export function getAssetUrl(
  value?: string | null,
  fallback = PLACEHOLDER_IMAGE
): string {
  if (!isValidAsset(value)) return fallback
  const trimmed = value.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  if (trimmed.startsWith('/')) return trimmed
  return `${API_URL}/uploads/${trimmed}`
}

/** يبني رابط الصورة فقط إن وُجدت — بدون fallback تلقائي */
export function resolveAssetUrl(value?: string | null): string | null {
  if (!isValidAsset(value)) return null
  return getAssetUrl(value, '')
}

export function withCacheBust(url: string, updatedAt?: string | null): string {
  if (!updatedAt || url === PLACEHOLDER_IMAGE) return url
  const stamp = new Date(updatedAt).getTime()
  if (Number.isNaN(stamp)) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${stamp}`
}

export function getEmbedUrl(url?: string | null): string {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname.includes('youtu.be')) {
      const videoId = parsedUrl.pathname.replace('/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
    }

    if (parsedUrl.pathname.includes('/embed/')) return url

    const videoId = parsedUrl.searchParams.get('v')
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  } catch {
    return url
  }
}
