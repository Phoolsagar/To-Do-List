# Full-Stack Todo Applicatio

A complete Todo List application with a separate React/Vite frontend and Spring Boot/MySQL backend.

## Architecture

```text
todo-application/
├── frontend/                  # React.js + Vite + Axios
└── backend/                   # Spring Boot + JPA + MySQL
```

Request flow:

```text
React.js → Axios → Spring Boot REST API → Spring Data JPA → MySQL
```

## Features

- Create todos
- View all todos
- View a todo by ID
- Edit title and description
- Mark a todo completed
- Undo completion
- Delete with browser confirmation
- Input validation
- Global backend exception handling
- CORS configuration
- Loading and error states
- Responsive UI
- Persistent MySQL storage
- Immediate UI updates after successful API operations

## Requirements

- Java 17+
- Maven 3.9+
- Node.js 20+
- npm
- MySQL 8+

## 1. Create the database

Open MySQL:

```sql
CREATE DATABASE todo_db;
```

The `todos` table is created/updated automatically by Hibernate because:

```properties
spring.jpa.hibernate.ddl-auto=update
```

## 2. Configure the backend

The backend reads credentials from environment variables and has local defaults.

### Windows PowerShell

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
$env:DB_URL="jdbc:mysql://localhost:3306/todo_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true"
$env:CORS_ALLOWED_ORIGINS="http://localhost:5173"
```

Or edit `backend/src/main/resources/application.properties`.

Do not commit real database credentials.

## 3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

API base:

```text
http://localhost:8080/api
```

## 4. Run the frontend

Copy `.env.example` to `.env`:

```text
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

## REST API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/{id}` | Get one todo |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/{id}` | Update todo |
| PATCH | `/api/todos/{id}/complete` | Complete todo |
| PATCH | `/api/todos/{id}/uncomplete` | Undo completion |
| DELETE | `/api/todos/{id}` | Delete todo |

### Create/Update request

```json
{
  "title": "Learn Spring Boot",
  "description": "Revise REST APIs and MVC"
}
```

### Response

```json
{
  "id": 1,
  "title": "Learn Spring Boot",
  "description": "Revise REST APIs and MVC",
  "completed": false,
  "createdAt": "2026-09-15T02:46:00",
  "updatedAt": "2026-09-15T02:46:00"
}
```

## Backend package structure

```text
backend/src/main/java/com/example/todo/
├── config/
│   └── CorsConfig.java
├── controller/
│   └── TodoController.java
├── dto/
│   ├── TodoRequest.java
│   └── TodoResponse.java
├── entity/
│   └── Todo.java
├── exception/
│   ├── ApiError.java
│   ├── GlobalExceptionHandler.java
│   └── TodoNotFoundException.java
├── repository/
│   └── TodoRepository.java
├── service/
│   └── TodoService.java
└── TodoApplication.java
```

## Frontend package structure

```text
frontend/src/
├── components/
│   ├── EditTodoModal.jsx
│   ├── Navbar.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── pages/
│   └── TodoPage.jsx
├── services/
│   └── todoService.js
├── App.jsx
├── index.css
└── main.jsx
```

## Production notes

For production, replace `ddl-auto=update` with a migration tool such as Flyway or Liquibase, use secrets/environment management for database credentials, restrict CORS to the actual frontend domain, and serve the frontend over HTTPS.

## Troubleshooting

### MySQL connection error

Verify MySQL is running and that `todo_db` exists:

```sql
SHOW DATABASES;
```

Verify the username/password and `DB_URL`.

### CORS error

Make sure the frontend URL is listed in:

```text
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Port already in use

Backend uses port `8080`; Vite normally uses `5173`. Stop the conflicting process or change the port configuration.
