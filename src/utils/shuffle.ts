/**
 * Fisher-Yates shuffle – מחזיר עותק מעורבב בלי לשנות את המערך המקורי.
 * משותף לחידון הראשי ולחידון התרחישים (תוכנית עבודה 18.4.2).
 */
export function shuffle<T>(array: T[]): T[] {
  const out = [...array]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
