import { create } from 'zustand'
import { showsService } from '@/services/shows.service'
import type { Film } from '@/types/film'

interface FilmographyState {
  films: Film[]
  isLoading: boolean
  error: string | null
  selectedFilm: Film | null
  fetchFilms: () => Promise<void>
  setSelectedFilm: (film: Film | null) => void
  reset: () => void
}

let abortController: AbortController | null = null

const initialState = {
  films: [] as Film[],
  isLoading: false,
  error: null as string | null,
  selectedFilm: null as Film | null,
}

export const useFilmographyStore = create<FilmographyState>((set) => ({
  ...initialState,

  fetchFilms: async () => {
    abortController?.abort()
    abortController = new AbortController()
    const { signal } = abortController

    set({ isLoading: true, error: null })

    try {
      const films = await showsService.getFilms(signal)
      if (signal.aborted) return
      set({ films, isLoading: false })
    } catch (error) {
      if (signal.aborted) return
      console.error('Error fetching works:', error)
      set({
        error: 'تعذر تحميل الأعمال حاليا.',
        isLoading: false,
      })
    }
  },

  setSelectedFilm: (film) => set({ selectedFilm: film }),

  reset: () => {
    abortController?.abort()
    abortController = null
    set(initialState)
  },
}))

/** selectors */
export const useFilms = () => useFilmographyStore((s) => s.films)
export const useFilmsLoading = () => useFilmographyStore((s) => s.isLoading)
export const useFilmsError = () => useFilmographyStore((s) => s.error)
export const useSelectedFilm = () => useFilmographyStore((s) => s.selectedFilm)
