# Multi-User Task Management System

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL

## Features
- User registration and login
- Add tasks
- View tasks
- Multi-user support (tasks linked with user_id)

## System Flow
Frontend sends HTTP requests → Backend (Express) → MySQL database → Response in JSON → Display in UI

## Database Tables
- users (id, username, password)
- tasks (id, title, status, user_id)

## How to Run
1. npm install
2. node backend/server.js
3. Open frontend/index.html
