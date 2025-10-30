import axios from 'axios';
// instance  of  axios
const api = axios.create({
    baseURL:'http://localhost:5000/api', // backend url
    headers: {
        'Content-Type': 'application/json',
    },
});

// req interceptors to attach Jwt token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token) {
            // set the token in the auth header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptors for handling token expiry
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response && error.response.status === 401) {
            console.error('Authentication expired or failed');
        }

        return Promise.reject(error);
    }
);

export default api;

