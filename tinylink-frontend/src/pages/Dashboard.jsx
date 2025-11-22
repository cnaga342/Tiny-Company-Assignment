import React, { useEffect, useState } from 'react'
import { listLinks, createLink, deleteLink } from '../api'
import AddLinkForm from '../components/AddLinkForm'
import LinkTable from '../components/LinkTable'

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const data = await listLinks()
      setLinks(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (payload) => {
    try {
      const created = await createLink(payload)
      setLinks(prev => [created, ...prev])
      return { ok: true }
    } catch (e) {
      return { ok: false, error: e.message || 'Failed', status: e.status }
    }
  }

  const handleDelete = async (code) => {
    if (!confirm(`Delete ${code}?`)) return
    try {
      await deleteLink(code)
      setLinks(prev => prev.filter(l => l.code !== code))
    } catch (e) {
      alert('Delete failed')
    }
  }

  // Inline CSS Styles
  const pageContainer = {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "0 16px"
  }

  const headingStyle = {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0d47a1",
    marginBottom: "20px"
  }

  const sectionStyle = {
    marginBottom: "24px"
  }

  const loadingStyle = {
    padding: "10px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#555"
  }

  const errorStyle = {
    padding: "10px",
    background: "#ffebee",
    color: "#c62828",
    borderRadius: "6px",
    marginBottom: "20px",
    border: "1px solid #ffcdd2"
  }

  return (
    <div style={pageContainer}>
      <h2 style={headingStyle}>Dashboard</h2>

      <section style={sectionStyle}>
        <AddLinkForm onCreate={handleCreate} />
      </section>

      {loading && <div style={loadingStyle}>Loading...</div>}
      {error && <div style={errorStyle}>{error}</div>}

      {!loading && !error && (
        <LinkTable links={links} onDelete={handleDelete} />
      )}
    </div>
  )
}
