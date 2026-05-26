'use client'

import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { motion } from 'framer-motion'
import { WorkModal } from '@/app/components/WorkModal'
import {
  useFilmographyStore,
  useFilms,
  useFilmsError,
  useFilmsLoading,
  useSelectedFilm,
} from '@/stores/filmography.store'
import 'swiper/css'
import 'swiper/css/free-mode'



export default function Filmography() {
  const films = useFilms()
  const isLoading = useFilmsLoading()
  const error = useFilmsError()
  const selectedFilm = useSelectedFilm()
  const fetchFilms = useFilmographyStore((s) => s.fetchFilms)
  const setSelectedFilm = useFilmographyStore((s) => s.setSelectedFilm)

  useEffect(() => {
    fetchFilms()
  }, [fetchFilms])

  if (isLoading) {
    return <div className="text-center text-white py-20">جار تحميل الأعمال...</div>
  }

  if (error) {
    return <div className="text-center text-gray-400 py-20">{error}</div>
  }

  return (
    <section id="filmography" className="bg-[#171718] py-20">
      <div>

        <h1 className="text-white text-2xl font-bold uppercase tracking-wide mb-10">
          الأعمال الفنية
        </h1>

        <Swiper
          modules={[FreeMode]}
          spaceBetween={20}
          freeMode
          grabCursor
          breakpoints={{
            0: {
              slidesPerView: 2, // 👈 موبايل
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {films.map((film) => (
            <SwiperSlide key={film.id} className='!ml-3 w-full'>
              <button
                onClick={() => setSelectedFilm(film)}
                className="group w-full"
              >
                <img
                  src={film.poster}
                  alt={film.title}
                  className="w-full h-[225px] sm:h-[260px] md:h-[300px] object-cover"

                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {selectedFilm && (
        <WorkModal work={selectedFilm} onClose={() => setSelectedFilm(null)} />
      )}
    </section>
  )
}