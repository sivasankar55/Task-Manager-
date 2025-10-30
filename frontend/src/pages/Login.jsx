import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';


const Login = () => {
    const [formData, setFromData] = useState({email:'', password:''});
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const {email,password} = formData;

    const onChange = (e) => setFromData({...formData,[e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await api.post('/auth/login', { email, password });

            localStorage.setItem('token', res.data.token);

    // Redirect to dashboard
      navigate('/dashboard');
} catch (err) {
    console.error(err.response ? err.response.data : err.message);
    setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
  }
};
return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h1>
      <form onSubmit={onSubmit}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
        >
          Login
        </button>
      </form>
    </div>
)
}

export default Login