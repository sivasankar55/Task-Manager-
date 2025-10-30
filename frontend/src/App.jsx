import React from 'react'
import{BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import './App.css'

function App() {
  return (
    <Router>
      <Navbar/>
      <div className='container mx-auto p-4'>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path="/register" element={<Register />} />

             {/* Protected Routes Group */}
             <Route element={<ProtectedRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<h1 className="text-4xl text-center mt-20">404 - Not Found</h1>} /> 
          </Routes>
       </div>
    </Router>
  )
}

export default App
