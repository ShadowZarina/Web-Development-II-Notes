import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Calendar from './components/Calendar'
import DailyQuests from './components/DailyQuests'
import MainQuests from './components/MainQuests'
import SideQuests from './components/SideQuests'

const CATEGORIES = [
  { path: '/daily', label: 'Daily Quests' },
  { path: '/main', label: 'Main Quests' },
  { path: '/side', label: 'Side Quests' },
]

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  // onClick handler: moves the user to another route without a page reload
  const goTo = (path) => {
    navigate(path)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Yozora</h1>
        <p className="App-tagline">
          <span lang="ja">夜空</span> &middot; your night sky questboard
        </p>
      </header>

      <main className="App-layout">
        {/* Reusable, non-route component: stays put while the quests change */}
        <aside className="App-calendar">
          <Calendar />
        </aside>

        <section className="App-quests">
          <nav className="quest-nav" aria-label="Quest categories">
            {CATEGORIES.map((category) => (
              <button
                key={category.path}
                type="button"
                className={
                  location.pathname === category.path
                    ? 'quest-nav-button active'
                    : 'quest-nav-button'
                }
                aria-current={location.pathname === category.path ? 'page' : undefined}
                onClick={() => goTo(category.path)}
              >
                {category.label}
              </button>
            ))}
          </nav>

          <Routes>
            <Route path="/" element={<Navigate to="/daily" replace />} />
            <Route path="/daily" element={<DailyQuests />} />
            <Route path="/main" element={<MainQuests />} />
            <Route path="/side" element={<SideQuests />} />
            <Route path="*" element={<Navigate to="/daily" replace />} />
          </Routes>
        </section>
      </main>
    </div>
  )
}

export default App
