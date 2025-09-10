import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [selectedDice, setSelectedDice] = useState<Set<number>>(new Set())
  const [diceSignals, setDiceSignals] = useState<Map<number, number>>(new Map())

  // normalize faces to include textual value for logging
  const normalizedFaces: readonly DieFace[] = useMemo(() => {
    return faces.map((f) =>
      'value' in f
        ? (f as DieFace)
        : ({ label: (f as any).label, value: String((f as any).label), weight: (f as any).weight })
    )
  }, [faces])

  const canAdjust = minCount !== maxCount

  // Clear selection and signals when count changes
  useEffect(() => {
    setSelectedDice(new Set())
    setDiceSignals(new Map())
    setSignal(null) // Clear global signal to prevent auto-rolling new dice
  }, [count])

  const handleRollAll = () => {
    resultsRef.current = []
    setSignal((s) => (s == null ? 0 : s + 1))
    setSelectedDice(new Set()) // Clear selection after roll all
    
    // Clear all signals after roll duration (500ms)
    setTimeout(() => {
      setDiceSignals(new Map())
      setSignal(null) // Clear global signal as well
    }, 500)
  }

  const handleDiceClick = (index: number) => {
    setSelectedDice(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleRollSelected = () => {
    if (selectedDice.size === 0) return
    
    // Create individual signals for selected dice only
    setDiceSignals(prev => {
      const newMap = new Map(prev)
      selectedDice.forEach(index => {
        const currentSignal = newMap.get(index) || 0
        newMap.set(index, currentSignal + 1)
      })
      return newMap
    })
    setSelectedDice(new Set()) // Clear selection after roll
    
    // Clear all signals after roll duration (500ms)
    setTimeout(() => {
      setDiceSignals(new Map())
      setSignal(null) // Clear global signal as well
    }, 500)
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
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button 
            onClick={handleRollSelected} 
            disabled={selectedDice.size === 0}
            style={{ 
              padding: '8px 12px',
              opacity: selectedDice.size === 0 ? 0.5 : 1,
              cursor: selectedDice.size === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Reroll ({selectedDice.size})
          </button>
          <button onClick={handleRollAll} style={{ padding: '8px 12px' }}>Roll All</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 48px)', gap: 8, justifyContent: 'space-between' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i}
            onClick={() => handleDiceClick(i)}
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              outline: selectedDice.has(i) ? `1px solid ${accent}` : 'none',
              outlineOffset: selectedDice.has(i) ? '2px' : '0px',
            }}
          >
            <Dice
              faces={normalizedFaces}
              sides={sides}
              onRoll={onChildRoll}
              hideButton
              autoRollSignal={diceSignals.get(i) ?? signal ?? undefined}
              dieBgColor={sides === 6 ? '#f7f7f7' : accent}
            />
          </div>
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


