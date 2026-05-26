'use client'

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { newsHref } from '@/lib/utils/slug'
import {
  useNews,
  useNewsError,
  useNewsLoading,
  useNewsStore,
} from '@/stores/news.store'
import type { NewsItem } from '@/types/news'

function PressCard({ item }: { item: NewsItem }) {
  const href = newsHref(item.slug)

  return (
    <article className="press-card">
      <Link href={href} className="press-card-img">
        <img src={item.image} alt={item.title} />
      </Link>

      <h3 className="press-card-title">
        <Link href={href}>{item.title}</Link>
      </h3>

      {item.dateLabel && (
        <p className="press-card-meta">{item.dateLabel}</p>
      )}
    </article>
  )
}

function PressLayout({
  isLoading,
  error,
  news,
  listRef,
}: {
  isLoading: boolean
  error: string | null
  news: NewsItem[]
  listRef: RefObject<HTMLDivElement | null>
}) {
  let listContent: ReactNode

  if (isLoading) {
    listContent = (
      <div className="press-status">
        جار تحميل الأخبار...
      </div>
    )
  } else if (error) {
    listContent = (
      <div className="press-status press-status--muted">
        {error}
      </div>
    )
  } else if (news.length === 0) {
    listContent = (
      <div className="press-status press-status--muted">
        لا توجد أخبار لعرضها حاليا.
      </div>
    )
  } else {
    listContent = (
      <div className="press-list-grid">
        {news.map((item) => (
          <PressCard key={item.id} item={item} />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={listRef}
      className={`
        overflow-y-scroll
        [scrollbar-width:none]
        [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
        ${news.length > 0 ? 'h-[58vh] md:h-[750px]' : 'h-auto'}
      `}
    >
      {listContent}
    </div>
  )
}

export default function PressReleases() {
  const listRef = useRef<HTMLDivElement>(null)

  const [hasContent, setHasContent] = useState(false)

  const news = useNews()
  const isLoading = useNewsLoading()
  const error = useNewsError()

  const fetchNews = useNewsStore((s) => s.fetchNews)

  useEffect(() => {
    setHasContent(news.length > 0 && !isLoading && !error)
  }, [news, isLoading, error])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  useEffect(() => {
    const refreshOnFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchNews()
      }
    }

    window.addEventListener('focus', refreshOnFocus)
    document.addEventListener('visibilitychange', refreshOnFocus)

    return () => {
      window.removeEventListener('focus', refreshOnFocus)
      document.removeEventListener(
        'visibilitychange',
        refreshOnFocus
      )
    }
  }, [fetchNews])

  const scrollUp = () => {
    listRef.current?.scrollBy({
      top: -300,
      behavior: 'smooth',
    })
  }

  const scrollDown = () => {
    listRef.current?.scrollBy({
      top: 300,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="press"
      className="relative bg-[#171718] mt-8"
    >

      <div className="w-full flex justify-start px-6 md:px-12 pt-8 mb-8">
        <motion.h1
          className="
      relative z-10
      px-3 py-1
      text-2xl md:text-3xl
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
          الأخبار
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          ease: 'linear',
        }}
      >
        <PressLayout
          isLoading={isLoading}
          error={error}
          news={news}
          listRef={listRef}
        />
      </motion.div>

      <button
        type="button"
        onClick={scrollUp}
        aria-label="Scroll up"
        className="
          absolute top-[30px] right-3 md:right-10
          z-50 flex cursor-pointer items-center justify-center
          border-0 bg-transparent p-1 md:p-2
        "
      >
        <Image
          src="/uparrow.png"
          alt=""
          width={40}
          height={40}
          className="h-6 w-6 md:h-10 md:w-10"
        />
      </button>

      <button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll down"
        className="
          absolute bottom-[30px] right-3 md:right-10
          z-50 flex cursor-pointer items-center justify-center
          border-0 bg-transparent p-1 md:p-2
        "
      >
        <Image
          src="/downarrow.png"
          alt=""
          width={40}
          height={40}
          className="h-6 w-6 md:h-10 md:w-10"
        />
      </button>
    </section>
  )
}