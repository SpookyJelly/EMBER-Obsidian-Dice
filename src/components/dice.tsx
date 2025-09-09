import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { randomIntInclusive, sample } from '../lib/random'

export type DieFace = {
  label: React.ReactNode | string
  value: string
  weight?: number
}

export type DieProps = {
  faces: readonly DieFace[]
  sides?: number // optional numeric die fallback when no faces are provided
  onRoll?: (result: DieFace) => void
  className?: string
  rolling?: boolean
  rollDurationMs?: number
  hideButton?: boolean
  autoRollSignal?: number // incrementing value triggers a roll
  dieBgColor?: string
}

function weightedSample(faces: readonly DieFace[]): DieFace {
  const total = faces.reduce((sum, f) => sum + (f.weight ?? 1), 0)
  const r = randomIntInclusive({ min: 1, max: total })
  let acc = 0
  for (const f of faces) {
    acc += f.weight ?? 1
    if (r <= acc) return f
  }
  return faces[faces.length - 1]!
}

export function Dice({
  faces,
  sides,
  onRoll,
  className,
  rolling: externalRolling,
  rollDurationMs = 500,
  hideButton = false,
  autoRollSignal,
  dieBgColor,
}: DieProps) {
  const initial = faces.length
    ? faces[0]!
    : { label: 1, value: '1' }
  const [current, setCurrent] = useState<DieFace>(initial)
  const [isRolling, setIsRolling] = useState(false)

  const display = useMemo(() => current.label, [current])

  const doRandomNumeric = useCallback(() => {
    const n = randomIntInclusive({ min: 1, max: sides ?? 6 })
    return { label: n, value: String(n) } as DieFace
  }, [sides])

  const roll = useCallback(() => {
    if (isRolling) return
    setIsRolling(true)

    const steps = 8
    const interval = Math.max(30, Math.floor(rollDurationMs / steps))
    let i = 0
    const spin = setInterval(() => {
      const interim = faces.length ? sample(faces) : doRandomNumeric()
      setCurrent(interim as DieFace)
      i++
      if (i >= steps) {
        clearInterval(spin)
        const finalVal = faces.length ? weightedSample(faces) : doRandomNumeric()
        setCurrent(finalVal)
        setIsRolling(false)
        onRoll?.(finalVal)
      }
    }, interval)
  }, [doRandomNumeric, faces, isRolling, onRoll, rollDurationMs])

  // roll only when autoRollSignal CHANGES (not on initial mount)
  const prevSignalRef = useRef<number | undefined>(undefined)
  useEffect(() => {
    // Ignore initial mount when signal is undefined
    if (autoRollSignal === undefined) {
      prevSignalRef.current = autoRollSignal
      return
    }
    // Roll on first defined signal or whenever it changes
    if (prevSignalRef.current === undefined || autoRollSignal !== prevSignalRef.current) {
      roll()
    }
    prevSignalRef.current = autoRollSignal
  }, [autoRollSignal, roll])

  const visualRolling = externalRolling ?? isRolling

  return (
    <div className={className}>
      {!hideButton && (
        <button onClick={roll} disabled={visualRolling} style={{
          padding: '12px 16px',
          borderRadius: 8,
          border: '1px solid #444',
          background: visualRolling ? '#333' : '#1a1a1a',
          color: 'white',
          width: '100%',
        }}>
          Roll
        </button>
      )}
      <div style={{
        marginTop: 8,
        borderRadius: 8,
        border: '1px solid #d1d5db',
        background: dieBgColor ?? '#111',
        padding: 6,
        textAlign: 'center',
        fontSize: 14,
        aspectRatio: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'filter 100ms ease',
        filter: visualRolling ? 'blur(0.5px) brightness(1.03)' : 'none',
        width: 32,
        height: 32,
      }}>
        {display}
      </div>
    </div>
  )
}

export default Dice


