import { useEffect, useState } from 'react'
import { fetchResource, getItems } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchResource(leaderboardEndpoint, controller.signal).then((payload) => setEntries(getItems(payload))).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) })
    return () => controller.abort()
  }, [])
  return <section className="resource-panel"><div className="section-heading"><div><p className="eyebrow">WEEKLY RACE</p><h2>Leaderboard</h2></div><span className="count-badge">{entries.length} athletes</span></div>{error && <p className="error-message">{error}</p>}{!error && entries.length === 0 && <p className="empty-state">The leaderboard is waiting for its first scores.</p>}{entries.length > 0 && <ol className="leaderboard-list">{entries.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999)).map((entry, index) => <li key={entry._id ?? index}><span className="rank">{entry.rank ?? index + 1}</span><span className="leader-name">{entry.user?.displayName ?? entry.user?.username ?? entry.user ?? 'Athlete'}</span><strong>{entry.points ?? 0}<small> pts</small></strong></li>)}</ol>}</section>
}

export default Leaderboard