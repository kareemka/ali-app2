'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { scrollToSection } from '@/lib/scroll-to-section'

function SoundIcon({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg viewBox="0 0 98.5 74" className="h-5 w-6 md:h-8 md:w-10" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          fill="currentColor"
          d="M5,24.7h14.1v24.5H5V24.7z M24.1,50.5v-27L43.2,9.8v54.5L24.1,50.5z M48.2,0L20.8,19.7H0v34.5h20.8L48.2,74V0z M75.5,36L57.6,18.1L54,21.6L71.9,39.5L54,57.4L57.6,61L75.5,43.1L93.4,61L96.9,57.4L79,39.5L96.9,21.6L93.4,18.1"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 98.5 74" className="h-5 w-6 md:h-8 md:w-10" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        fill="currentColor"
        d="M5,24.7h14.1v24.5H5V24.7z M24.1,50.5v-27L43.2,9.8v54.5L24.1,50.5z M48.2,0L20.8,19.7H0v34.5h20.8L48.2,74V0z M58,37c0-6.6,3.6-12.3,9-15.3v30.5C61.6,49.3,58,43.6,58,37z M73,10.5v6.3C81.4,20.2,87,28,87,37s-5.6,16.8-14,20.2v6.3C84.2,59.8,93,49.2,93,37S84.2,14.2,73,10.5z"
      />
    </svg>
  )
}

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    if (!video.muted) video.volume = 1
    setMuted(video.muted)
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    void video.play()
  }

  const scrollToBiography = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    scrollToSection('#biography', { smooth: true, updateUrl: true })
  }

  return (
    <section id="showreel" className="relative -mt-8 md:-mt-16 ">
      <div
        className="relative h-[calc(45vh-50px)] sm:h-[calc(45vh-100px)] md:h-[65vh] md:max-h-[720px] lg:h-screen lg:max-h-screen w-full cursor-pointer overflow-hidden bg-black"
        onClick={togglePlay}
        role="presentation"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 block h-full w-full object-cover object-[50%_20%] scale-[1.1]"
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label="Showreel"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        {!isPlaying && (
          <button
            type="button"
            className="absolute left-1/2 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-black/20 text-white backdrop-blur-[2px] transition hover:bg-white/10 md:h-[72px] md:w-[72px] md:border-2"
            onClick={handlePlay}
            aria-label="تشغيل الفيديو"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-0.5 h-4 w-4 md:ml-1 md:h-7 md:w-7"
              aria-hidden
            >
              <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor" />
            </svg>
          </button>
        )}

        <button
          type="button"
          className="absolute bottom-6 right-4 z-20 flex items-center justify-center border-0 bg-transparent p-1 text-white/90 transition hover:text-white md:bottom-[10%] md:right-[6%] md:p-2"
          onClick={toggleMute}
          aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
        >
          <SoundIcon muted={muted} />
        </button>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 md:bottom-[10%] md:block">
          <a
            href="#biography"
            onClick={scrollToBiography}
            className="pointer-events-auto inline-flex animate-scroll-bob"
            aria-label="الانتقال للسيرة الذاتية"
          >
            <Image
              src="/scroll.png"
              alt=""
              width={32}
              height={52}
              className="h-auto w-6 object-contain opacity-90 md:w-8"
              priority
            />
          </a>
        </div>

      </div>
    </section>
  )
}