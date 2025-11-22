import React, { useState } from 'react'

function isValidUrl(u) {
  try { const x = new URL(u); return x.protocol === 'http:' || x.protocol === 'https:' } catch { return false }
}

function isValidCode(c) {
  return /^[A-Za-z0-9]{6,8}$/.test(c)
}

export default function AddLinkForm({ onCreate }) {
  const [target, setTarget] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null); setSuccess(null)

    if (!isValidUrl(target)) {
      setError('Enter a valid http(s) URL')
      return
    }
    if (code && !isValidCode(code)) {
      setError('Code must be [A-Za-z0-9]{6,8}')
      return
    }

    setLoading(true)
    const resp = await onCreate({ target, code: code || undefined })
    setLoading(false)

    if (resp.ok) {
      setSuccess('Link created!')
      setTarget('')
      setCode('')
      setTimeout(() => setSuccess(null), 2000)
    } else {
      setError(resp.error || 'Create failed')
    }
  }

  // Inline styles 
  const cardStyle = {
    border: "1px solid #e0e0e0",
    padding: "16px",
    borderRadius: "8px",
    background: "#fafafa",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    marginBottom: "20px"
  }

  const rowStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px"
  }

  const labelStyle = {
    marginBottom: "6px",
    fontWeight: "600",
    color: "#333"
  }

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px"
  }

  const buttonStyle = {
    padding: "10px 14px",
    background: "#0d47a1",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    width: "120px",
    marginTop: "6px"
  }

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: 0.6,
    cursor: "not-allowed"
  }

  const errorStyle = {
    color: "#c62828",
    marginTop: "10px",
    fontWeight: "500"
  }

  const successStyle = {
    color: "#2e7d32",
    marginTop: "10px",
    fontWeight: "500"
  }

  return (
    <form onSubmit={submit} style={cardStyle}>
      <div style={rowStyle}>
        <label style={labelStyle}>Target URL</label>
        <input
          style={inputStyle}
          value={target}
          onChange={e => setTarget(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div style={rowStyle}>
        <label style={labelStyle}>Custom Code (optional)</label>
        <input
          style={inputStyle}
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="abc123"
        />
      </div>

      <div>
        <button
          type="submit"
          style={loading ? disabledButtonStyle : buttonStyle}
          disabled={loading}
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </div>

      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>{success}</div>}
    </form>
  )
}
