import { forwardRef } from 'react'
import { type Profile, type Scores } from '../../data/profiles'
import { ResponseTendenciesCard } from './ResponseTendenciesCard'
import { ProfileAnalysis } from './ProfileAnalysis'

export interface ProfileSummaryCaptureProps {
  profile: Profile
  scores: Scores
  playerName: string
}

/** RESPONSE_TENDENCIES + 유형 분석 카드 PNG용 (off-screen) */
export const ProfileSummaryCapture = forwardRef<HTMLDivElement, ProfileSummaryCaptureProps>(
  ({ profile, scores, playerName }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          background: '#0a0a0a',
          border: '1px solid #1e1e1e',
          padding: '32px',
          width: '560px',
          fontFamily: "'Noto Sans KR', sans-serif",
          color: '#c8c8c8',
        }}
      >
        <div
          style={{ marginBottom: '16px', borderBottom: '1px solid #1e1e1e', paddingBottom: '12px' }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#00ff88',
              letterSpacing: '0.15em',
              marginBottom: '6px',
            }}
          >
            {playerName}씨 · PROFILE SUMMARY
          </p>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>
            {profile.name}
          </p>
          <p style={{ fontSize: '12px', color: '#888', fontStyle: 'italic', margin: 0 }}>
            {profile.subtitle}
          </p>
        </div>

        <ResponseTendenciesCard
          profile={profile}
          scores={scores}
          playerName={playerName}
          variant="capture"
          captureLayout="embedded"
        />

        <ProfileAnalysis profile={profile} scores={scores} variant="capture" captureAsCard />
      </div>
    )
  }
)

ProfileSummaryCapture.displayName = 'ProfileSummaryCapture'
