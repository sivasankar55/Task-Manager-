 import {useState, useEffect} from 'react';

 const TaskForm = ({ currentTask, onSubmit, isEditing }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      status: 'Pending',
    });
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      if (currentTask) {
        setFormData({
          title: currentTask.title || '',
          description: currentTask.description || '',
          status: currentTask.status || 'Pending',
        });
      } else {
        setFormData({ title: '', description: '', status: 'Pending' });
      }
    }, [currentTask]);
  
    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: '' }); 
    };
  
    const validate = () => {
      const newErrors = {};
      if (!formData.title.trim()) newErrors.title = 'Title is required.';
      return newErrors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      onSubmit(formData);

      if (!isEditing) {
        setFormData({ title: '', description: '', status: 'Pending' });
        setErrors({});
      }
    };
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    )
};

export default TaskForm;