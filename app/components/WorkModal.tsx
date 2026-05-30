'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion, AnimatePresence } from 'framer-motion'
import { useFilmGallery } from '@/hooks/useFilmGallery'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { buildCredits } from '@/lib/utils/film'
import type { Film } from '@/types/film'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/free-mode'


const THUMBS_SWIPER_CONFIG = {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  centeredSlides: true,
  slideToClickedSlide: true,

  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
  },
} as const


const MAIN_IMAGE_TRANSITION = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
}

const mainImageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? '18%' : '-18%',
    scale: 1.08,
    filter: 'blur(8px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? '-14%' : '14%',
    scale: 0.96,
    filter: 'blur(6px)',
  }),
}

function WorkMainPreview({
  slides,
  activeIndex,
  direction,
  title,
}: {
  slides: string[]
  activeIndex: number
  direction: number
  title: string
}) {
  const image = slides[activeIndex]
  if (!image) return null

  return (
    <div className="film-main-swiper">
      <div className="film-main-slide">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={activeIndex}
            src={image}
            alt={`${title} — صورة ${activeIndex + 1}`}
            className="film-main-image"
            custom={direction}
            variants={mainImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={MAIN_IMAGE_TRANSITION}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}

function WorkThumbsStrip({
  slides,
  title,
  activeIndex,
  onSwiper,
  onRealIndexChange,
}: {
  slides: string[]
  title: string
  activeIndex: number
  onSwiper: (swiper: SwiperType) => void
  onRealIndexChange: (swiper: SwiperType) => void
}) {
  if (slides.length <= 1) return null

  return (
    <Swiper
      modules={[FreeMode]}
      onSwiper={onSwiper}
      onRealIndexChange={onRealIndexChange}
      className="film-thumbs-swiper"
      {...THUMBS_SWIPER_CONFIG}
    >
      {slides.map((still, index) => (
        <SwiperSlide
          key={`${title}-thumb-${index}`}
          className={`film-thumb-slide${activeIndex === index ? ' is-active-thumb' : ''}`}
        >
          <div className="film-thumb-inner relative w-full h-full">
            <Image src={still} alt={`${title} — مصغّر ${index + 1}`} fill className="object-cover" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

function WorkGallery({ work }: { work: Film }) {
  const slides = work.stills
  const { activeIndex, direction, onThumbsSwiper, onRealIndexChange } =
    useFilmGallery(slides.length, work.id)

  if (slides.length === 0) return null

  return (
    <div className="film-dual-swiper film-dual-swiper--stack">
      <WorkMainPreview
        slides={slides}
        activeIndex={activeIndex}
        direction={direction}
        title={work.title}
      />
      <WorkThumbsStrip
        slides={slides}
        title={work.title}
        activeIndex={activeIndex}
        onSwiper={onThumbsSwiper}
        onRealIndexChange={onRealIndexChange}
      />
    </div>
  )
}

export function WorkModal({
  work,
  onClose,
  isCommercial,
}: {
  work: Film
  onClose: () => void
  isCommercial?: boolean
}) {
  const credits = buildCredits(work)
  useLockBodyScroll(true)

  return (
    <div
      className="modal-overlay film-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button
        type="button"
        className="modal-close film-modal-close"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="إغلاق"
      >
        X
      </button>
      <div className="modal-content film-modal-content">
        <div className="modal-body film-modal-body">
          <div className="filmcontainer container">
            <div
              className={`filmposter film-modal-poster relative ${
                isCommercial ? 'film-modal-poster--commercial' : ''
              }`}
            >
              <Image src={work.poster} alt={work.title} fill className="object-cover" />
            </div>
            <div className="filmcontent film-modal-details">
              <div className="filmcontenttext">
                <div className="titleandimg">
                  <div className="film-modal-title-block">
                    <h2>{work.title}</h2>
                    {work.meta && <h5>{work.meta}</h5>}
                  </div>

                  <div className="slidergallery film-gallery">
                    {work.video && (
                      <div className="film-video-frame">
                        <iframe
                          src={work.video}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={work.title}
                        />
                      </div>
                    )}
                    <WorkGallery work={work} />
                  </div>
                </div>

                <div className="filminformation">
                  <div className="synopsis">{work.synopsis}</div>
                  {credits.map((item) => (
                    <div className="synopsis" key={item.label}>
                      <div className="synopsistitle">{item.label}</div>
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
