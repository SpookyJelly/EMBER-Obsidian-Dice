type SectionCardProps = {
  title: string
  accent?: string
  children: React.ReactNode
}

export function SectionCard({ title, accent = '#444', children }: SectionCardProps) {
  return (
    <section style={{
      border: '1px solid #e5e7eb',
      background: '#ffffff',
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 8, height: 24, borderRadius: 4, background: accent }} />
        <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
      </div>
      <div>
        {children}
      </div>
    </section>
  )
}

export default SectionCard


