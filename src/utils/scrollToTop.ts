const VIEWPORT_CONTENT =
  'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'

/** iOS Safari 포커스 줌 잔여 배율 초기화 */
function resetViewportScale(): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')
  if (!meta) return
  meta.setAttribute('content', `${VIEWPORT_CONTENT}, shrink-to-fit=no`)
  requestAnimationFrame(() => {
    meta.setAttribute('content', VIEWPORT_CONTENT)
  })
}

/** 화면 전환 시 문서 스크롤을 맨 위로 (모바일 scroll anchoring·iOS 포커스 줌 대응) */
export function scrollToTop(): void {
  const active = document.activeElement
  if (active instanceof HTMLElement) {
    active.blur()
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  if (window.matchMedia('(pointer: coarse)').matches) {
    resetViewportScale()
  }
}
