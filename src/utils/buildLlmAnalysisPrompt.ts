import { SCORED_ROOMS } from '../data/rooms'
import {
  type Profile,
  type Scores,
  SCORE_LABELS,
  SCORE_DESCRIPTIONS,
} from '../data/profiles'
import { applyPlayerNameToRoom } from './applyPlayerNameToRoom'

export interface LlmPromptInput {
  playerName: string
  profile: Profile
  scores: Scores
  choices: Record<number, number | string>
}

export function buildLlmAnalysisPrompt({
  playerName,
  profile,
  scores,
  choices,
}: LlmPromptInput): string {
  const scoreLines = (Object.keys(SCORE_LABELS) as (keyof Scores)[]).map(
    key =>
      `- ${SCORE_LABELS[key]}: ${scores[key]}점 — ${SCORE_DESCRIPTIONS[key]}`
  )

  const roomBlocks = SCORED_ROOMS.map(room => {
    const p = applyPlayerNameToRoom(room, playerName)
    const idx = choices[room.id]
    const choice =
      typeof idx === 'number' && p.choices[idx] ? p.choices[idx] : null
    const situation = p.situation.filter(Boolean).join('\n')
    const choiceScores = choice
      ? `인식 ${choice.scores.awareness} / 단호 ${choice.scores.assertion} / 공감 ${choice.scores.empathy} / 전략 ${choice.scores.strategy}`
      : '(선택 없음)'

    return `### Room ${room.id}. ${p.title}
- 태그: ${p.tag}
- 상황:
${situation}
- 질문: ${p.prompt ?? '(없음)'}
- 나의 선택: ${choice ? choice.label : '(선택 없음)'}
- 선택별 점수: ${choiceScores}
- 퍼실리테이터 코멘트: ${p.systemComment}`
  }).join('\n\n')

  return `# 다크 심리학 방탈출 실험 — 결과 분석 요청

## 당신의 역할
독서모임 토론을 돕는 분석가입니다. 아래는 「다크 심리학」 테마의 인터랙티브 선택 게임(10개 상황, 4지선다) 결과입니다. 피험자에게 **공감적이고 구체적인** 해석을 한국어로 제공하세요.

## 테스트 개요
- **형식**: 직장·관계·SNS·협상 등 일상 10가지 딜레마 상황에서 4지선다
- **점수 축**: 인식력(awareness), 단호함(assertion), 공감도(empathy), 전략성(strategy)
- **중요**: 합계 점수는 **우열 순위가 아니라** 선택에서 자주 드러난 **대응 경향**입니다. 높다/낮다 = 좋다/나쁘다가 아닙니다.
- **유형**: 8가지 프로필 중 하나로 요약되며, 유형은 참고용 레이블입니다.

## 피험자: ${playerName}씨

### 산출 유형
- **${profile.name}** — ${profile.subtitle}
- ${profile.description}

### RESPONSE_TENDENCIES (4축 합계)
${scoreLines.join('\n')}

---

## 방별 선택 기록

${roomBlocks}

---

## 분석 요청 (다음 순서로 작성해 주세요)

1. **전체 패턴**: 10개 선택을 관통하는 태도·가치관·반복되는 트레이드오프
2. **다크 심리학 렌즈**: 조작·경계·인정욕구·영향력 등 관점에서 읽히는 부분 (비난이 아닌 이해 중심)
3. **강점과 리스크**: 이 경향이 직장·관계에서 도움이 되는 순간 vs 비용이 커지는 순간
4. **유형과의 관계**: 부여된 유형(${profile.name})이 선택 기록과 얼마나 맞는지, 다른 해석 가능성
5. **독서모임 토론 질문** 3~5개: 참가자들이 자신의 경험과 연결할 수 있는 열린 질문

## 제약
- 정신과적 **진단·라벨링**은 하지 마세요.
- "당신은 ○○한 사람입니다" 단정보다 **경향·맥락**으로 표현하세요.
- 구체적 행동·상황을 1~2개 인용하며 설명하세요.
- 응답은 **한국어**로 작성하세요.
`
}
