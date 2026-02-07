import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { postService } from '../../services/postService';
import PostCard from './PostCard';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const PostList = ({ moodFilter }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts(true);
  }, [moodFilter]);

  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
      const response = await postService.getAllPosts(currentPage, moodFilter);
      
      const newPosts = response.data;
      
      if (reset) {
        setPosts(newPosts);
        setPage(2);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
      }
      
      setHasMore(currentPage < response.pages);
    } catch (error) {
      toast.error('Failed to load posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await postService.deletePost(postId);
      setPosts(posts.filter(p => p._id !== postId));
      toast.success('Post deleted');
    } catch (error) {
      toast.error(error.message || 'Failed to delete post');
    }
  };

  const handleReact = async (postId, emoji) => {
    try {
      const response = await postService.reactToPost(postId, emoji);
      setPosts(posts.map(p => 
        p._id === postId 
          ? { ...p, reactionCounts: response.data.reactionCounts } 
          : p
      ));
    } catch (error) {
       if (error.response?.status === 401) {
         toast.error('Please login to react');
       } else {
         toast.error('Failed to react');
       }
    }
  };

  if (loading && posts.length === 0) {
    return (
      <>
      <h1 className='text-center font-semibold pt-10'>Loading posts...please be patient!</h1>
      <p className='text-center text-sm text-gray-400'>This may take upto 30-60 seconds if the backend server is sleeping!</p>
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
      </>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No posts found yet!
          </p>
          <Link
            to="/create-post"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Be the first to vent
          </Link>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
            onReact={handleReact}
          />
        ))
      )}

      {hasMore && posts.length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={() => fetchPosts(false)}
            disabled={loading}
            className="text-black p-1.5 rounded-md hover:text-black bg-white hover:bg-gray-500 font-medium disabled:opacity-50"
          >
            {loading ? "Loading more..." : "Load more..."}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
