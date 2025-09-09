type IconProps = {
  size?: number
  filled?: boolean
  color?: string
}

export function DiamondIcon({ size = 18, filled = false, color = '#000' }: IconProps) {
  const half = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {filled ? (
        <polygon points={`${half},0 ${size},${half} ${half},${size} 0,${half}`} fill={color} />
      ) : (
        <polygon points={`${half},2 ${size - 2},${half} ${half},${size - 2} 2,${half}`} fill="none" stroke={color} strokeWidth={2} />
      )}
    </svg>
  )
}

export function ShieldIcon({ size = 18, filled = false, color = '#000' }: IconProps) {
  const w = size
  const h = size
  const path = `M ${w * 0.5} 2 L ${w - 2} ${h * 0.25} V ${h * 0.55} C ${w - 2} ${h * 0.8}, ${w * 0.75} ${h - 2}, ${w * 0.5} ${h - 2} C ${w * 0.25} ${h - 2}, 2 ${h * 0.8}, 2 ${h * 0.55} V ${h * 0.25} Z`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      {filled ? (
        <path d={path} fill={color} />
      ) : (
        <path d={path} fill="none" stroke={color} strokeWidth={2} />
      )}
    </svg>
  )
}

export function ExplosionIcon({ size = 18, filled = false, color = '#000' }: IconProps) {
  const cx = size / 2
  const cy = size / 2
  const spikes = 8
  const outer = size / 2 - 2
  const inner = outer * 0.55
  const points: Array<[number, number]> = []
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI * i) / spikes
    points.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  const d = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ') + ' Z'
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {filled ? (
        <path d={d} fill={color} />
      ) : (
        <path d={d} fill="none" stroke={color} strokeWidth={2} />
      )}
    </svg>
  )}


