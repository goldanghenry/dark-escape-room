import { useState, useCallback } from 'react'
import { ROOMS, SCORED_ROOMS } from '../data/rooms'
import { calculateProfile, type Profile, type Scores } from '../data/profiles'

export type GamePhase = 'intro' | 'nameEntry' | 'room' | 'result'

export interface GameState {
  phase: GamePhase
  playerName: string
  currentRoomIndex: number
  choices: Record<number, number | string>
  totalScores: Scores
  profile: Profile | null
}

const INITIAL_STATE: GameState = {
  phase: 'intro',
  playerName: '',
  currentRoomIndex: 0,
  choices: {},
  totalScores: { awareness: 0, assertion: 0, empathy: 0, strategy: 0 },
  profile: null,
}

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE)

  const finishIntro = useCallback(() => {
    setState(s => ({ ...s, phase: 'nameEntry' }))
  }, [])

  const submitName = useCallback((name: string) => {
    setState(s => ({
      ...s,
      playerName: name.trim(),
      phase: 'room',
      currentRoomIndex: 0,
    }))
  }, [])

  const selectChoice = useCallback((roomId: number, choiceIndex: number) => {
    setState(s => ({
      ...s,
      choices: { ...s.choices, [roomId]: choiceIndex },
    }))
  }, [])

  const prevRoom = useCallback(() => {
    setState(s => {
      if (s.currentRoomIndex <= 0) return s
      return { ...s, currentRoomIndex: s.currentRoomIndex - 1 }
    })
  }, [])

  const nextRoom = useCallback(() => {
    setState(s => {
      const nextIndex = s.currentRoomIndex + 1
      if (nextIndex >= ROOMS.length) {
        const scores: Scores = { awareness: 0, assertion: 0, empathy: 0, strategy: 0 }
        SCORED_ROOMS.forEach(room => {
          const choiceIdx = s.choices[room.id]
          if (typeof choiceIdx === 'number' && room.choices[choiceIdx]) {
            const cs = room.choices[choiceIdx].scores
            scores.awareness += cs.awareness
            scores.assertion += cs.assertion
            scores.empathy += cs.empathy
            scores.strategy += cs.strategy
          }
        })
        const profile = calculateProfile(scores)
        return { ...s, phase: 'result', totalScores: scores, profile }
      }
      return { ...s, currentRoomIndex: nextIndex }
    })
  }, [])

  const restart = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  const currentRoom = ROOMS[state.currentRoomIndex]
  const progress = state.currentRoomIndex / ROOMS.length

  return {
    state,
    currentRoom,
    progress,
    finishIntro,
    submitName,
    selectChoice,
    nextRoom,
    prevRoom,
    restart,
  }
}
