import { type Room } from '../data/rooms'
import { substituteName } from './substituteName'

/** Return a copy of the room with `{name}` replaced in all display strings. */
export function applyPlayerNameToRoom(room: Room, playerName: string): Room {
  return {
    ...room,
    title: substituteName(room.title, playerName),
    tag: substituteName(room.tag, playerName),
    atmosphere: room.atmosphere
      ? substituteName(room.atmosphere, playerName)
      : undefined,
    situation: room.situation.map(line => substituteName(line, playerName)),
    prompt: room.prompt ? substituteName(room.prompt, playerName) : undefined,
    choices: room.choices.map(c => ({
      ...c,
      label: substituteName(c.label, playerName),
    })),
    systemComment: substituteName(room.systemComment, playerName),
  }
}
