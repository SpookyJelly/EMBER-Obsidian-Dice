export type Range = {
  min: number
  max: number
}

/**
 * Returns a cryptographically strong random integer in [min, max].
 */
export function randomIntInclusive({ min, max }: Range): number {
  if (!Number.isInteger(min) || !Number.isInteger(max) || max < min) {
    throw new Error('Invalid range for randomIntInclusive')
  }
  if (min === max) return min

  const span = max - min + 1

  // Rejection sampling to avoid modulo bias
  const maxUint32 = 0xffffffff
  const limit = Math.floor(maxUint32 / span) * span

  const cryptoObj = globalThis.crypto || (globalThis as any).msCrypto
  if (!cryptoObj?.getRandomValues) {
    // Fallback (non-crypto) if not available
    return min + Math.floor(Math.random() * span)
  }

  const buf = new Uint32Array(1)
  let x = 0
  do {
    cryptoObj.getRandomValues(buf)
    x = buf[0]
  } while (x >= limit)
  return min + (x % span)
}

/**
 * Picks a random element from an array.
 */
export function sample<T>(items: readonly T[]): T {
  if (items.length === 0) throw new Error('Cannot sample from empty array')
  const idx = randomIntInclusive({ min: 0, max: items.length - 1 })
  return items[idx]
}


