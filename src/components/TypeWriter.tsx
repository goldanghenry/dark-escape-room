import { useState, useEffect, useRef } from 'react'

interface TypeWriterProps {
  lines: string[]
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TypeWriter({ lines, speed = 35, onComplete, className }: TypeWriterProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true)
      onCompleteRef.current?.()
      return
    }

    const line = lines[currentLine]

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev]
          updated[currentLine] = (updated[currentLine] ?? '') + line[currentChar]
          return updated
        })
        setCurrentChar(c => c + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      // Line complete — move to next after short pause
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar, lines, speed])

  return (
    <div className={className}>
      {displayedLines.map((line, i) => (
        <p key={i} className="leading-relaxed min-h-[1.5rem]">
          {line || '\u00A0'}
          {i === currentLine && !done && (
            <span className="cursor-blink text-green-400">▋</span>
          )}
        </p>
      ))}
      {done && <span className="cursor-blink text-green-400">▋</span>}
    </div>
  )
}
