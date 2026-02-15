const Post = require("../models/Post");
const User = require("../models/User");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const moodFilter = req.query.mood;

    let query = { isVisible: true };
    if (moodFilter) {
      query.mood = moodFilter;
    }

    const count = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .populate("author", "anonymousName"); // Only show anonymous name

    res.json({
      success: true,
      data: posts,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "anonymousName",
    );

    if (post && post.isVisible) {
      res.json({ success: true, data: post });
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, content, mood, autoDelete } = req.body;

    // Get IP: Render/Vercel puts real IP in x-forwarded-for.
    // It might be a list "client, proxy1, proxy2" -> we want the first one.
    const forwardedFor = req.headers["x-forwarded-for"];
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.ip || req.connection.remoteAddress;

    let deleteAt = null;
    if (autoDelete && autoDelete.enabled && autoDelete.hours) {
      deleteAt = new Date();
      deleteAt.setHours(deleteAt.getHours() + autoDelete.hours);
    }

    const post = await Post.create({
      author: req.user.id,
      title,
      content,
      mood,
      autoDelete: {
        enabled: autoDelete?.enabled || false,
        deleteAt,
      },
      ipAddress: clientIp,
    });

    // Reward user with tokens (5 for post)
    await User.findByIdAndUpdate(req.user.id, { $inc: { tokens: 5 } });

    res.status(201).json({
      success: true,
      message: "Post created successfully. You earned 5 tokens!",
      data: {
        post,
        tokensEarned: 5,
        newTokenBalance: req.user.tokens + 5,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized" });
      }

      // Delete all comments associated with this post
      await require("../models/Comment").deleteMany({ post: post._id });

      await post.deleteOne(); // Use deleteOne() for Mongoose 7+
      res.json({ success: true, message: "Post removed" });
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add reaction
// @route   POST /api/posts/:id/react
// @access  Private
const reactToPost = async (req, res) => {
  try {
    const { emoji } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Check if user already reacted
    const existingReactionIndex = post.reactions.findIndex(
      (r) => r.userId.toString() === req.user.id,
    );

    let tokensEarned = 0;

    if (existingReactionIndex !== -1) {
      // Allow changing reaction or removing?
      // For simplicity: if same emoji, remove it. If different, update it.
      if (post.reactions[existingReactionIndex].emoji === emoji) {
        // Remove reaction
        post.reactions.splice(existingReactionIndex, 1);
        post.reactionCounts[emoji] = Math.max(
          0,
          post.reactionCounts[emoji] - 1,
        );
      } else {
        // Update reaction
        const oldEmoji = post.reactions[existingReactionIndex].emoji;
        post.reactionCounts[oldEmoji] = Math.max(
          0,
          post.reactionCounts[oldEmoji] - 1,
        );

        post.reactions[existingReactionIndex].emoji = emoji;
        post.reactionCounts[emoji] = (post.reactionCounts[emoji] || 0) + 1;
      }
    } else {
      // Add new reaction
      post.reactions.push({ userId: req.user.id, emoji });
      post.reactionCounts[emoji] = (post.reactionCounts[emoji] || 0) + 1;

      // Reward post author (1 token, max 10/post)
      // Limitation logic would be complex here, simplifying:
      await User.findByIdAndUpdate(post.author, { $inc: { tokens: 1 } });
    }

    await post.save();

    res.json({
      success: true,
      message: "Reaction updated",
      data: {
        reactionCounts: post.reactionCounts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get my posts
// @route   GET /api/posts/my-posts
// @access  Private
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  reactToPost,
  getMyPosts,
};
