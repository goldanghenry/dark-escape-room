import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { type Profile, type Scores } from '../../data/profiles'
import { ProfileAnalysis, type ReportVariant } from './ProfileAnalysis'
import { ResponseTendenciesCard } from './ResponseTendenciesCard'
import { ChoiceLogList } from './ChoiceLogList'

export interface ResultReportProps {
  profile: Profile
  scores: Scores
  choices: Record<number, number | string>
  playerName: string
  variant: ReportVariant
}

export const ResultReport = forwardRef<HTMLDivElement, ResultReportProps>(
  ({ profile, scores, choices, playerName, variant }, ref) => {
    const isCapture = variant === 'capture'

    const wrapperStyle = isCapture
      ? {
          background: '#0a0a0a',
          border: '1px solid #1e1e1e',
          padding: '32px',
          width: '560px',
          fontFamily: "'Noto Sans KR', sans-serif",
          color: '#c8c8c8',
        }
      : undefined

    const header = isCapture ? (
      <motion.div
        style={{ marginBottom: '24px', borderBottom: '1px solid #1e1e1e', paddingBottom: '16px' }}
      >
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#00ff88',
            letterSpacing: '0.2em',
            marginBottom: '8px',
          }}
        >
          DARK PSYCHOLOGY LAB — {playerName}씨 REPORT
        </p>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
          {profile.name}
        </h2>
        <p style={{ fontSize: '13px', color: '#888', fontStyle: 'italic' }}>{profile.subtitle}</p>
      </motion.div>
    ) : (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10">
        <p className="mono text-xs text-green-400 tracking-widest mb-3 glow-green">
          {playerName}씨 — 실험 완료 · 심리 프로파일 생성됨
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{profile.name}</h1>
        <p className="text-gray-400 italic">{profile.subtitle}</p>
      </motion.div>
    )

    const footer = isCapture ? (
      <motion.div
        style={{
          borderTop: '1px solid #1a1a1a',
          paddingTop: '12px',
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#444' }}>
          2026 독서모임 · 다크 심리학
        </p>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#444' }}>
          {new Date().toLocaleDateString('ko-KR')}
        </p>
      </motion.div>
    ) : null

    return (
      <motion.div ref={ref} style={wrapperStyle} className={isCapture ? undefined : 'w-full'}>
        {header}
        <ResponseTendenciesCard
          profile={profile}
          scores={scores}
          playerName={playerName}
          variant={variant}
          captureLayout={isCapture ? 'embedded' : undefined}
        />
        <ProfileAnalysis profile={profile} scores={scores} variant={variant} />
        <ChoiceLogList playerName={playerName} choices={choices} variant={variant} />
        {footer}
      </motion.div>
    )
  }
)

ResultReport.displayName = 'ResultReport'
