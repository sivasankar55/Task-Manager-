# Scalable Web App: Authentication and Task Management Dashboard

This project is a full-stack, scalable web application built to demonstrate secure user authentication (JWT-based) and basic CRUD operations on a protected dashboard.  

  Core Features Implemented

 Frontend

 Built with React.js for a dynamic UI.
 Responsive Design using TailwindCSS for rapid styling.
 Protected Routes (Dashboard, Profile) requiring valid JWT.
 Client-side form handling and validation.
 Full Logout Flow.

 Backend & Security
Lightweight Node.js/Express backend.
JWT-based Authentication** (Signup/Login) for stateless security.
Password Hashing using BcryptJS.
Dedicated APIs for **User Profile** fetching and updating.
CRUD Operations** on a sample entity (Tasks).
Connected to MongoDB using Mongoose.
Server-side **Validation and Error Handling** (`express-validator`).

 Dashboard Functionality
Display and update of User Profile.
Full CRUD functionality for managing personal tasks.
Search and Filter UI for tasks (by title and status).


 Technology Stack

| Category | Technology | Purpose |
| Frontend | `React.js` | Component-based UI development |
| Styling | `TailwindCSS` | Utility-first CSS framework |
| Routing | `React Router DOM` | Client-side routing |
| HTTP Client | `Axios` | Interceptor-based API communication |
| Backend | `Node.js / Express` | Server runtime and web framework |
| Database | `MongoDB` | NoSQL data store |
| ORM | `Mongoose` | MongoDB object modeling |
| Auth | `JWT (JSON Web Tokens)` | Stateless authentication |
| Security | `BcryptJS` | Password hashing |

 Project Structure

The project is split into two main directories (`backend` and `frontend`) for clear separation of concerns.
.
├── backend/  Node/Express API
│ ├── config/  DB connection, .env setup
│ ├── models/  Mongoose Schemas (User, Task)
│ ├── middleware/  JWT Authentication Middleware (auth.js)
│ ├── routes/  API Endpoints (auth.js, tasks.js)
│ └── server.js  Express app entry point
└── frontend/  React Application
├── src/
│ ├── components/ Reusable UI parts (Navbar, TaskForm)
│ ├── pages/  Main views (Login, Dashboard, Profile)
│ ├── services/  Axios API setup with JWT Interceptor
│ ├── utils/  Helper functions (ProtectedRoute)
│ └── App.js  Main Router


---

## ⚙️ Setup and Installation

### Prerequisites

*   Node.js (v18+) and npm
*   MongoDB instance (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Task-Manager-app.git
cd Task-Manager

Backend Setup

cd backend
npm install

Configuration:
Create a file named .env in the backend directory based on the provided .env.example:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/scalable_app_db   Replace with your URI
JWT_SECRET=YOUR_VERY_STRONG_SECRET_KEY               Use a strong, random key

Run the Backend:
npm run dev  Starts server with nodemon for live reload
 or
npm start

 Frontend Setup
cd ../frontend
npm install

Run the Frontend
npm start

API Endpoints

POST	/api/auth/register	Register a new user.
POST	/api/auth/login	Log in and receive JWT.	
GET	/api/auth/me	Fetch logged-in user profile.	
PUT	/api/auth/profile	Update user profile (name, email).	
POST	/api/tasks	Create a new task.
GET	/api/tasks?search=&status=	Get user's tasks (with filtering/search).
PUT	/api/tasks/:id	Update a specific task.	
DELETE	/api/tasks/:id	Delete a specific task.	
