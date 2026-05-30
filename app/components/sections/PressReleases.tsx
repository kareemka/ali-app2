'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  useNews,
  useNewsError,
  useNewsLoading,
  useNewsStore,
} from '@/stores/news.store'
import type { NewsItem } from '@/types/news'
import { newsHref } from '@/lib/utils/slug'

function PressCard({
  item,
  index,
}: {
  item: NewsItem
  index: number
}) {
  const href = newsHref(item.slug)

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay: Math.floor(index / 2) * 0.15,
      }}
      className="group text-right"
    >
      <Link href={href} className="block overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={400}
          height={300}
          className="
            w-full
            h-[120px] md:h-auto
            object-cover
            transition-transform
            duration-1000
            group-hover:scale-110
          "
        />
      </Link>

      <h3 className="mt-3 text-[16px] md:text-[18px] leading-[20px]">
        <Link
          href={href}
          className="font-bold uppercase text-white hover:underline hover:text-white/80"
        >
          {item.title}
        </Link>
      </h3>

      {item.dateLabel && (
        <p className="mt-2 text-[18px] md:text-[22px] leading-[20px] md:leading-[22px] font-light text-white capitalize">
          {item.dateLabel}
        </p>
      )}
    </motion.article>
  )
}

export default function PressReleases() {
  const listRef = useRef<HTMLDivElement>(null)

  const news = useNews()
  const isLoading = useNewsLoading()
  const error = useNewsError()
  const fetchNews = useNewsStore((s) => s.fetchNews)

  // ✅ حل مشكلة window (SSR safe)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)

    check()
    window.addEventListener('resize', check)

    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollUp = () => {
    listRef.current?.scrollBy({ top: -300, behavior: 'smooth' })
  }

  const scrollDown = () => {
    listRef.current?.scrollBy({ top: 300, behavior: 'smooth' })
  }

  return (
    <section
      id="press"
      className="
        relative
        min-h-screen
        bg-[#171717]
        overflow-hidden
        flex
        items-start
        !pt-4
        md:!pt-10
      "
    >
      {/* BACKGROUND */}
      <div
        className="
          absolute left-0 top-0 w-full h-full
          bg-no-repeat
          hidden md:block
        "
        style={{
          backgroundImage: "url('/pressBg.jpeg')",
          backgroundSize: isMobile ? "90%" : "75%",
          backgroundPosition: isMobile ? "center" : "left bottom",
        }}
      />

      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 w-full flex justify-end px-2 md:px-12">
        <div className="w-full md:w-[55%] ml-auto">

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-white font-bold uppercase text-[24px] mb-4 md:mb-6"
          >
            الأخبار
          </motion.h1>

          {/* GRID (صفّين فقط بشكل مضبوط) */}
          <div
            ref={listRef}
            className="
              grid
              grid-cols-2
              gap-x-4
              gap-y-4
              h-[520px]
              overflow-y-scroll scrollbar-none
              pr-0 md:pr-6
            "
          >
            {isLoading && <div className="text-white">Loading...</div>}

            {error && <div className="text-white/70">{error}</div>}

            {!isLoading && !error && news.length === 0 && (
              <div className="text-white/70">لا توجد أخبار حاليا</div>
            )}

            {news.map((item, index) => (
              <PressCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* ARROWS */}
          <button
            onClick={scrollUp}
            className="absolute top-[20px] left-6 md:left-10 z-50"
          >
            <Image
              src="/uparrow.png"
              alt=""
              width={40}
              height={40}
              className="w-[20px] h-[16px] md:w-[40px] md:h-[40px]"
            />
          </button>

          <button
            onClick={scrollDown}
            className="absolute bottom-[20px] left-6 md:left-10 z-50"
          >
            <Image
              src="/downarrow.png"
              alt=""
              width={40}
              height={40}
              className="w-[20px] h-[16px] md:w-[40px] md:h-[40px]"
            />
          </button>

        </div>
      </div>
    </section>
  )
}