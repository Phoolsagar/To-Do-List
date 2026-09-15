<div align="center">

# 📝 Full-Stack Todo Application

### React + Vite • Spring Boot • MySQL • Docker

A complete full-stack Todo List application with a modern React/Vite frontend and a Spring Boot REST API backend backed by MySQL.

### 🌐 Live Application

**[Open Todo Application](http://phoolsagars-todo.netlify.app/)**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](http://phoolsagars-todo.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Phoolsagar/To-Do-List)

</div>

---

## 📌 About The Project

The **Full-Stack Todo Application** is a CRUD-based web application designed to demonstrate full-stack development using modern frontend and backend technologies.

Users can create, view, update, complete, undo, and delete todos through a responsive web interface.

The frontend communicates with the backend using REST APIs, while the backend manages business logic and database operations using Spring Boot, Spring Data JPA, and MySQL.



---


## ✨ Features

- ➕ Create todos
- ✏️ Edit title and description
- ✅ Mark todos as completed
- ↩️ Undo completed todos
- 🗑️ Delete todos with confirmation
- 📋 View all todos
- ✔️ Input validation
- ⚠️ Error and loading states
- 📱 Responsive UI
- 💾 Persistent MySQL storage
- 🔄 Instant UI updates after operations

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Tools |
|---|---|---|---|
| React.js | Spring Boot | MySQL 8 | Docker |
| Vite | Java 17+ | Hibernate/JPA | Git |
| Axios | Spring REST API |  | GitHub |
| CSS | Maven |  |  |

---

## 🏗️ Architecture

```text
React.js + Vite
       │
       │ Axios / REST API
       ▼
Spring Boot
       │
       │ Spring Data JPA
       ▼
Hibernate
       │
       ▼
MySQL
```

The project follows a layered backend architecture:

```text
Controller → Service → Repository → MySQL
```

---

## 📂 Project Structure

```text
To-Do-List/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/example/todo/
│   │       │       ├── controller/
│   │       │       ├── service/
│   │       │       ├── repository/
│   │       │       ├── entity/
│   │       │       ├── dto/
│   │       │       ├── exception/
│   │       │       └── config/
│   │       └── resources/
│   ├── Dockerfile
│   └── pom.xml
│
├── .gitignore
└── README.md
```

---

## 🔗 REST API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todos` | Get all todos |
| `GET` | `/api/todos/{id}` | Get todo by ID |
| `POST` | `/api/todos` | Create todo |
| `PUT` | `/api/todos/{id}` | Update todo |
| `PATCH` | `/api/todos/{id}/complete` | Complete todo |
| `PATCH` | `/api/todos/{id}/uncomplete` | Undo completion |
| `DELETE` | `/api/todos/{id}` | Delete todo |

---

## 🚀 Run Locally

### Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 20+
- MySQL 8+

### 1. Create Database

```sql
CREATE DATABASE todo_db;
```

### 2. Configure Backend

Create `backend/.env`:

```env
DB_URL=jdbc:mysql://localhost:3306/todo_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### 3. Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### 4. Start Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

Then:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

> ⚠️ Never commit real `.env` files or database credentials. Use the provided `.env.example` files.

---

## 🐳 Docker

The backend includes Docker support.

```bash
docker build -t todo-backend ./backend
docker run -p 8080:8080 todo-backend
```

---

## 🌐 Deployment

```text
GitHub
  │
  ├── React/Vite → Netlify
  │
  └── Spring Boot → Docker → Backend Hosting
                              │
                              ▼
                           MySQL
```

**Live Application:**  
👉 http://phoolsagars-todo.netlify.app/

**Source Code:**  
👉 https://github.com/Phoolsagar/To-Do-List

---

## 👨‍💻 Author

**Phoolsagar Singh**  
Java Developer | B.Tech Computer Science & Engineering Graduate

**GitHub:** https://github.com/Phoolsagar

---

⭐ If you like this project, consider giving it a star!
