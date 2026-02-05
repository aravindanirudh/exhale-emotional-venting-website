const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'anonymousName')
      .sort({ createdAt: 1 }); // Oldest first for chronological conversation

    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user.id,
      content,
      depth: 0
    });

    // Update post comment count
    post.commentCount = (post.commentCount || 0) + 1;
    await post.save();

    // Reward user (2 tokens)
    await User.findByIdAndUpdate(req.user.id, { $inc: { tokens: 2 } });

    // Populate for immediate display
    await comment.populate('author', 'anonymousName');

    res.status(201).json({
      success: true,
      message: 'Comment added',
      data: {
        comment,
        tokensEarned: 2,
        newTokenBalance: req.user.tokens + 2
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reply to a comment
// @route   POST /api/comments/:id/reply
// @access  Private
const replyToComment = async (req, res) => {
  try {
    const { content } = req.body;
    const parentComment = await Comment.findById(req.params.id);

    if (!parentComment) {
      return res.status(404).json({ success: false, message: 'Parent comment not found' });
    }

    // Determine depth (parent depth + 1, max 1)
    if (parentComment.depth >= 1) {
      return res.status(400).json({ success: false, message: 'Max reply depth reached' });
    }

    const reply = await Comment.create({
      post: parentComment.post,
      author: req.user.id,
      content,
      parentComment: parentComment._id,
      depth: parentComment.depth + 1
    });

    // Update post comment count
    await Post.findByIdAndUpdate(parentComment.post, { $inc: { commentCount: 1 } });

    // Reward user (1 token)
    await User.findByIdAndUpdate(req.user.id, { $inc: { tokens: 1 } });
    
    await reply.populate('author', 'anonymousName');

    res.status(201).json({
      success: true,
      message: 'Reply added',
      data: {
        comment: reply,
        tokensEarned: 1,
        newTokenBalance: req.user.tokens + 1
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment) {
      if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({ success: false, message: 'Not authorized' });
      }

      await comment.deleteOne();
      
      // Decrease comment count
      await Post.findByIdAndUpdate(comment.post, { $inc: { commentCount: -1 } });

      res.json({ success: true, message: 'Comment removed' });
    } else {
      res.status(404).json({ success: false, message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCommentsByPost,
  createComment,
  replyToComment,
  deleteComment
};
