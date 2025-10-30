import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTask, setCurrentTask] = useState(null); // For editing
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch Tasks with filters
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/tasks?search=${search}&status=${statusFilter}`);
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle Form Submission (Create/Update)
  const handleTaskSubmit = async (formData) => {
    setError(null);
    try {
      if (isEditing && currentTask) {
        // Update
        await api.put(`/tasks/${currentTask._id}`, formData);
      } else {
        // Create
        await api.post('/tasks', formData);
      }
      // Reset state and refetch
      setCurrentTask(null);
      setIsEditing(false);
      fetchTasks();
    } catch (err) {
      setError(isEditing ? 'Failed to update task.' : 'Failed to create task.');
      console.error(err);
    }
  };

  // Handle Delete
  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task.');
        console.error(err);
      }
    }
  };

  // Start Edit Mode
  const startEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
      <div className="lg:col-span-1">
        <TaskForm 
            currentTask={currentTask} 
            onSubmit={handleTaskSubmit} 
            isEditing={isEditing} 
        />
        {isEditing && (
            <button
                onClick={() => { setCurrentTask(null); setIsEditing(false); }}
                className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-150"
            >
                Cancel Edit
            </button>
        )}
      </div>

      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Tasks</h1>
        
        {/* Search and Filter UI */}
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow border border-gray-300 rounded-md p-2 shadow-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2 shadow-sm"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={fetchTasks}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md font-medium"
          >
            Filter
          </button>
        </div>

        {loading && <p className="text-center text-indigo-600">Loading tasks...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {/* Task List */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="p-4 bg-white rounded-lg shadow-lg flex justify-between items-center transition duration-200 hover:shadow-xl">
                <div>
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full mt-2 inline-block ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No tasks found. Create one to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;