import { motion } from 'framer-motion'
import { SCORED_ROOMS } from '../../data/rooms'
import { applyPlayerNameToRoom } from '../../utils/applyPlayerNameToRoom'
import { TagChips } from '../TagChip'
import type { ReportVariant } from './ProfileAnalysis'

const TRUNCATE_LEN = 80

function truncate(text: string, max = TRUNCATE_LEN): string {
  const t = text.trim()
  if (t.length <= max) return t
  return t.slice(0, max) + '...'
}

interface ChoiceLogListProps {
  playerName: string
  choices: Record<number, number | string>
  variant: ReportVariant
}

export function ChoiceLogList({ playerName, choices, variant }: ChoiceLogListProps) {
  if (variant === 'capture') {
    return (
      <motion.div className="space-y-0">
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#555',
            marginBottom: '12px',
            letterSpacing: '0.1em',
            borderTop: '1px solid #1e1e1e',
            paddingTop: '16px',
          }}
        >
          CHOICE_LOG
        </p>
        {SCORED_ROOMS.map(room => {
          const personalized = applyPlayerNameToRoom(room, playerName)
          const choiceIdx = choices[room.id]
          const choice =
            typeof choiceIdx === 'number' ? personalized.choices[choiceIdx] : null
          const label = choice ? truncate(choice.label) : '선택 없음'
          return (
            <motion.div
              key={room.id}
              style={{
                border: '1px solid #1e1e1e',
                padding: '10px',
                marginBottom: '8px',
                background: '#0d0d0d',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#00ff88' }}>
                  Room {room.id}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '8px', color: '#666' }}>
                  {truncate(personalized.tag, 40)}
                </span>
              </div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#ddd', margin: '0 0 4px' }}>
                {personalized.title}
              </p>
              <p style={{ fontSize: '10px', color: '#888', margin: 0, lineHeight: 1.5 }}>{label}</p>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <motion.div className="space-y-3">
      <p className="mono text-xs text-gray-600 mb-4 pt-6 border-t border-gray-800">
        CHOICE_LOG · 모든 선택 기록
      </p>
      {SCORED_ROOMS.map(room => {
        const personalized = applyPlayerNameToRoom(room, playerName)
        const choiceIdx = choices[room.id]
        const choice =
          typeof choiceIdx === 'number' ? personalized.choices[choiceIdx] : null
        return (
          <motion.div
            key={room.id}
            className="border border-gray-800 p-3"
            style={{ background: '#0d0d0d' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
              <span className="mono text-xs text-green-400 shrink-0">Room {room.id}</span>
              <TagChips tagString={personalized.tag} className="justify-end" />
            </div>
            <p className="text-sm font-medium text-gray-200 mb-1">{personalized.title}</p>
            <p className="text-xs text-gray-500 break-words leading-relaxed">
              {choice ? choice.label : '선택 없음'}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
