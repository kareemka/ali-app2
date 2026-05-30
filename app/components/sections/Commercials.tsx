'use client'

import { useEffect, useRef } from 'react'
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
import { motion } from 'framer-motion'

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
      <div className="w-full py-20 text-center text-white">
        جار تحميل الإعلانات...
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-20 text-center text-gray-300">
        {error}
      </div>
    )
  }

  if (!commercials.length) {
    return (
      <div className="w-full py-20 text-center text-gray-300">
        لا توجد إعلانات لعرضها حاليا.
      </div>
    )
  }

  return (
    <>
      {commercials.map((item) => (
        <div
          key={item.id}
          className="h-[fit-content] relative w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 overflow-hidden group"
        >
          {/* IMAGE WRAPPER */}
          <button
            onClick={() => onSelect(item)}
            className="block w-full relative"
          >
            <Image
              src={item.poster}
              alt={item.title}
              width={400}
              height={400}
              className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
            />
          </button>

          {/* TITLE OVER IMAGE (FIXED) */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-black/60 px-3 py-2">
            <p className="text-white text-[14px] font-bold capitalize leading-tight truncate">
              {item.title}
            </p>
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

  return (
    <section className="relative bg-[#171718]">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-white font-bold uppercase text-[24px] mb-4 md:mb-6 mr-2 md:mr-10"
      >
        الإعلانات
      </motion.h1>
      {/* Grid */}
      <div
        ref={adsRef}
        className="flex flex-wrap h-[fit-content] max-h-[80vh] overflow-y-scroll scrollbar-hide"
      >
        <CommercialsGrid
          isLoading={isLoading}
          error={error}
          commercials={commercials}
          onSelect={setSelectedCommercial}
        />
      </div>

      {/* Arrows */}
      <button
        onClick={scrollUp}
        className="absolute top-[75px] left-6 md:left-10 z-50"
      >
        <Image src="/uparrow.png" alt="" width={40} height={40} className="w-[20px] h-[16px] md:w-[40px] md:h-[40px]" />
      </button>

      <button
        onClick={scrollDown}
        className="absolute bottom-7 left-6 md:left-10 z-50"
      >
        <Image src="/downarrow.png" alt="" width={40} height={40} className="w-[20px] h-[16px] md:w-[40px] md:h-[40px]" />
      </button>

      {/* Modal */}
      {selectedCommercial && (
        <WorkModal
          work={selectedCommercial}
          isCommercial={true}
          onClose={() => setSelectedCommercial(null)}
        />
      )}
    </section>
  )
}