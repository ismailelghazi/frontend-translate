import api from './api';
import type { User, AuthResponse, LoginCredentials, RegisterCredentials } from './types';

export const authService = {
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', credentials);
        // Save token if returned
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
        return response.data;
    },

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        // Save token if returned
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
        return response.data;
    },

    async logout(): Promise<{ message: string }> {
        // Clear token from localStorage
        localStorage.removeItem('access_token');
        try {
            const response = await api.post<{ message: string }>('/auth/logout');
            return response.data;
        } catch {
            // Logout locally even if server fails
            return { message: 'Logged out locally' };
        }
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },
};

export default authService;

