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
    <section id="backstage" className="backstage-section" aria-label="معرض الأعمال">
      <div className="backstage-grid">
        {isLoading && (
          <p className="backstage-status">جار تحميل المعرض...</p>
        )}

        {error && !isLoading && (
          <p className="backstage-status backstage-status--muted">{error}</p>
        )}

        {!isLoading &&
          !error &&
          items.map((item, index) => (
            <motion.article
              className="backstage-item"
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: 'linear' }}
            >
              <div className="backstage-item-media">
                <img src={item.image} alt={item.title || 'عمل فني'} />
                <span className="backstage-item-overlay" aria-hidden />
              </div>
              {item.title && (
                <p className="backstage-item-title">{item.title}</p>
              )}
            </motion.article>
          ))}
      </div>
    </section>
  )
}
