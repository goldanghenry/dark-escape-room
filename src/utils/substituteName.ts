/** Replace `{name}` placeholders with the player's entered name. */
export function substituteName(text: string, name: string): string {
  const n = name.trim() || '피험자'
  return text.replace(/\{name\}/g, n)
}

export function withPlayerName<T extends string | undefined>(
  text: T,
  name: string
): T {
  if (text === undefined) return text
  return substituteName(text, name) as T
}
