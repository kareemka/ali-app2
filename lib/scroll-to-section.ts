export function scrollToSection(
  hash: string,
  options: { smooth?: boolean; updateUrl?: boolean } = {}
) {
  const { smooth = true, updateUrl = true } = options
  const id = hash.startsWith('#') ? hash : `#${hash}`

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
