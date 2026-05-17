import html2canvas from 'html2canvas'

export async function captureAsPng(el: HTMLElement, filename: string): Promise<void> {
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
  const canvas = await html2canvas(el, {
    backgroundColor: '#0a0a0a',
    scale: 2,
    useCORS: true,
    logging: false,
    height: el.scrollHeight,
    windowHeight: el.scrollHeight,
  })
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
