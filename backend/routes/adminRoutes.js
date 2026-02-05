const express = require('express');
const router = express.Router();
const {
  getUsers,
  toggleUserStatus,
  getStats,
  deletePostAdmin
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

router.get('/users', getUsers);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.get('/stats', getStats);
router.delete('/posts/:id', deletePostAdmin);

module.exports = router;
