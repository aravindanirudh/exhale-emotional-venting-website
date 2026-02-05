import api from './api';

export const commentService = {
  getCommentsByPost: async (postId) => {
    return await api.get(`/comments/post/${postId}`);
  },

  createComment: async (postId, content) => {
    return await api.post('/comments', { postId, content });
  },

  replyToComment: async (commentId, content) => {
    return await api.post(`/comments/${commentId}/reply`, { content });
  },

  deleteComment: async (commentId) => {
    return await api.delete(`/comments/${commentId}`);
  }
};
