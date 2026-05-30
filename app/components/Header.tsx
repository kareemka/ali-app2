'use client'

import { useState, useEffect, useCallback, type MouseEvent } from 'react'
import { scrollToSection, scrollToSectionFromUrl } from '@/lib/scroll-to-section'
import { SocialIcons } from './SocialIcons'

/** ارتفاع الهيدر الثابت — يُستخدم أيضاً كـ offset للمحتوى تحته */
export const HEADER_HEIGHT_CLASS = 'h-16 md:h-[72px]'
export const MAIN_OFFSET_CLASS = 'pt-16 md:pt-[72px]'

const NAV_LINKS = [
  { label: 'السيرة الذاتية', href: '#biography' },
  { label: 'الأعمال الفنية', href: '#filmography' },
  { label: 'الإعلانات', href: '#commercial' },
  { label: 'الأخبار', href: '#press' },
] as const



const desktopLinkClassName =
  'hidden lg:inline-block py-2 text-sm uppercase tracking-[0.18em] text-white/80 transition duration-300 hover:text-white hover:tracking-[0.22em]'

const mobileLinkClassName =
  'inline-block py-2.5 text-2xl font-light text-white no-underline transition-all duration-300 hover:font-semibold'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const runHashScroll = () => {
      if (!window.location.hash) return
      scrollToSectionFromUrl(window.location.hash)
    }

    runHashScroll()
    const t = window.setTimeout(runHashScroll, 150)

    const onHashChange = () => {
      scrollToSectionFromUrl(window.location.hash)
    }
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    window.setTimeout(() => {
      scrollToSection(href, { smooth: true, updateUrl: true })
    }, 300)
  }

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [])

  const handleOverlayClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      closeMenu()
    }
  }

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen, closeMenu])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full ${HEADER_HEIGHT_CLASS} transition-all duration-300 ${
          isScrolled || menuOpen
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-4 px-4 md:px-6">
          <a
            href="#showreel"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#showreel')
            }}
            className="font-serif text-lg leading-none font-bold uppercase tracking-[0.35em] text-white no-underline transition-opacity duration-300 hover:opacity-70 md:text-[26px]"
          >
            علي فاضل
          </a>

    

          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-base font-medium text-white shadow-sm shadow-black/20 transition-all duration-300 hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M4 4L28 28M28 4L4 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <div className="flex w-7 shrink-0 flex-col items-end gap-1.5">
                <span className="block h-0.5 w-7 rounded-sm bg-white" />
                <span className="block h-0.5 w-[18px] rounded-sm bg-white" />
                <span className="block h-0.5 w-[23px] rounded-sm bg-white" />
              </div>
            )}
            <span className="hidden lg:inline">القائمة</span>
          </button>
        </div>
      </header>

      <nav
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center transition-all duration-300 ${
          menuOpen
            ? 'pointer-events-auto bg-black/95 backdrop-blur-md'
            : 'pointer-events-none bg-transparent'
        }`}
        aria-hidden={!menuOpen}
      >
        {menuOpen && (
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="إغلاق القائمة"
            className="absolute top-8 right-6 z-[1000] flex cursor-pointer items-center justify-center border-0 bg-transparent p-2 md:right-10"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 4L28 28M28 4L4 28"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <ul
          className={`mb-16 list-none p-0 text-center transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {NAV_LINKS.map((link, index) => (
            <li
              key={link.label}
              className={`transition-all duration-300 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? `${index * 100}ms` : '0ms' }}
            >
              {link.href.startsWith('mailto') ? (
                <a href={link.href} className={mobileLinkClassName}>
                  {link.label}
                </a>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={mobileLinkClassName}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div
          className={`w-full transition-opacity duration-300 ease-out ${
            menuOpen ? 'opacity-100 delay-200' : 'opacity-0'
          }`}
        >
          <SocialIcons containerClassName="mt-12 flex items-center justify-center gap-2 md:mr-24 md:justify-start" />
        </div>
      </nav>
    </>
  )
}
