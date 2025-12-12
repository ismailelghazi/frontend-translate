import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true, // Keep for cookie fallback
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach Bearer token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error
            const message = error.response.data?.detail || 'An error occurred';

            // Don't log expected 401 on /auth/me (initial auth check)
            const isAuthCheck = error.config?.url === '/auth/me' && error.response.status === 401;
            if (!isAuthCheck) {
                console.error('API Error:', message);
            }

            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                // Could redirect to login or dispatch logout action
                window.dispatchEvent(new CustomEvent('auth:unauthorized'));
            }
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error: No response from server');
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
