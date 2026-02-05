import api from './api';

export const authService = {
  register: async (anonymousName, email, password) => {
    return await api.post('/auth/register', { anonymousName, email, password });
  },

  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },

  getMe: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async (data) => {
    return await api.put('/auth/update-profile', data);
  }
};
