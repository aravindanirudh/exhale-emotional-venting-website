const express = require('express');
const router = express.Router();
const {
  getCommentsByPost,
  createComment,
  replyToComment,
  deleteComment
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const { commentValidation, validate } = require('../utils/validators');

router.get('/post/:postId', getCommentsByPost);
router.post('/', protect, commentValidation, validate, createComment);
router.post('/:id/reply', protect, validate, replyToComment); // Reuse validate or add specific checks
router.delete('/:id', protect, deleteComment);

module.exports = router;
