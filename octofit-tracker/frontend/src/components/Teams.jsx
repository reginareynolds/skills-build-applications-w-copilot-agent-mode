import { useEffect, useState } from 'react'
import { fetchResource, getItems } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchResource('teams', controller.signal).then((payload) => setTeams(getItems(payload))).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) })
    return () => controller.abort()
  }, [])
  return <section className="resource-panel"><div className="section-heading"><div><p className="eyebrow">COMMUNITY</p><h2>Your teams</h2></div><span className="count-badge">{teams.length} teams</span></div>{error && <p className="error-message">{error}</p>}{!error && teams.length === 0 && <p className="empty-state">Create a team to make every workout count.</p>}{teams.length > 0 && <div className="team-grid">{teams.map((team, index) => <article className="team-card" key={team._id ?? index}><div className="team-mark">{team.name?.slice(0, 1).toUpperCase() ?? 'T'}</div><div><h3>{team.name ?? 'Unnamed team'}</h3><p>{team.description ?? 'Ready to move together.'}</p></div><strong>{team.totalPoints ?? 0}<small> pts</small></strong></article>)}</div>}</section>
}

export default Teams