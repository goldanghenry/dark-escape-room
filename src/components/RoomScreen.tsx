import { useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type Room } from '../data/rooms'
import { TypeWriter } from './TypeWriter'
import { TagChips } from './TagChip'
import { scrollToTop } from '../utils/scrollToTop'

interface RoomScreenProps {
  room: Room
  playerName: string
  roomIndex: number
  totalRooms: number
  progress: number
  onChoiceSelect: (roomId: number, choiceIndex: number) => void
  onNext: () => void
  onPrev: () => void
  canGoBack: boolean
  selectedChoice: number | string | undefined
}

const SYSTEM_REACTIONS = [
  '기록됨.',
  '흥미로운 선택이군.',
  '계속하라.',
  '예상 범위 내.',
  '...기록됨.',
  '패턴이 보인다.',
]

export function RoomScreen({
  room,
  playerName,
  roomIndex,
  totalRooms,
  progress,
  onChoiceSelect,
  onNext,
  onPrev,
  canGoBack,
  selectedChoice,
}: RoomScreenProps) {
  const [phase, setPhase] = useState<'unlock' | 'typing' | 'choices' | 'comment'>('unlock')
  const isLastRoom = roomIndex === totalRooms - 1

  useLayoutEffect(() => {
    scrollToTop()
  }, [room.id])

  useEffect(() => {
    setPhase('unlock')
    const hasAnswer = selectedChoice !== undefined
    const t = setTimeout(() => setPhase(hasAnswer ? 'comment' : 'typing'), 700)
    return () => clearTimeout(t)
  }, [room.id])

  const handleChoiceClick = (idx: number) => {
    onChoiceSelect(room.id, idx)
    if (phase !== 'comment') setPhase('comment')
  }

  const randomReaction = SYSTEM_REACTIONS[room.id % SYSTEM_REACTIONS.length]

  return (
    <motion.div className="min-h-screen flex flex-col">
      <div className="border-b border-gray-800 px-3 sm:px-4 py-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="mono text-xs text-gray-600 shrink-0 hidden sm:inline">DARK_PSYCH_LAB</span>
          <span className="text-gray-700 hidden sm:inline">|</span>
          <span className="mono text-xs text-green-400 shrink-0">
            ROOM_{String(room.id).padStart(2, '0')}
          </span>
        </div>
        <span className="mono text-xs text-gray-600 truncate sm:text-right w-full sm:w-auto">
          {playerName}씨 · {roomIndex + 1} / {totalRooms}
        </span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-3 sm:px-4 py-6 sm:py-8 max-w-2xl mx-auto w-full pb-[max(1rem,env(safe-area-inset-bottom))]">
        <AnimatePresence>
          {phase !== 'unlock' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full mb-6"
            >
              <h2 className="text-white text-base sm:text-lg font-semibold tracking-wide mb-1">
                {room.id}. {room.title}
              </h2>
              <motion.div className="mb-2">
                <TagChips tagString={room.tag} />
              </motion.div>
              {room.atmosphere && (
                <p className="mono text-xs text-gray-600 mt-2 italic">{room.atmosphere}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {phase === 'unlock' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1] }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center justify-center py-20"
          >
            <span className="mono text-green-400 text-sm glow-green tracking-widest">
              {`:: ROOM ${room.id} UNLOCKED ::`}
            </span>
          </motion.div>
        )}

        {(phase === 'typing' || phase === 'choices' || phase === 'comment') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full mb-6"
          >
            <div className="border-l-2 border-gray-700 pl-4 py-1">
              {phase === 'typing' ? (
                <TypeWriter
                  lines={room.situation}
                  speed={25}
                  onComplete={() => setPhase('choices')}
                  className="text-sm text-gray-300 space-y-1 leading-relaxed"
                />
              ) : (
                <motion.div className="text-sm text-gray-300 space-y-1">
                  {room.situation.map((line, i) => (
                    <p key={i} className="leading-relaxed min-h-[1.2rem]">
                      {line || '\u00A0'}
                    </p>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {(phase === 'choices' || phase === 'comment') && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full space-y-2"
          >
            {room.prompt && (
              <p className="mono text-sm mb-4 text-green-400 glow-green">{room.prompt}</p>
            )}
            {phase === 'comment' && (
              <p className="mono text-xs text-gray-600 mb-2">
                다른 선택지를 눌러 답을 변경할 수 있습니다.
              </p>
            )}
            {room.choices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                className={`choice-btn text-sm sm:text-base ${selectedChoice === idx ? 'selected' : ''}`}
                onClick={() => handleChoiceClick(idx)}
              >
                {choice.label}
              </button>
            ))}
          </motion.div>
        )}

        {phase === 'comment' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full mt-6"
          >
            <div className="border border-gray-800 p-4" style={{ background: '#0a0a0a' }}>
              <p className="mono text-xs text-green-400 mb-2 glow-green">{randomReaction}</p>
              {room.systemComment && (
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "{room.systemComment}"
                </p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 flex flex-col-reverse sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2 sm:gap-3"
            >
              {canGoBack && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="mono text-base sm:text-xs tracking-widest px-6 py-3 min-h-[44px] w-full sm:w-auto border border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300 transition-all"
                >
                  ◀ 이전 방
                </button>
              )}
              <button
                type="button"
                onClick={onNext}
                className="mono text-base sm:text-xs tracking-widest px-8 py-3 min-h-[44px] w-full sm:w-auto border border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400 transition-all"
              >
                {isLastRoom ? '결과 보기 ▶' : '다음 방으로 ▶'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
