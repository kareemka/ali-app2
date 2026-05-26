'use client'

import type { NewsItem } from '@/types/news'

export function NewsModal({
  item,
  onClose,
}: {
  item: NewsItem
  onClose: () => void
}) {
  return (
    <div
      className="news-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
      onClick={onClose}
    >
      <div className="news-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="news-modal-close"
          onClick={onClose}
          aria-label="إغلاق"
        >
          ×
        </button>
        {item.image && (
          <img src={item.image} alt={item.title} className="news-modal-image" />
        )}
        <h2 id="news-modal-title" className="news-modal-title">
          {item.title}
        </h2>
        {item.dateLabel && (
          <p className="news-modal-date">{item.dateLabel}</p>
        )}
        {item.content && (
          <div className="news-modal-content">{item.content}</div>
        )}
      </div>
    </div>
  )
}
