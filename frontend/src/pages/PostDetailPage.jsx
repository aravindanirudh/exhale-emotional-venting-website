import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import PostCard from '../components/posts/PostCard';
import CommentSection from '../components/comments/CommentSection';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPostById(id);
      setPost(response.data);
    } catch (error) {
      toast.error('Failed to load post');
      navigate('/wall');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await postService.deletePost(id);
      toast.success('Post deleted');
      navigate('/wall');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleReact = async (postId, emoji) => {
    try {
      const response = await postService.reactToPost(postId, emoji);
      setPost(prev => ({
        ...prev,
        reactionCounts: response.data.reactionCounts
      }));
    } catch (error) {
      toast.error('Failed to react');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link to="/wall" className="inline-flex items-center text-white hover:text-gray-400 mb-6 transition-colors duration-200">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Wall
      </Link>

      <PostCard 
        post={post} 
        onDelete={handleDelete}
        onReact={handleReact}
      />

      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetailPage;
