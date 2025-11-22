import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'

export default function App() {
  
  // Inline CSS
  const appStyle = {
    fontFamily: "Inter, Arial, sans-serif",
    background: "#f5f7fa",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  }

  const headerStyle = {
    background: "#0d47a1",
    padding: "14px 0",
    color: "white",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
  }

  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 16px"
  }

  const headerTitleStyle = {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700"
  }

  const headerLinkStyle = {
    color: "white",
    textDecoration: "none"
  }

  const mainStyle = {
    flex: "1",
    width: "100%",
    ...containerStyle
  }

  const footerStyle = {
    marginTop: "30px",
    padding: "16px 0",
    background: "#e0e0e0",
    textAlign: "center",
    color: "#555",
    fontSize: "14px"
  }

  return (
    <div style={appStyle}>
      
      {/* HEADER */}
      <header style={headerStyle}>
        <div style={containerStyle}>
          <h1 style={headerTitleStyle}>
            <Link to="/" style={headerLinkStyle}>TinyLink</Link>
          </h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<Stats />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer style={footerStyle}>
        <div style={containerStyle}>
          Built for TinyLink take-home
        </div>
      </footer>

    </div>
  )
}
