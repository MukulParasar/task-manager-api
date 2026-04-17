# Task Manager API – Assignment 3

### Event-Driven Notifications & Advanced Data Handling

## 🎥 Demo Video

Watch the working demo here:  
https://drive.google.com/file/d/1Cb9Za9NvSNw2RTyJlRkEOI-7oYftYB3s/view

---

## 📌 Overview

This project is an enhanced version of a Task Management API built using Node.js and Express.js. It extends the core functionality by introducing event-driven features such as task reminders, categorization, tagging, and simulated webhook integration.

The system demonstrates backend design concepts including asynchronous processing, modular architecture, and external service communication.

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* PostgreSQL (User Authentication)
* JWT Authentication
* bcrypt.js
* dotenv

---

## 📂 Project Structure

```
task-manager-api/
│── src/
│   ├── config/          # DB connections
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Reminder & webhook logic
│   └── app.js           # Entry point
│
│── .env
│── package.json
```

---

## 🚀 Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-link>
cd task-manager-api
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```
PORT=5000
JWT_SECRET=supersecretkey

PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=yourpassword
PG_DATABASE=taskdb
PG_PORT=5432

MONGO_URI=your_mongodb_connection_string
WEBHOOK_URL=https://webhook.site/your-unique-url
```

---

### 4. Run Server

```
node src/app.js
```

Server will start on:

```
http://localhost:5000
```

---

## 🔐 Authentication APIs

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Profile

```
GET /api/auth/profile
```

---

## 🧾 Task APIs

### Create Task

```
POST /api/tasks
```

### Get All Tasks

```
GET /api/tasks
```

### Get Single Task

```
GET /api/tasks/:id
```

### Update Task

```
PATCH /api/tasks/:id
```

### Delete Task

```
DELETE /api/tasks/:id
```

---

## ✨ Features Implemented

### ⏰ 1. Real-Time Task Reminder

* When a task is created with a due date, a reminder is scheduled.
* Reminder triggers before due time.
* Output is logged in console.

---

### 🏷️ 2. Task Categories & Tags

* Tasks support:

  * Category (e.g., Work, Personal)
  * Tags (array of strings)
* Enables filtering and better organization.

---

### 🔎 3. Filtering

Tasks can be filtered using query parameters:

```
GET /api/tasks?category=Work
GET /api/tasks?tag=urgent
```

---

### 🔗 4. Webhook Integration (Simulated)

* When a task is marked **completed**, a POST request is sent to an external webhook.
* Payload includes:

  * Task ID
  * Title
  * User ID
  * Completion time

---

### 🔁 5. Retry Logic

* Webhook retries up to 3 times
* Uses exponential backoff strategy
* Ensures reliability in case of failure

---

## 🧠 Design Decisions

* **Hybrid Database Approach**

  * PostgreSQL for authentication (structured data)
  * MongoDB for tasks (flexible schema)

* **Event Handling**

  * Used `setTimeout` for lightweight scheduling
  * Suitable for small-scale/demo systems

* **Webhook Simulation**

  * External service simulated using webhook.site

---

## 🎥 Demo Coverage

The demo video includes:

* Creating a task with due date
* Reminder trigger in console
* Adding category and tags
* Fetching tasks
* Marking task as completed
* Webhook payload received

---

## ⚠️ Notes

* Reminder system is in-memory (resets on server restart)
* Filtering and authentication simplified for demo purposes
* Designed for demonstration, not production-scale deployment

---

## 👨‍💻 Author

Mukul
B.Tech CSE
Backend Developer Intern Applicant

---
