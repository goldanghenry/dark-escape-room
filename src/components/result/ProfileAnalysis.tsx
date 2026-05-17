import { motion } from 'framer-motion'
import { type Profile, type Scores } from '../../data/profiles'

export type ReportVariant = 'screen' | 'capture'

interface ProfileAnalysisProps {
  profile: Profile
  scores: Scores
  variant: ReportVariant
  /** capture 전용: 화면과 동일한 「유형 분석」 카드 스타일 */
  captureAsCard?: boolean
}

function CaptureAnalysisContent({ profile }: { profile: Profile }) {
  return (
    <>
      <p style={{ fontSize: '12px', color: '#bbb', lineHeight: 1.7, marginBottom: '12px' }}>
        {profile.description}
      </p>

      <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#00ff88', marginBottom: '6px' }}>
        강점
      </p>
      <ul style={{ margin: '0 0 12px 0', paddingLeft: '16px', fontSize: '11px', color: '#aaa', lineHeight: 1.6 }}>
        {profile.strengths.map((s, i) => (
          <li key={i} style={{ marginBottom: '4px' }}>
            {s}
          </li>
        ))}
      </ul>

      <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#ffb300', marginBottom: '6px' }}>
        주의할 점
      </p>
      <ul style={{ margin: '0 0 12px 0', paddingLeft: '16px', fontSize: '11px', color: '#999', lineHeight: 1.6 }}>
        {profile.tradeoffs.map((t, i) => (
          <li key={i} style={{ marginBottom: '4px' }}>
            {t}
          </li>
        ))}
      </ul>

      <p style={{ fontSize: '11px', color: '#aaa', lineHeight: 1.65, marginBottom: '12px' }}>
        {profile.inPractice}
      </p>

      <motion.div style={{ borderLeft: '2px solid #00ff88', paddingLeft: '10px', marginBottom: '12px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#00ff88', marginBottom: '4px' }}>
          ADVICE
        </p>
        <p style={{ fontSize: '11px', color: '#888', lineHeight: 1.6, fontStyle: 'italic' }}>
          {profile.advice}
        </p>
      </motion.div>

      <motion.div style={{ borderLeft: '2px solid #ffb300', paddingLeft: '10px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#ffb300', marginBottom: '4px' }}>
          토론 포인트
        </p>
        <p style={{ fontSize: '11px', color: '#888', lineHeight: 1.6 }}>{profile.discussion}</p>
      </motion.div>
    </>
  )
}

export function ProfileAnalysis({ profile, variant, captureAsCard }: ProfileAnalysisProps) {
  if (variant === 'capture') {
    if (captureAsCard) {
      return (
        <div
          style={{
            marginTop: '20px',
            border: '1px solid #1e1e1e',
            padding: '20px',
            background: '#0d0d0d',
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#666',
              marginBottom: '12px',
              letterSpacing: '0.05em',
            }}
          >
            유형 분석
          </p>
          <CaptureAnalysisContent profile={profile} />
        </div>
      )
    }

    return (
      <div style={{ marginBottom: '20px' }}>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#555',
            marginBottom: '10px',
            letterSpacing: '0.1em',
          }}
        >
          ANALYSIS
        </p>
        <CaptureAnalysisContent profile={profile} />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="border border-gray-800 p-4 sm:p-5 mb-6"
      style={{ background: '#0d0d0d' }}
    >
      <p className="mono text-xs text-gray-600 mb-3">유형 분석</p>
      <p className="text-sm text-gray-300 leading-relaxed mb-5">{profile.description}</p>

      <p className="mono text-xs text-green-400 mb-2">강점</p>
      <ul className="text-sm text-gray-400 leading-relaxed mb-5 list-disc pl-5 space-y-1">
        {profile.strengths.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <p className="mono text-xs text-amber-500 mb-2">주의할 점 (양면성)</p>
      <ul className="text-sm text-gray-500 leading-relaxed mb-5 list-disc pl-5 space-y-1">
        {profile.tradeoffs.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <p className="text-sm text-gray-300 leading-relaxed mb-4">{profile.inPractice}</p>

      <div className="border-l-2 border-green-400 pl-3 mb-4">
        <p className="mono text-xs text-green-400 mb-1">ADVICE</p>
        <p className="text-sm text-gray-400 italic leading-relaxed">{profile.advice}</p>
      </div>

      <div className="border-l-2 border-amber-500 pl-3">
        <p className="mono text-xs text-amber-500 mb-1">독서모임 토론 포인트</p>
        <p className="text-sm text-gray-400 leading-relaxed">{profile.discussion}</p>
      </div>
    </motion.div>
  )
}
