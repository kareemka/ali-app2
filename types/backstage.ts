export interface ApiBackstage {
  id: number
  image?: string | null
  title?: string | null
  createdAt?: string | null
}

export interface BackstageItem {
  id: number
  image: string
  title: string
}

export type BackstageApiResponse =
  | ApiBackstage[]
  | { data?: ApiBackstage[] }
