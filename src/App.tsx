import './App.css'
import DiceSection from './components/dice-section'
import { defenseD8, dodgeD8, hitD6, strongAttackD8, weakAttackD8 } from './lib/dice-defs'
import NavBar from './components/navbar'

function App() {
  return (
    <div>
      <NavBar />
      <div style={{ maxWidth: 540, margin: '0 auto', padding: 16, paddingTop: 72 }}>
        <DiceSection title="Hit Location (D6)" accent="#a3e635" faces={hitD6} sides={6} minCount={1} maxCount={1} />
        <DiceSection title="Weak Attack (D8)" accent="#f8d54a" faces={weakAttackD8} sides={8} minCount={1} maxCount={12} />
        <DiceSection title="Strong Attack (D8)" accent="#ef4444" faces={strongAttackD8} sides={8} minCount={1} maxCount={12} />
        <DiceSection title="Defense (D8)" accent="#9ca3af" faces={defenseD8} sides={8} minCount={1} maxCount={12} />
        <DiceSection title="Dodge (D8)" accent="#60a5fa" faces={dodgeD8} sides={8} minCount={1} maxCount={12} />
      </div>
    </div>
  )
}

export default App
