import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><NavLink className="brand" to="/"><span className="brand-mark">O</span><span>Octofit</span></NavLink><span className="status-dot">LIVE TRAINING HUB</span></header>
      <main className="main-content"><section className="intro"><p className="eyebrow">YOUR WEEK IN MOTION</p><h1>Make your next move<br /><em>count.</em></h1><p className="intro-copy">Track the work, find your people, and keep momentum close.</p></section><nav className="primary-nav" aria-label="Primary navigation"><NavLink end to="/">Overview</NavLink><NavLink to="/activities">Activities</NavLink><NavLink to="/workouts">Workouts</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/users">Members</NavLink></nav><Routes><Route path="/" element={<Dashboard />} /><Route path="/activities" element={<Activities />} /><Route path="/workouts" element={<Workouts />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /></Routes></main><footer>OCTOFIT TRACKER <span>Build a little better every day.</span></footer>
    </div>
  )
}

function Dashboard() {
  return <section className="dashboard-grid"><NavLink className="feature-tile warm" to="/activities"><span className="tile-number">01</span><div><h2>Log your effort</h2><p>See every run, ride, and reset in one place.</p></div><span className="tile-arrow">↗</span></NavLink><NavLink className="feature-tile mint" to="/workouts"><span className="tile-number">02</span><div><h2>Find your focus</h2><p>Choose a workout that meets you where you are.</p></div><span className="tile-arrow">↗</span></NavLink><NavLink className="feature-tile ink" to="/leaderboard"><span className="tile-number">03</span><div><h2>Move together</h2><p>Turn consistency into a team advantage.</p></div><span className="tile-arrow">↗</span></NavLink></section>
}

export default App
