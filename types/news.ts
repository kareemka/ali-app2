export interface ApiNews {
  id: number
  title?: string | null
  slug?: string | null
  content?: string | null
  image?: string | null
  seoImage?: string | null
  date?: string | null
  updatedAt?: string | null
}

export interface NewsItem {
  id: number
  slug: string
  title: string
  content: string
  image: string
  seoImage: string
  date: string
  dateLabel: string
}

export type NewsApiResponse = ApiNews[] | { data?: ApiNews[] }
