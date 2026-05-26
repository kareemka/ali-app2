import type { ApiShow, CreditItem, Film } from '@/types/film'
import { PLACEHOLDER_IMAGE } from '@/lib/config'
import {
  getAssetUrl,
  getEmbedUrl,
  resolveAssetUrl,
  withCacheBust,
} from '@/lib/utils/media'

export function normalizeShow(show: ApiShow): Film {
  const version = show.updatedAt

  const cover = resolveAssetUrl(show.coverImage)

  // البوستر من الغلاف فقط — لا fallback لصورة thumbnail قديمة في قاعدة البيانات
  const poster = withCacheBust(cover ?? PLACEHOLDER_IMAGE, version)

  const stills = (show.stills || [])
    .filter(Boolean)
    .map((still) => withCacheBust(getAssetUrl(still), version))

  const galleryImages = stills.length > 0 ? stills : cover ? [cover] : []

  return {
    id: show.id,
    poster,
    title: show.title || 'بدون عنوان',
    meta: show.meta || show.releaseYear || '',
    synopsis: show.synopsis || 'لا يوجد وصف متاح لهذا العمل حاليا.',
    director: show.director,
    writer: show.writer,
    dop: show.dop,
    music: show.music,
    editor: show.editor,
    cast: show.cast,
    stills: galleryImages,
    video: getEmbedUrl(show.youtubeTrailerLink),
    sortOrder: show.sortOrder ?? 0,
  }
}

export function sortFilms(films: Film[]): Film[] {
  return [...films].sort(
    (a, b) => a.sortOrder - b.sortOrder || b.id - a.id
  )
}

export function buildCredits(film: Film): CreditItem[] {
  return [
    { label: 'إخراج', value: film.director ?? '' },
    { label: 'تأليف', value: film.writer ?? '' },
    { label: 'تصوير', value: film.dop ?? '' },
    { label: 'موسيقى', value: film.music ?? '' },
    { label: 'مونتاج', value: film.editor ?? '' },
    { label: 'بطولة', value: film.cast ?? '' },
  ].filter((item) => item.value)
}

export function getSlideDirection(
  from: number,
  to: number,
  total: number
): number {
  if (from === to || total <= 1) return 0
  const forward = (to - from + total) % total
  const backward = (from - to + total) % total
  return forward <= backward ? 1 : -1
}
