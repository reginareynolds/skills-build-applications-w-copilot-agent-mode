import { useEffect, useState } from 'react'
import { fetchResource, getItems } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchResource(activitiesEndpoint, controller.signal).then((payload) => setActivities(getItems(payload))).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) })
    return () => controller.abort()
  }, [])
  return <ResourceTable title="Recent activity" error={error} items={activities} empty="No activity logged yet." columns={['Type', 'Duration', 'Points', 'Completed']} renderRow={(activity) => [activity.type, `${activity.durationMinutes ?? 0} min`, activity.points ?? 0, formatDate(activity.completedAt)]} />
}

function ResourceTable({ title, error, items, empty, columns, renderRow }) {
  return <section className="resource-panel"><div className="section-heading"><div><p className="eyebrow">MOVEMENT LOG</p><h2>{title}</h2></div><span className="count-badge">{items.length} entries</span></div>{error && <p className="error-message">{error}</p>}{!error && items.length === 0 && <p className="empty-state">{empty}</p>}{items.length > 0 && <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{items.map((item, index) => <tr key={item._id ?? index}>{renderRow(item).map((value, valueIndex) => <td key={`${item._id ?? index}-${valueIndex}`}>{value || '—'}</td>)}</tr>)}</tbody></table></div>}</section>
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : '—'
}

export default Activities