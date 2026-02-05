const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  reactToPost,
  getMyPosts
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { postLimiter } = require('../middleware/rateLimiter');
const { postValidation, validate } = require('../utils/validators');

router.route('/')
  .get(getPosts)
  .post(protect, postLimiter, postValidation, validate, createPost);

router.get('/my-posts', protect, getMyPosts);

router.route('/:id')
  .get(getPostById)
  .delete(protect, deletePost);

router.post('/:id/react', protect, reactToPost);

module.exports = router;
