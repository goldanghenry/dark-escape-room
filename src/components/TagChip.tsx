import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTagDescription, splitTagParts } from '../data/tagDescriptions'

interface SingleTagChipProps {
  label: string
  className?: string
  active: boolean
  onToggle: (label: string) => void
}

function TagChip({ label, className = '', active, onToggle }: SingleTagChipProps) {
  const [hovered, setHovered] = useState(false)
  const description = getTagDescription(label)
  const open = active || hovered

  return (
    <span className={`relative inline-block ${className}`}>
      <motion.button
        type="button"
        aria-expanded={open}
        aria-label={`${label} 태그 설명`}
        className={`tag-chip-btn inline-block px-2.5 py-1.5 rounded border text-xs mono cursor-pointer transition-colors min-h-[36px] ${
          open
            ? 'border-green-400/80 bg-green-400/15 text-green-300'
            : 'border-gray-700/80 bg-gray-900/40 text-gray-500'
        }`}
        onClick={() => onToggle(label)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        whileTap={{ scale: 0.98 }}
      >
        {label}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 bottom-full mb-1 z-50 w-64 max-w-[min(16rem,calc(100vw-2rem))] sm:max-w-[16rem]"
          >
            <div className="rounded border border-green-400/60 bg-gray-950/95 px-3 py-2 shadow-lg shadow-black/40">
              <p className="text-xs text-gray-200 leading-relaxed">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

interface TagChipsProps {
  tagString: string
  className?: string
}

export function TagChips({ tagString, className = '' }: TagChipsProps) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null)
  const parts = splitTagParts(tagString)

  const handleToggle = (label: string) => {
    setActiveLabel(prev => (prev === label ? null : label))
  }

  if (parts.length === 0) return null
  if (parts.length === 1) {
    return (
      <TagChip
        label={parts[0]}
        className={className}
        active={activeLabel === parts[0]}
        onToggle={handleToggle}
      />
    )
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {parts.map(part => (
        <TagChip
          key={part}
          label={part}
          active={activeLabel === part}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}
