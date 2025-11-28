import apiClient from '../lib/api';

// ==================== AUTH API ====================
export const authAPI = {
  register: (data: {
    username: string;
    email: string;
    password: string;
    name: string;
  }) => apiClient.post('/auth/register', data),

  login: (data: { identifier: string; password: string }) =>
    apiClient.post('/auth/login', data),

  logout: () => apiClient.post('/auth/logout'),

  getCurrentUser: () => apiClient.get('/auth/me'),

  refreshToken: () => apiClient.post('/auth/refresh'),
};

// ==================== USER API ====================
export const userAPI = {
  getProfile: (username: string) => apiClient.get(`/users/${username}`),

  updateProfile: (data: any) => apiClient.put('/users/profile', data),
};

// ==================== POST API (for future use) ====================
export const postAPI = {
  getPosts: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) => apiClient.get('/posts', { params }),

  getPost: (id: string) => apiClient.get(`/posts/${id}`),

  createPost: (data: {
    content: string;
    category: string;
    isAnonymous?: boolean;
    media?: any[];
    tags?: string[];
  }) => apiClient.post('/posts', data),

  votePost: (id: string, voteType: 'up' | 'down' | 'remove') =>
    apiClient.post(`/posts/${id}/vote`, { voteType }),
};