import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '',
    password2: '' // For client-side password confirmation
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation: Password Match
    if (password !== password2) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // API call to the backend registration endpoint
      const res = await api.post('/auth/register', { name, email, password });
      
      // Store token upon successful registration (backend sends it back)
      localStorage.setItem('token', res.data.token);
      
      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      
      // Handle server-side errors (e.g., 'User already exists', validation errors)
      const serverMsg = err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg;
      setError(serverMsg || 'Registration failed. Please check the form.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account</h1>
      <form onSubmit={onSubmit}>
        {error && <p className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded">{error}</p>}
        
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            id="name"
            type="text"
            placeholder="Your Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            id="email"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        
        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            id="password"
            type="password"
            placeholder="6+ characters"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>

        {/* Password Confirmation Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">Confirm Password</label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-200"
            id="password2"
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
        >
          Register
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;