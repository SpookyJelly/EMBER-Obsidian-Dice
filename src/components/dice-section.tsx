import { useMemo, useRef, useState } from 'react'
import Dice, { type DieFace } from './dice'
import SectionCard from './section-card'

type DiceSectionProps = {
  title: string
  accent: string
  faces: readonly Omit<DieFace, 'value'>[] | readonly DieFace[]
  sides?: number
  minCount?: number
  maxCount?: number
}

export function DiceSection({ title, accent, faces, sides, minCount = 1, maxCount = 10 }: DiceSectionProps) {
  const [count, setCount] = useState(Math.min(Math.max(minCount, 1), maxCount))
  const [signal, setSignal] = useState<number | null>(null)

  // normalize faces to include textual value for logging
  const normalizedFaces: readonly DieFace[] = useMemo(() => {
    return faces.map((f) =>
      'value' in f
        ? (f as DieFace)
        : ({ label: (f as any).label, value: String((f as any).label), weight: (f as any).weight })
    )
  }, [faces])

  const canAdjust = minCount !== maxCount

  const handleRollAll = () => {
    resultsRef.current = []
    setSignal((s) => (s == null ? 0 : s + 1))
  }

  const resultsRef = useRef<string[]>([])
  const onChildRoll = (result: DieFace) => {
    resultsRef.current.push(result.value)
    if (resultsRef.current.length >= count) {
      // finished one roll set
      resultsRef.current = []
    }
  }

  // Build reference summary: unique faces by value; count identical entries (ignore weights)
  const referenceItems = useMemo(() => {
    const map = new Map<string, { label: React.ReactNode; value: string; count: number }>()
    for (const f of normalizedFaces) {
      const key = f.value
      const prev = map.get(key)
      if (prev) prev.count += 1
      else map.set(key, { label: f.label, value: key, count: 1 })
    }
    return Array.from(map.values())
  }, [normalizedFaces])

  return (
    <SectionCard title={title} accent={accent}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {canAdjust && (
          <>
            <button onClick={() => setCount((c) => Math.max(minCount, c - 1))} style={{ padding: '8px 12px' }}>-</button>
            <div style={{ width: 40, textAlign: 'center' }}>{count}</div>
            <button onClick={() => setCount((c) => Math.min(maxCount, c + 1))} style={{ padding: '8px 12px' }}>+</button>
          </>
        )}
        <button onClick={handleRollAll} style={{ padding: '8px 12px', marginLeft: 'auto' }}>Roll All</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 48px)', gap: 6, justifyContent: 'space-between' }}>
        {Array.from({ length: count }).map((_, i) => (
          <Dice
            key={i}
            faces={normalizedFaces}
            sides={sides}
            onRoll={onChildRoll}
            hideButton
            autoRollSignal={signal ?? undefined}
            dieBgColor={sides === 6 ? '#f7f7f7' : accent}
          />
        ))}
      </div>
      <div style={{ marginTop: 8 }}>
      <hr/>
      <span style={{ fontSize: 11, color: '#6b7280' }}>Reference:</span>
      {referenceItems.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 11, color: '#6b7280', display:'flex',flexWrap:'wrap' }}>
          {referenceItems.map((item, idx) => (
            <span key={idx} style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 2, marginRight: 6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', transform: 'scale(0.8)', transformOrigin: 'left center' }}>
                {item.value === 'blank' ? (
                  <span>blank</span>
                ) : (
                  <>{item.label}</>
                )}
              </span>
              <span>{': '}{item.count}{idx < referenceItems.length - 1 ? ',' : ''}</span>
            </span>
          ))}
        </div>
      )}
      </div>
    </SectionCard>
  )
}

export default DiceSection


