import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLink } from '../api'

export default function Stats() {
  const { code } = useParams()
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getLink(code)
        setLink(data)
      } catch (e) {
        setError('Not found')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [code])

  // Inline styles
  const containerStyle = {
    maxWidth: "800px",
    margin: "24px auto",
    padding: "0 16px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    paddingBottom: "20px"
  }

  const headingStyle = {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0d47a1",
    padding: "20px 0",
    borderBottom: "1px solid #eee",
    marginBottom: "20px",
    textAlign: "center"
  }

  const rowStyle = {
    marginBottom: "14px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center"
  }

  const labelStyle = {
    fontWeight: "600",
    marginRight: "8px",
    width: "150px"
  }

  const linkStyle = {
    color: "#0d47a1",
    textDecoration: "none",
    wordBreak: "break-all"
  }

  const errorStyle = {
    padding: "10px",
    background: "#ffebee",
    color: "#c62828",
    border: "1px solid #ffcdd2",
    borderRadius: "6px",
    marginBottom: "20px"
  }

  const loadingStyle = {
    padding: "12px",
    fontSize: "17px",
    color: "#444",
    textAlign: "center"
  }

  if (loading) return <div style={loadingStyle}>Loading...</div>
  if (error) return <div style={errorStyle}>{error}</div>

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Stats for {link.code}</h2>

      <div style={rowStyle}>
        <span style={labelStyle}>Target:</span>
        <a
          href={link.target}
          target="_blank"
          rel="noreferrer"
          style={linkStyle}
        >
          {link.target}
        </a>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Clicks:</span>
        <span>{link.clicks}</span>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Last Clicked:</span>
        <span>{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '-'}</span>
      </div>
    </div>
  )
}
