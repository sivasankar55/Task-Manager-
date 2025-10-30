import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Profile = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        setError('Failed to fetch user profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(null);
    try {
      const res = await api.put('/auth/profile', formData);
      setFormData({ name: res.data.name, email: res.data.email });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.msg || 'Update failed.');
      console.error(err.response);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-indigo-600">Loading Profile...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">User Profile</h1>
      
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{message}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-200"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;