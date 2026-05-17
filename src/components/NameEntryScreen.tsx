import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { scrollToTop } from '../utils/scrollToTop'

interface NameEntryScreenProps {
  onSubmit: (name: string) => void
}

export function NameEntryScreen({ onSubmit }: NameEntryScreenProps) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const trimmed = name.trim()
  const displayName = trimmed || '피험자'

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      inputRef.current?.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trimmed.length === 0) return
    inputRef.current?.blur()
    scrollToTop()
    onSubmit(trimmed)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-md w-full"
      >
        <p className="mono text-xs tracking-[0.3em] text-green-400 mb-6 text-center glow-green">
          SUBJECT_REGISTRATION
        </p>

        <motion.div
          className="border border-gray-800 p-5 sm:p-6 md:p-8"
          style={{ background: '#0a0a0a' }}
        >
          <p className="mono text-xs text-green-400 mb-4 glow-green">
            &gt; 피험자 신원 확인
          </p>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            실험 기록에 사용할 이름을 입력하라.
            <br />
            이후 시나리오에서 <span className="text-gray-200">{displayName}씨</span>로
            호칭된다.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div>
              <label
                htmlFor="player-name"
                className="mono text-xs text-gray-500 block mb-2"
              >
                NAME_INPUT
              </label>
              <input
                ref={inputRef}
                id="player-name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="이름 (예: 민수)"
                maxLength={12}
                autoComplete="name"
                className="w-full bg-gray-900 border border-gray-700 text-gray-100 text-base px-3 py-3 rounded-sm focus:outline-none focus:border-green-400 placeholder-gray-600 mono"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={trimmed.length === 0}
              className="w-full mono tracking-widest py-3 min-h-[44px] border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ▶  실험 시작
            </motion.button>
          </form>

          <p className="mono text-xs text-gray-600 mt-4 text-center">
            모든 선택은 {displayName}씨 이름으로 기록된다.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
