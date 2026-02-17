import { useState, useEffect } from "react";
import { commentService } from "../../services/commentService";
import CommentCard from "./CommentCard";
import { useAuth } from "../../context/AuthContext";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentService.getCommentsByPost(postId);
      setComments(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await commentService.createComment(postId, newComment);
      // Add new comment to list
      setComments((prev) => [...prev, response.data.comment]);
      setNewComment("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await commentService.deleteComment(commentId);
      setComments((prev) =>
        prev.filter(
          (c) => c._id !== commentId && c.parentComment !== commentId,
        ),
      );
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const handleReply = async (commentId, content) => {
    const response = await commentService.replyToComment(commentId, content);
    setComments((prev) => [...prev, response.data.comment]);
  };

  // Organize comments into threads
  const rootComments = comments.filter((c) => !c.parentComment);
  const getReplies = (commentId) =>
    comments.filter((c) => c.parentComment === commentId);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h3>

      {isAuthenticated ? (
        <form onSubmit={handleCreateComment} className="mb-8">
          <div className="flex gap-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts... (be kind)"
              className="input-field min-h-[80px] resize-y"
            />
            <button
              type="submit"
              disabled={!newComment.trim() || submitting}
              className="self-end px-4 py-2 btn-primary rounded-full shadow-sm disabled:opacity-50 transition-all text-sm"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-dark-hover p-4 rounded-lg text-center mb-8 hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-dark-border shadow-sm">
          <p className="text-black dark:text-white">
            <Link to="/login" className="text-gray-400 hover:underline">
              Log in
            </Link>{" "}
            or{" "}
            <Link to="/register" className="text-gray-400 hover:underline">
              Sign up
            </Link>{" "}
            to join the conversation!
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-black dark:text-white" />
        </div>
      ) : (
        <div className="space-y-6">
          {rootComments.length === 0 ? (
            <p className="text-center text-black dark:text-white py-4">
              No comments yet. Be the first to support!
            </p>
          ) : (
            rootComments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={{ ...comment, replies: getReplies(comment._id) }}
                onDelete={handleDeleteComment}
                onReply={handleReply}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
