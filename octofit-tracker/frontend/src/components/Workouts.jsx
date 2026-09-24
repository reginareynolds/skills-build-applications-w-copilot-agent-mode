import { useEffect, useState } from 'react'
import { fetchResource, getItems } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchResource('workouts', controller.signal).then((payload) => setWorkouts(getItems(payload))).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) })
    return () => controller.abort()
  }, [])
  return <section className="resource-panel"><div className="section-heading"><div><p className="eyebrow">TRAINING PLAN</p><h2>Workouts</h2></div><span className="count-badge">{workouts.length} plans</span></div>{error && <p className="error-message">{error}</p>}{!error && workouts.length === 0 && <p className="empty-state">Your next workout will appear here.</p>}{workouts.length > 0 && <div className="workout-grid">{workouts.map((workout, index) => <article className="workout-card" key={workout._id ?? index}><span className="tag">{workout.category ?? 'training'}</span><h3>{workout.title ?? 'Untitled workout'}</h3><p>{workout.description ?? 'A focused session for your goals.'}</p><footer><span>{workout.difficulty ?? 'All levels'}</span><strong>{workout.durationMinutes ?? 0} min</strong></footer></article>)}</div>}</section>
}

export default Workouts