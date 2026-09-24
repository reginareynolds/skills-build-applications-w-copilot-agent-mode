import { useEffect, useState } from 'react'
import { fetchResource, getItems } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetchResource('users', controller.signal).then((payload) => setUsers(getItems(payload))).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) })
    return () => controller.abort()
  }, [])
  return <section className="resource-panel"><div className="section-heading"><div><p className="eyebrow">THE COMMUNITY</p><h2>Members</h2></div><span className="count-badge">{users.length} members</span></div>{error && <p className="error-message">{error}</p>}{!error && users.length === 0 && <p className="empty-state">No members have joined yet.</p>}{users.length > 0 && <div className="member-list">{users.map((user, index) => <div className="member-row" key={user._id ?? index}><div className="avatar">{(user.displayName ?? user.username ?? 'A').slice(0, 1).toUpperCase()}</div><div><strong>{user.displayName ?? user.username ?? 'Unnamed member'}</strong><span>{user.email ?? 'Community member'}</span></div></div>)}</div>}</section>
}

export default Users