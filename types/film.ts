export interface ApiShow {
  id: number
  title?: string | null
  coverImage?: string | null
  thumbnailImage?: string | null
  youtubeTrailerLink?: string | null
  releaseYear?: string | null
  meta?: string | null
  synopsis?: string | null
  director?: string | null
  writer?: string | null
  dop?: string | null
  music?: string | null
  editor?: string | null
  cast?: string | null
  stills?: string[] | null
  sortOrder?: number | null
  updatedAt?: string | null
}

export interface Film {
  id: number
  poster: string
  title: string
  meta: string
  synopsis: string
  director?: string | null
  writer?: string | null
  dop?: string | null
  music?: string | null
  editor?: string | null
  cast?: string | null
  stills: string[]
  video: string
  sortOrder: number
}

export interface CreditItem {
  label: string
  value: string
}

export type ShowsApiResponse = ApiShow[] | { data?: ApiShow[] }
