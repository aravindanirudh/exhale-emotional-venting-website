import api from './api';

export const postService = {
  getAllPosts: async (pageNumber = 1, mood = '') => {
    let url = `/posts?pageNumber=${pageNumber}`;
    if (mood) url += `&mood=${mood}`;
    return await api.get(url);
  },

  getPostById: async (id) => {
    return await api.get(`/posts/${id}`);
  },

  createPost: async (postData) => {
    return await api.post('/posts', postData);
  },

  deletePost: async (id) => {
    return await api.delete(`/posts/${id}`);
  },

  reactToPost: async (id, emoji) => {
    return await api.post(`/posts/${id}/react`, { emoji });
  },

  getMyPosts: async () => {
    return await api.get('/posts/my-posts');
  }
};
