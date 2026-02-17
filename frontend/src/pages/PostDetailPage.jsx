import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService } from "../services/postService";
import PostCard from "../components/posts/PostCard";
import CommentSection from "../components/comments/CommentSection";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PostDetailPage = () => {
  const { id } = useParams(); // Get post ID from URL params
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // State to hold post data
  const [loading, setLoading] = useState(true);

  // Fetch post details on component mount and when ID changes (dependency array)
  useEffect(() => {
    fetchPost();
  }, [id]);

  // Function to fetch post details from the server
  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPostById(id); // API call to get post details by ID
      setPost(response.data); // Update state with fetched post data
    } catch (error) {
      toast.error("Failed to load post"); // Show error message if fetching fails
      navigate("/wall");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return; // Confirm deletion with the user
    try {
      await postService.deletePost(id); // API call to delete the post by ID
      toast.success("Post deleted"); // Show success message on successful deletion
      navigate("/wall"); // Redirect back to the wall after deletion
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const handleReact = async (postId, emoji) => {
    try {
      const response = await postService.reactToPost(postId, emoji); // API call to react to the post with the specified emoji
      // Update the post's reaction counts in the state with the new counts from the response
      setPost((prev) => ({
        ...prev,
        reactionCounts: response.data.reactionCounts,
      }));
    } catch (error) {
      toast.error("Failed to react");
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
    <div className="max-w-2xl mx-auto py-1">
      <Link
        to="/wall"
        className="inline-flex items-center text-gray-900 dark:text-gray-100 hover:text-gray-400 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Wall
      </Link>

      <PostCard post={post} onDelete={handleDelete} onReact={handleReact} />

      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetailPage;
