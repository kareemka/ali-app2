'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  useBackstage,
  useBackstageError,
  useBackstageLoading,
  useBackstageStore,
} from '@/stores/backstage.store'

export default function LastSection() {
  const items = useBackstage()
  const isLoading = useBackstageLoading()
  const error = useBackstageError()
  const fetchBackstage = useBackstageStore((s) => s.fetchBackstage)

  useEffect(() => {
    fetchBackstage()
  }, [fetchBackstage])

  useEffect(() => {
    const refreshOnFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchBackstage()
      }
    }
    window.addEventListener('focus', refreshOnFocus)
    document.addEventListener('visibilitychange', refreshOnFocus)
    return () => {
      window.removeEventListener('focus', refreshOnFocus)
      document.removeEventListener('visibilitychange', refreshOnFocus)
    }
  }, [fetchBackstage])

  if (!isLoading && !error && items.length === 0) {
    return null
  }

  return (
    <section
      id="backstage"
      className="backstage-section"
      aria-label="معرض الأعمال"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/backstage.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="backstage-grid">
        {isLoading && (
          <p className="backstage-status">جار تحميل المعرض...</p>
        )}

        {error && !isLoading && (
          <p className="backstage-status backstage-status--muted">
            {error}
          </p>
        )}

        {!isLoading &&
          !error &&
          items.map((item, index) => {
            // 🎯 تنويع الحركة لكل صورة
            const pattern = index % 4

            const variants = [
              { x: -50, y: 40 },
              { x: 50, y: 40 },
              { x: 0, y: 60 },
              { x: -20, y: 60 },
            ]

            const v = variants[pattern]

            return (
              <motion.article
                className="backstage-item"
                key={item.id}
                initial={{
                  opacity: 0,
                  x: v.x,
                  y: v.y,
                  scale: 0.9,
                  filter: 'blur(6px)',
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.05,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className="backstage-item-media">
                  <img
                    src={item.image}
                    alt={item.title || 'عمل فني'}
                  />
                  <span
                    className="backstage-item-overlay"
                    aria-hidden
                  />
                </div>

                {item.title && (
                  <p className="backstage-item-title">
                    {item.title}
                  </p>
                )}
              </motion.article>
            )
          })}
      </div>
    </section>
  )
}