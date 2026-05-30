'use client'

import { useEffect, useState } from 'react'
import { useAppLoaderStore } from '@/stores/appLoader.store'

/**
 * يُشغّل كل الـ API calls فور تحميل الصفحة
 * ويُبقي شاشة التحميل حتى تكتمل جميع البيانات
 */
export default function PageLoader({ children }: { children: React.ReactNode }) {
  const fetchAll = useAppLoaderStore((s) => s.fetchAll)
  const ready = useAppLoaderStore((s) => s.ready)

  const [hiding, setHiding] = useState(false)
  const [gone, setGone] = useState(false)

  // نبدأ تحميل كل البيانات فور mount
  useEffect(() => {
    void fetchAll()
  }, [fetchAll])

  // عندما تكتمل البيانات → نبدأ animation الاختفاء
  useEffect(() => {
    if (!ready) return
    setHiding(true)
    const t = setTimeout(() => setGone(true), 800)
    return () => clearTimeout(t)
  }, [ready])

  return (
    <>
      {/* شاشة التحميل — تبقى حتى تنتهي كل الـ API calls */}
      {!gone && (
        <div
          aria-hidden
          className={`page-loader ${hiding ? 'page-loader--hide' : ''}`}
        >
          {/* النجوم الخلفية */}
          <div className="page-loader__stars" aria-hidden>
            {Array.from({ length: 60 }).map((_, i) => (
              <span key={i} className="page-loader__star" />
            ))}
          </div>

          {/* المحتوى المركزي */}
          <div className="page-loader__center">
            {/* الحلقة الدوارة */}
            <div className="page-loader__ring">
              <svg viewBox="0 0 100 100" fill="none">
                <circle
                  cx="50" cy="50" r="42"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                />
                <circle
                  cx="50" cy="50" r="42"
                  stroke="url(#loaderGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset="200"
                  className="page-loader__arc"
                />
                <defs>
                  <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* الاسم */}
            <div className="page-loader__name">
              <span className="page-loader__name-ar">علي فاضل</span>
              <span className="page-loader__name-en">ALI FADEL</span>
            </div>

            {/* خط التقدم */}
            <div className="page-loader__bar-wrap">
              <div className="page-loader__bar" />
            </div>
          </div>
        </div>
      )}

      {/* محتوى الصفحة — يظهر تدريجياً بعد اكتمال التحميل */}
      <div className={`page-loader__content ${hiding || gone ? 'page-loader__content--visible' : ''}`}>
        {children}
      </div>
    </>
  )
}
