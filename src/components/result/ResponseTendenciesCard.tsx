import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { type Profile, type Scores, SCORE_LABELS } from '../../data/profiles'
import type { ReportVariant } from './ProfileAnalysis'

const MAX_SCORE_PER_ROOM = 3
const TOTAL_ROOMS = 10
const MAX_TOTAL = MAX_SCORE_PER_ROOM * TOTAL_ROOMS

export interface ResponseTendenciesCardProps {
  profile: Profile
  scores: Scores
  playerName: string
  variant: ReportVariant
  /** capture 전용: standalone=경향 PNG 단독, embedded=전체 리포트 안 */
  captureLayout?: 'standalone' | 'embedded'
}

function ScreenScoreBar({
  label,
  value,
  max,
  delay,
}: {
  label: string
  value: number
  max: number
  delay: number
}) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="mb-4"
    >
      <motion.div className="flex justify-between items-center mb-1">
        <span className="mono text-xs text-gray-500">{label}</span>
        <span className="mono text-xs text-green-400">경향</span>
      </motion.div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

function CaptureScoreBar({
  label,
  value,
  max,
}: {
  label: string
  value: number
  max: number
}) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#888' }}>{label}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#00ff88' }}>경향</span>
      </div>
      <motion.div style={{ background: '#1a1a1a', height: '4px', width: '100%', borderRadius: '2px' }}>
        <motion.div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: '#00ff88',
            borderRadius: '2px',
          }}
        />
      </motion.div>
    </div>
  )
}

export const ResponseTendenciesCard = forwardRef<HTMLDivElement, ResponseTendenciesCardProps>(
  ({ profile, scores, playerName, variant, captureLayout = 'standalone' }, ref) => {
    const scoreKeys = Object.keys(SCORE_LABELS) as (keyof Scores)[]
    const isStandaloneCapture = variant === 'capture' && captureLayout === 'standalone'

    if (variant === 'capture') {
      return (
        <motion.div
          ref={ref}
          style={
            isStandaloneCapture
              ? {
                  background: '#0a0a0a',
                  border: '1px solid #1e1e1e',
                  padding: '32px',
                  width: '560px',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  color: '#c8c8c8',
                }
              : { marginBottom: '20px' }
          }
        >
          {isStandaloneCapture && (
          <div style={{ marginBottom: '16px', borderBottom: '1px solid #1e1e1e', paddingBottom: '12px' }}>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: '#00ff88',
                letterSpacing: '0.15em',
                marginBottom: '6px',
              }}
            >
              {playerName}씨 · RESPONSE_TENDENCIES
            </p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>
              {profile.name}
            </p>
            <p style={{ fontSize: '12px', color: '#888', fontStyle: 'italic', margin: 0 }}>
              {profile.subtitle}
            </p>
          </div>
          )}
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#555',
              marginBottom: '8px',
              letterSpacing: '0.1em',
            }}
          >
            RESPONSE_TENDENCIES
          </p>
          <p style={{ fontSize: '11px', color: '#666', marginBottom: '12px', lineHeight: 1.5 }}>
            아래 막대는 우열 점수가 아니라, 선택에서 자주 드러난 대응 경향입니다.
          </p>
          {scoreKeys.map(key => (
            <CaptureScoreBar
              key={key}
              label={SCORE_LABELS[key]}
              value={scores[key]}
              max={MAX_TOTAL}
            />
          ))}
        </motion.div>
      )
    }

    return (
      <div ref={ref} className="mb-8">
        <p className="mono text-xs text-gray-600 mb-2">RESPONSE_TENDENCIES</p>
        <p className="text-xs text-gray-500 mb-4">
          아래 막대는 우열 점수가 아니라, 선택에서 자주 드러난 대응 경향입니다.
        </p>
        {scoreKeys.map((key, i) => (
          <ScreenScoreBar
            key={key}
            label={SCORE_LABELS[key]}
            value={scores[key]}
            max={MAX_TOTAL}
            delay={0.1 + i * 0.1}
          />
        ))}
      </div>
    )
  }
)

ResponseTendenciesCard.displayName = 'ResponseTendenciesCard'
