import { useCallback, useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { getSlideDirection } from '@/lib/utils/film'

export function useFilmGallery(slideCount: number, filmId: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const prevIndexRef = useRef(0)
  const thumbsSwiperRef = useRef<SwiperType | null>(null)

  const selectIndex = useCallback(
    (nextIndex: number) => {
      if (nextIndex === prevIndexRef.current) return
      setDirection(getSlideDirection(prevIndexRef.current, nextIndex, slideCount))
      prevIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    },
    [slideCount]
  )

  useEffect(() => {
    prevIndexRef.current = 0
    setActiveIndex(0)
    setDirection(0)
    const swiper = thumbsSwiperRef.current
    if (swiper && !swiper.destroyed) {
      swiper.slideToLoop(0, 0)
    }
  }, [filmId])

  const onThumbsSwiper = useCallback((swiper: SwiperType) => {
    thumbsSwiperRef.current = swiper
  }, [])

  const onRealIndexChange = useCallback(
    (swiper: SwiperType) => {
      selectIndex(swiper.realIndex)
    },
    [selectIndex]
  )

  return {
    activeIndex,
    direction,
    onThumbsSwiper,
    onRealIndexChange,
  }
}
