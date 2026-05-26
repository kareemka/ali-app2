'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { WorkModal } from '@/app/components/WorkModal'
import {
  useCommercials,
  useCommercialsError,
  useCommercialsLoading,
  useCommercialsStore,
  useSelectedCommercial,
} from '@/stores/commercials.store'
import type { Film } from '@/types/film'

// Grid base: hidden scrollbar on all platforms
const ADS_GRID_BASE =
  'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'

const ADS_GRID_WITH_CONTENT_CLASS =
  `${ADS_GRID_BASE} max-h-[70vh] md:max-h-[65vh] lg:max-h-[90vh]`

const ADS_GRID_EMPTY_CLASS =
  `${ADS_GRID_BASE} h-auto min-h-0`

function CommercialsGrid({
  isLoading,
  error,
  commercials,
  onSelect,
}: {
  isLoading: boolean
  error: string | null
  commercials: Film[]
  onSelect: (item: Film) => void
}) {
  if (isLoading) {
    return (
      <div className="col-span-full px-4 py-[60px] text-center text-white">
        جار تحميل الإعلانات...
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-full px-4 py-[60px] text-center text-[#b8b8b8]">
        {error}
      </div>
    )
  }

  if (commercials.length === 0) {
    return (
      <div className="col-span-full px-4 py-[60px] text-center text-[#b8b8b8]">
        لا توجد إعلانات لعرضها حاليا.
      </div>
    )
  }

  return (
    <>
      {commercials.map((item) => (
        <div
          key={item.id}
          className="group relative w-full overflow-hidden aspect-[16/10]"
        >
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="absolute inset-0 w-full h-full border-0 bg-transparent p-0"
          >
            <img
              src={item.poster}
              alt={item.title}
              className="
                h-full w-full object-cover object-center
                transition-transform duration-700 group-hover:scale-110
              "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </button>

          <div className="absolute bottom-2  w-fit px-3 py-1 bg-black/40 backdrop-blur-sm text-right font-sans text-sm sm:text-base font-bold text-white z-10">
            {item.title}
          </div>
        </div>
      ))}
    </>
  )
}

export default function Commercials() {
  const adsRef = useRef<HTMLDivElement>(null)

  const commercials = useCommercials()
  const isLoading = useCommercialsLoading()
  const error = useCommercialsError()
  const selectedCommercial = useSelectedCommercial()

  const fetchCommercials = useCommercialsStore((s) => s.fetchCommercials)
  const setSelectedCommercial = useCommercialsStore((s) => s.setSelectedCommercial)

  useEffect(() => {
    fetchCommercials()
  }, [fetchCommercials])

  const scrollUp = () => {
    adsRef.current?.scrollBy({ top: -300, behavior: 'smooth' })
  }

  const scrollDown = () => {
    adsRef.current?.scrollBy({ top: 300, behavior: 'smooth' })
  }

  const showScrollableGrid = commercials.length > 0

  return (
    <section id="commercial" className="relative bg-[#171718]">

      <div className="relative z-20 h-[60px] md:h-[80px] flex items-center">
        <motion.h1
          className="
            flex items-center justify-end
            w-fit md:w-[320px] lg:w-[420px]
            bg-black
            px-3 md:px-6
            py-1 md:py-2
            font-sans
            text-lg sm:text-xl md:text-2xl
            font-bold
            tracking-wide
            text-white
            uppercase
          "
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'linear' }}
        >
          الإعلانات
        </motion.h1>
      </div>

      {/* GRID — 1 عمود موبايل / 2 أعمدة md / 3 أعمدة lg+ */}
      <div
        className={showScrollableGrid ? ADS_GRID_WITH_CONTENT_CLASS : ADS_GRID_EMPTY_CLASS}
        ref={adsRef}
      >
        <CommercialsGrid
          isLoading={isLoading}
          error={error}
          commercials={commercials}
          onSelect={setSelectedCommercial}
        />
      </div>

      {/* ARROWS */}
      <button
        type="button"
        onClick={scrollUp}
        className="absolute top-[20px] right-3 md:right-10 z-50 p-1 md:p-2"
      >
        <Image src="/uparrow.png" alt="" width={40} height={40} className="h-6 w-6 md:h-10 md:w-10" />
      </button>

      <button
        type="button"
        onClick={scrollDown}
        className="absolute bottom-[30px] right-3 md:right-10 z-50 p-1 md:p-2"
      >
        <Image src="/downarrow.png" alt="" width={40} height={40} className="h-6 w-6 md:h-10 md:w-10" />
      </button>

      {selectedCommercial && (
        <WorkModal
          work={selectedCommercial}
          onClose={() => setSelectedCommercial(null)}
        />
      )}
    </section>
  )
}