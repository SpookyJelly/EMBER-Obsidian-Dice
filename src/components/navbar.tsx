export default function NavBar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 100,
      background: '#ffffffcc',
      backdropFilter: 'saturate(180%) blur(8px)',
      borderBottom: '1px solid #e5e7eb',
      fontSize: 12,
    }}>
      <div style={{ maxWidth: 540, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <strong style={{ fontWeight: 700 }}>Ember: Obsidian Protocol Dice</strong>
        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={() => {
              // Placeholder; to be wired after launch
              window.location.href = '#bug-report'
            }}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: '#f9fafb',
              color: '#111827',
              cursor: 'pointer',
            }}
          >
            Report a Bug
          </button>
        </div>
      </div>
    </nav>
  )
}


