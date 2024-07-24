import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fetchUser = async() => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export default api;