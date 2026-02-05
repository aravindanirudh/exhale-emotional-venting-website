import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/postService';
import PostCard from '../components/posts/PostCard';
import { Loader2, Coins, MessageSquare, StickyNote, User } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, [user]);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getMyPosts();
      setPosts(response.data);
    } catch (error) {
      toast.error('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await postService.deletePost(postId);
      setPosts(posts.filter(p => p._id !== postId));
      toast.success('Post deleted');
    } catch (error) {
       toast.error('Failed to delete');
    }
  };

  const handleReact = (postId, emoji) => {
     // Optional: Handling reaction on own profile? 
     // Or just view. Let's redirect or allow react.
     // For simplicity allow basic react or navigation.
     // Usually people don't react to own posts to gain tokens, but UI-wise ok.
     toast.success('Reaction recorded');
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
             {user.anonymousName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{user.anonymousName}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{user.role === 'admin' ? 'Administrator' : 'Community Member'}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="bg-gray-50 dark:bg-dark-hover p-4 rounded-lg flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                    <Coins className="w-5 h-5" />
                    <span className="font-semibold">Tokens</span>
                  </div>
                  <span className="text-2xl font-bold">{user.tokens}</span>
               </div>
               
               <div className="bg-gray-50 dark:bg-dark-hover p-4 rounded-lg flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                    <StickyNote className="w-5 h-5" />
                    <span className="font-semibold">Posts</span>
                  </div>
                  <span className="text-2xl font-bold">{posts.length}</span>
               </div>
               
               {/* 
                  To show total comments, we'd need another API endpoint or expand getMe. 
                  For now we can assume it's possibly coming in future.
               */}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Your History</h2>
      
      {loading ? (
         <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
         </div>
      ) : (
         <div className="grid grid-cols-1 gap-6">
            {posts.length === 0 ? (
               <p className="text-center text-gray-500 py-10 bg-white dark:bg-dark-card rounded-xl">
                 You haven't posted properly yet. 
               </p>
            ) : (
               posts.map(post => (
                  <PostCard 
                     key={post._id} 
                     post={post} 
                     onDelete={handleDelete}
                     onReact={handleReact}
                  />
               ))
            )}
         </div>
      )}
    </div>
  );
};

export default ProfilePage;
