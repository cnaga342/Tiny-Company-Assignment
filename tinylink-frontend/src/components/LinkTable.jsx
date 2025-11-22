import React from 'react'
import { Link } from 'react-router-dom'

const BASE = (import.meta.env.VITE_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')

export default function LinkTable({ links, onDelete }) {
  if (!links.length) return <div>No links yet.</div>

  // Inline styles
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    fontSize: "15px",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 1px 4px rgba(0,0,0,0.1)"
  }

  const theadStyle = {
    background: "#0d47a1",
    color: "white"
  }

  const thTdStyle = {
    padding: "12px 14px",
    borderBottom: "1px solid #f0f0f0",
    textAlign: "left",
    verticalAlign: "middle"
  }

  const linkStyle = {
    color: "#0d47a1",
    textDecoration: "none",
    fontWeight: 500
  }

  const deleteBtnStyle = {
    padding: "6px 10px",
    background: "#c62828",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    marginLeft: "8px"
  }

  const rowHover = {
    transition: "background 0.2s"
  }

  const truncateStyle = {
    maxWidth: "350px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }

  return (
    <table style={tableStyle}>
      <thead style={theadStyle}>
        <tr>
          <th style={thTdStyle}>Code</th>
          <th style={thTdStyle}>Target</th>
          <th style={thTdStyle}>Clicks</th>
          <th style={thTdStyle}>Last Clicked</th>
          <th style={thTdStyle}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.map(l => (
          <tr
            key={l.code}
            style={rowHover}
            onMouseEnter={e => e.currentTarget.style.background = "#f7f9fc"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <td style={thTdStyle}>
              <a
                href={`${BASE}/${encodeURIComponent(l.code)}`}
                target="_blank"
                rel="noreferrer"
                style={linkStyle}
              >
                {l.code}
              </a>
            </td>

            <td style={{ ...thTdStyle, ...truncateStyle }}>{l.target}</td>
            <td style={thTdStyle}>{l.clicks}</td>
            <td style={thTdStyle}>
              {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : '-'}
            </td>

            <td style={thTdStyle}>
              <Link to={`/code/${encodeURIComponent(l.code)}`} style={linkStyle}>
                Stats
              </Link>

              <button
                onClick={() => onDelete(l.code)}
                style={deleteBtnStyle}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
