import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="bg-gray-800 shadow-md w-full fixed top-0 left-0 z-50">
    <div className="flex items-center justify-between h-16 px-6">
      <div className="flex items-center">
        <Link to={token ? "/dashboard" : "/"} className="text-white text-xl font-bold">
          Make It Done or Lose it
        </Link>
      </div>
      <div className="flex items-center">
        {token ? (
          <>
            <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
            <Link to="/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
            <button
              onClick={logout}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
            <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
          </>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;