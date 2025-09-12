export default function NavBar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 100,
        background: "#ffffffcc",
        backdropFilter: "saturate(180%) blur(8px)",
        borderBottom: "1px solid #e5e7eb",
        fontSize: 12,
      }}
    >
      <div
        style={{
          maxWidth: 540,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <strong style={{ fontWeight: 700 }}>
          Ember: Obsidian Protocol Dice
        </strong>
        <div style={{ marginLeft: "auto" }}>
          <a
            href="https://forms.gle/8arRz1n2oAphCzzA7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "#f9fafb",
              color: "#111827",
              cursor: "pointer",
              textDecoration: "none", // 버튼처럼 보이게
              display: "inline-block",
            }}
          >
            Report a Bug
          </a>
        </div>
      </div>
    </nav>
  );
}
