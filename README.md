# TinyLink – URL Shortener

TinyLink is a full-stack URL shortening application inspired by Bitly.  
It allows users to create short URLs, track clicks, view statistics, and manage links.

This project is built based on the TinyLink Take-Home Assignment.
# Deployment links:
- Backend: https://tiny-company-assignment.onrender.com
- frontend: https://tiny-company-assignment.vercel.app/

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
json
{ "ok": true, "version": "1.0" }
## Tech Stack
## Frontend

- React (Vite)

- React Router

- Inline CSS (no external files)

# Backend

- Node.js + Express.js

- REST API

- Database

- MongoDB (Mongoose)
  ## API Endpoints
 Create Short Link

- POST /api/links

- List All Links

- GET /api/links

- Get Stats

- GET /api/links/:code

- Delete Link

- DELETE /api/links/:code

- Redirect

- GET /:code
  # project Structure
  <img width="306" height="547" alt="image" src="https://github.com/user-attachments/assets/7bae9816-e97f-4d3a-92c8-144087478f30" />
<img width="237" height="716" alt="image" src="https://github.com/user-attachments/assets/8c68d8d4-d9aa-40f8-9b11-c512a66c2eff" />

#  How It Works (End-to-End Flow)

- User submits a long URL

- Backend validates and stores it

- Dashboard displays the new link

- Clicking the short link calls /code → backend increments click count

- Stats page shows updated information

- Deleted links stop redirecting (404)
  # Screenshot
  <img width="1793" height="783" alt="image" src="https://github.com/user-attachments/assets/f1302c92-a2e4-4820-afec-e3e4468899ca" />
  # stats
  <img width="1357" height="951" alt="image" src="https://github.com/user-attachments/assets/722e6503-e549-488e-b211-1b2d5ec45ae0" />
  <img width="617" height="226" alt="image" src="https://github.com/user-attachments/assets/09d82b0e-5d4c-4a47-9368-7b9273051d94" />
  <img width="1003" height="501" alt="image" src="https://github.com/user-attachments/assets/3cc7e768-0331-47f8-bb66-76df9f6e9a4a" />



