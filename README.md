# MERN Todo List Application

A full-stack Todo application built with MongoDB, Express, React, and Node.js.

## Project Structure

```
ToDoList/
├── frontend/     # React + Vite frontend
├── backend/      # Express + MongoDB backend
└── README.md
```

## Features

- User authentication (Register/Login)
- JWT-based authorization
- Create, complete, and delete todos
- Responsive UI with modern design
- MongoDB Atlas integration

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   MONGO_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-secret-key
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (optional, for production):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Deployment

- **Frontend**: Deploy to Vercel/Netlify (set Root Directory to `frontend`)
- **Backend**: Deploy to Render/Railway (set Root Directory to `backend`)

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend (.env)
- `VITE_API_URL`: Backend API URL (defaults to http://localhost:5000)

### Live Link 
Link - https://todo-list-app-git-main-adityaverma19s-projects.vercel.app/
