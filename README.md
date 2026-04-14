# Task Manager API

## 🚀 Setup Instructions

### 1. Clone repo
git clone <your-repo-link>
cd task-manager-api

### 2. Install dependencies
npm install

### 3. Setup environment variables
Create `.env` file:

PORT=5000
JWT_SECRET=supersecretkey

PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=yourpassword
PG_DATABASE=conversely_db
PG_PORT=5432

MONGO_URI=your_mongodb_connection_string

### 4. Run server
npx nodemon src/app.js

---

## 📦 API Endpoints

### Auth

POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/profile  

### Tasks

POST /api/tasks  
GET /api/tasks  
GET /api/tasks/:id  
PATCH /api/tasks/:id  
DELETE /api/tasks/:id  

---

## 🔐 Authentication

Use JWT token in header:

Authorization: Bearer <token>

---

## 🧠 Architecture

- PostgreSQL → Users
- MongoDB → Tasks
- JWT → Authentication
- Express → API

---

## 📌 Design Decisions

- Used PostgreSQL for relational user data
- Used MongoDB for flexible task storage
- JWT for stateless authentication
- Middleware-based security