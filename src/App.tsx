import { useMemo, useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameState } from './hooks/useGameState'
import { IntroScreen } from './components/IntroScreen'
import { NameEntryScreen } from './components/NameEntryScreen'
import { RoomScreen } from './components/RoomScreen'
import { ResultScreen } from './components/ResultScreen'
import { ROOM_COUNT } from './data/rooms'
import { applyPlayerNameToRoom } from './utils/applyPlayerNameToRoom'
import { scrollToTop } from './utils/scrollToTop'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function App() {
  const {
    state,
    currentRoom,
    progress,
    finishIntro,
    submitName,
    selectChoice,
    nextRoom,
    prevRoom,
    restart,
  } = useGameState()

  useLayoutEffect(() => {
    scrollToTop()
    const id = requestAnimationFrame(() => scrollToTop())
    return () => cancelAnimationFrame(id)
  }, [state.phase, state.currentRoomIndex])

  const personalizedRoom = useMemo(
    () =>
      currentRoom && state.playerName
        ? applyPlayerNameToRoom(currentRoom, state.playerName)
        : currentRoom,
    [currentRoom, state.playerName]
  )

  return (
    <AnimatePresence mode="wait">
      {state.phase === 'intro' && (
        <motion.div key="intro" {...pageVariants} transition={{ duration: 0.5 }}>
          <IntroScreen onIntroComplete={finishIntro} />
        </motion.div>
      )}

      {state.phase === 'nameEntry' && (
        <motion.div key="nameEntry" {...pageVariants} transition={{ duration: 0.4 }}>
          <NameEntryScreen onSubmit={submitName} />
        </motion.div>
      )}

      {state.phase === 'room' && personalizedRoom && (
        <motion.div
          key={`room-${personalizedRoom.id}`}
          {...pageVariants}
          transition={{ duration: 0.3 }}
        >
          <RoomScreen
            room={personalizedRoom}
            playerName={state.playerName}
            roomIndex={state.currentRoomIndex}
            totalRooms={ROOM_COUNT}
            progress={progress}
            onChoiceSelect={selectChoice}
            onNext={nextRoom}
            onPrev={prevRoom}
            canGoBack={state.currentRoomIndex > 0}
            selectedChoice={state.choices[personalizedRoom.id]}
          />
        </motion.div>
      )}

      {state.phase === 'result' && (
        <motion.div key="result" {...pageVariants} transition={{ duration: 0.5 }}>
          <ResultScreen state={state} onRestart={restart} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
