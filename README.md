Scalable Web App: Authentication & Task Management Dashboard

This project is a full-stack, scalable web application built to demonstrate secure JWT-based authentication, a protected task management dashboard, and complete CRUD operations.

 Overview

This app enables users to:

Register and log in securely using JWT.

Access protected routes (Dashboard, Profile).

Create, Read, Update, and Delete personal tasks.

Manage their own profiles.

 a clean, responsive UI.

 .
├── backend/               Node/Express API
│   ├── config/            Database connection, environment setup
│   ├── models/            Mongoose Schemas (User, Task)
│   ├── middleware/        JWT Authentication Middleware
│   ├── routes/            API Endpoints (auth.js, tasks.js)
│   └── server.js          Express app entry point
│
└── frontend/              React Application
    ├── src/
    │   ├── components/    Reusable UI components (Navbar, TaskForm)
    │   ├── pages/         Main views (Login, Dashboard, Profile)
    │   ├── services/      Axios API setup with JWT Interceptor
    │   ├── utils/         Helper functions (ProtectedRoute)
    │   └── App.js         Main Router

     
 Authentication

Secure login and registration using JWT.

Password hashing with BcryptJS.

Protected routes (Dashboard, Profile) accessible only with valid tokens.

Full logout flow with token removal.

Task Management Dashboard

Full CRUD (Create, Read, Update, Delete) functionality for tasks.

Search and Filter by title or status.

Responsive UI for all devices.

 User Profile

Fetch and display logged-in user information.

Update name and email directly from the dashboard.


 Clone the Repository

git clone https://github.com/your-username/Task-Manager-app.git
cd Task-Manager-app

Backend Setup
cd backend
npm install

Configuration
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/scalable_app_db    Replace with your MongoDB URI
JWT_SECRET=YOUR_VERY_STRONG_SECRET_KEY                Use a secure random key

Run the Backend
npm run dev    Starts server with nodemon
 or
npm start

Frontend Setup
cd ../frontend
npm install

Run the Frontend
npm start
