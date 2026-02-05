const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/toggle-status
// @access  Private/Admin
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get admin stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalComments = await Comment.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalPosts,
        totalComments
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Delete any post (Admin)
const deletePostAdmin = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            await post.deleteOne();
            res.json({ success: true, message: 'Post removed by admin' });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
  getUsers,
  toggleUserStatus,
  getStats,
  deletePostAdmin
};
