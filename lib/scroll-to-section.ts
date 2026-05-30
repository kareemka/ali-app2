export function scrollToSection(
  hash: string,
  options: { smooth?: boolean; updateUrl?: boolean } = {}
) {
  const { smooth = true, updateUrl = true } = options
  const id = hash.startsWith('#') ? hash : `#${hash}`

  // إذا كانت الصفحة الحالية ليست الصفحة الرئيسية، انتقل للرئيسية مع الـ hash
  if (typeof window !== 'undefined') {
    const isHomePage = window.location.pathname === '/'
    if (!isHomePage) {
      window.location.href = `/${id}`
      return
    }
  }

  if (typeof window !== 'undefined' && updateUrl) {
    window.history.pushState(null, '', id)
  }

  const target = document.querySelector(id)
  if (!target) return

  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}

export function scrollToSectionFromUrl(hash: string) {
  if (!hash) return
  scrollToSection(hash, { smooth: false, updateUrl: false })
}
