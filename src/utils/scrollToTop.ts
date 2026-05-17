/** 화면 전환 시 문서 스크롤을 맨 위로 */
export function scrollToTop(): void {
  const active = document.activeElement
  if (active instanceof HTMLElement) {
    active.blur()
  }

  const scroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    const root = document.getElementById('root')
    if (root) root.scrollTop = 0
  }

  scroll()
  requestAnimationFrame(() => {
    scroll()
    requestAnimationFrame(scroll)
  })
}

/** 요소가 보이도록 스크롤 (다음 방 버튼 등) */
export function scrollToElement(
  el: HTMLElement | null,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'end' },
): void {
  if (!el) return
  el.scrollIntoView(options)
}
