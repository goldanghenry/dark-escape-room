import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeWriter } from './TypeWriter'
import { scrollToTop } from '../utils/scrollToTop'

interface IntroScreenProps {
  onIntroComplete: () => void
}

const INTRO_LINES = [
  '> 시스템 초기화 중...',
  '> 피험자 입장 확인됨.',
  '',
  '이곳은 다크 심리학 연구소다.',
  '',
  '당신은 지금까지 수없이 선택을 해왔다.',
  '친구의 부탁을 들어줄 때, 상사의 칭찬에 기분이 좋아질 때,',
  '타이머 앞에서 서둘러 결제할 때.',
  '',
  '10개의 방이 당신을 기다린다.',
  '각 방에는 하나의 상황이 있고, 하나의 선택이 있다.',
  '',
  '모든 선택은 기록된다.',
  '',
  '준비가 됐다면 — 시작하라.',
]

export function IntroScreen({ onIntroComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState<'title' | 'typing' | 'button'>('title')

  const handleTitleClick = () => {
    setPhase('typing')
  }

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <AnimatePresence mode="wait">
        {phase === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-lg"
          >
            <div className="mb-8">
              <p className="mono text-xs tracking-[0.3em] text-green-400 mb-4 glow-green">
                DARK PSYCHOLOGY LAB
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                다크 심리학
              </h1>
              <p className="text-lg text-gray-400 font-light">
                방탈출 심리 실험
              </p>
            </div>

            <div
              className="border border-gray-700 p-6 mb-8 text-left"
              style={{ background: 'rgba(0,255,136,0.02)' }}
            >
              <p className="mono text-xs text-gray-500 mb-3">EXPERIMENT_INFO.txt</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                총 10개의 심리 실험실을 통과하라.<br />
                각 방의 선택은 당신의 심리 프로파일을 구성한다.<br />
                마지막에는 당신이 누구인지 알게 될 것이다.
              </p>
            </div>

            <motion.button
              onClick={handleTitleClick}
              className="mono tracking-widest px-10 py-3 min-h-[44px] w-full max-w-xs border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200"
            >
              START_EXPERIMENT.exe
            </motion.button>

            <p className="mt-6 text-xs text-gray-600 mono">
              소요 시간: 약 5~10분
            </p>
          </motion.div>
        )}

        {phase === 'typing' && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl w-full"
          >
            <div
              className="border border-gray-800 p-6 md:p-8"
              style={{ background: '#0a0a0a' }}
            >
              <p className="mono text-xs text-green-400 mb-6 glow-green">
                SYSTEM_LOG — {new Date().toLocaleDateString('ko-KR')}
              </p>

              <TypeWriter
                lines={INTRO_LINES}
                speed={30}
                onComplete={() => {
                  setPhase('button')
                }}
                className="mono text-sm text-gray-300 space-y-1"
              />
            </div>
          </motion.div>
        )}

        {phase === 'button' && (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl w-full"
          >
            <div
              className="border border-gray-800 p-6 md:p-8"
              style={{ background: '#0a0a0a' }}
            >
              <p className="mono text-xs text-green-400 mb-6 glow-green">
                SYSTEM_LOG — {new Date().toLocaleDateString('ko-KR')}
              </p>

              <div className="mono text-sm text-gray-300 space-y-1">
                {INTRO_LINES.map((line, i) => (
                  <p key={i} className="leading-relaxed min-h-[1.5rem]">
                    {line || '\u00A0'}
                  </p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center"
              >
                <motion.button
                  onClick={() => {
                    scrollToTop()
                    onIntroComplete()
                  }}
                  className="mono tracking-widest px-12 py-3 min-h-[44px] w-full max-w-xs border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200"
                >
                  ▶  다음
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
