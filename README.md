# TinyLink – URL Shortener

TinyLink is a full-stack URL shortening application inspired by Bitly.  
It allows users to create short URLs, track clicks, view statistics, and manage links.

This project is built based on the TinyLink Take-Home Assignment.

---

## 🚀 Features

### 🔗 URL Shortening
- Convert long URLs into short shareable codes  
- Optional custom short code (`[A-Za-z0-9]{6,8}`)  
- Duplicate short codes return **409 Conflict**  

### 📊 Link Statistics
- Tracks total clicks  
- Tracks last clicked timestamp  
- Dedicated Stats page for each link  

### ↪️ Redirection
- Visit `/:code` to redirect  
- Backend increments click count + updates lastClicked  
- Returns **302 redirect**  

### 🗑️ Link Management
- View all links on Dashboard  
- Delete links (soft delete)  
- After deletion, redirects return **404**  

### 🩺 Health Check
`GET /healthz` returns:
```json
{ "ok": true, "version": "1.0" }
