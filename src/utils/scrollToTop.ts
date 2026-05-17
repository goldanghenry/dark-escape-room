/** 화면 전환 시 문서 스크롤을 맨 위로 (모바일 scroll anchoring·iOS 포커스 줌 대응) */
export function scrollToTop(): void {
  const active = document.activeElement
  if (active instanceof HTMLElement) {
    active.blur()
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}
