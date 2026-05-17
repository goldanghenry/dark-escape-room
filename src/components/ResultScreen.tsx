import { useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { type GameState } from '../hooks/useGameState'
import { ResultReport } from './result/ResultReport'
import { ProfileSummaryCapture } from './result/ProfileSummaryCapture'
import { captureAsPng } from '../utils/captureAsPng'
import { buildLlmAnalysisPrompt } from '../utils/buildLlmAnalysisPrompt'
import { copyToClipboard } from '../utils/copyToClipboard'

interface ResultScreenProps {
  state: GameState
  onRestart: () => void
}

type SaveTarget = 'full' | 'tendencies' | null
type CopyStatus = 'idle' | 'copied' | 'failed'

const HIDDEN_CAPTURE_STYLE: CSSProperties = {
  position: 'fixed',
  left: '-9999px',
  top: 0,
  pointerEvents: 'none',
}

export function ResultScreen({ state, onRestart }: ResultScreenProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const tendenciesRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState<SaveTarget>(null)
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')

  const { profile, totalScores, choices, playerName } = state

  if (!profile) return null

  const reportProps = {
    profile,
    scores: totalScores,
    choices,
    playerName,
  }

  const handleSaveFull = async () => {
    if (!cardRef.current) return
    setSaving('full')
    try {
      await captureAsPng(
        cardRef.current,
        `dark-psych-report-${profile.id}-${Date.now()}.png`
      )
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(null)
    }
  }

  const handleSaveTendencies = async () => {
    if (!tendenciesRef.current) return
    setSaving('tendencies')
    try {
      await captureAsPng(
        tendenciesRef.current,
        `dark-psych-tendencies-${profile.id}-${Date.now()}.png`
      )
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(null)
    }
  }

  const handleCopyPrompt = async () => {
    const prompt = buildLlmAnalysisPrompt({
      playerName,
      profile,
      scores: totalScores,
      choices,
    })
    const ok = await copyToClipboard(prompt)
    setCopyStatus(ok ? 'copied' : 'failed')
    setTimeout(() => setCopyStatus('idle'), 2000)
  }

  const btnBase =
    'mono text-xs tracking-widest px-6 py-3 min-h-[44px] border transition-all w-full disabled:opacity-50'

  return (
    <div className="min-h-screen pb-[max(5rem,env(safe-area-inset-bottom))]">
      <div className="border-b border-gray-800 px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
        <span className="mono text-xs text-gray-600 shrink-0">DARK_PSYCH_LAB</span>
        <span className="mono text-xs text-green-400 glow-green text-right">EXPERIMENT COMPLETE</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: '100%' }} />
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ResultReport {...reportProps} variant="screen" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col gap-2 mt-8"
        >
          <button
            type="button"
            onClick={handleSaveTendencies}
            disabled={saving !== null}
            className={`${btnBase} border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400`}
          >
            {saving === 'tendencies'
              ? '저장 중...'
              : '📷  경향 + 유형 분석 저장 (PNG)'}
          </button>
          <button
            type="button"
            onClick={handleSaveFull}
            disabled={saving !== null}
            className={`${btnBase} border-green-400 text-green-400 hover:bg-green-400 hover:text-black`}
          >
            {saving === 'full' ? '저장 중...' : '📷  전체 리포트 저장 (PNG)'}
          </button>
          <button
            type="button"
            onClick={handleCopyPrompt}
            disabled={copyStatus === 'copied'}
            className={`${btnBase} border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black`}
          >
            {copyStatus === 'copied'
              ? '✓  프롬프트 복사됨'
              : copyStatus === 'failed'
                ? '복사 실패 — 다시 시도'
                : '📋  GPT 분석 프롬프트 복사'}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className={`${btnBase} border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300`}
          >
            ↺  다시 시작
          </button>
        </motion.div>
      </div>

      <div style={HIDDEN_CAPTURE_STYLE}>
        <ResultReport ref={cardRef} {...reportProps} variant="capture" />
        <ProfileSummaryCapture
          ref={tendenciesRef}
          profile={profile}
          scores={totalScores}
          playerName={playerName}
        />
      </div>
    </div>
  )
}
