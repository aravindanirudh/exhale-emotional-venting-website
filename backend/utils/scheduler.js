const cron = require('node-cron');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const initScheduler = () => {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      
      const postsToDelete = await Post.find({
        'autoDelete.enabled': true,
        'autoDelete.deleteAt': { $lte: now },
        isVisible: true
      });

      for (const post of postsToDelete) {
        await Comment.deleteMany({ post: post._id });
        await Post.findByIdAndDelete(post._id);
        console.log(`Auto-deleted post: ${post._id}`);
      }
    } catch (error) {
      console.error('Scheduler error:', error);
    }
  });

  console.log('Auto-deletion scheduler initialized');
};

module.exports = initScheduler;
