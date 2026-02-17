import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { Trash2, MessageCircle, CornerDownRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CommentCard = ({ comment, onDelete, onReply, depth = 0 }) => {
  const { user } = useAuth();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isOwner =
    user && (user.id === comment.author._id || user.id === comment.author);
  const isAdmin = user && user.role === "admin";

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setLoading(true);
    try {
      await onReply(comment._id, replyContent);
      setIsReplying(false);
      setReplyContent("");
      toast.success("Reply added");
    } catch (error) {
      toast.error("Failed to add reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
      ${depth > 0 ? "ml-8 mt-2 border-l-2 border-gray-100 dark:border-dark-border pl-4" : "mt-4"}
    `}
    >
      <div className="bg-white dark:bg-dark-hover p-4 rounded-lg hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-dark-border shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {comment.author.anonymousName}
            </span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          {(isOwner || isAdmin) && (
            <button
              onClick={() => onDelete(comment._id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
          {comment.content}
        </p>

        <div className="mt-3 flex items-center space-x-4">
          {depth < 1 && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center space-x-1 text-xs text-gray-900 dark:text-gray-100 hover:text-primary-400 transition-colors duration-150"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Reply</span>
            </button>
          )}
        </div>

        {isReplying && (
          <form onSubmit={handleSubmitReply} className="mt-3 flex gap-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !replyContent.trim()}
              className="bg-black text-white px-3 py-1.5 rounded-md text-sm font-medium"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
            </button>
          </form>
        )}
      </div>

      {/* Render children comments if any exist in the list passed from parent */}
      {/* This component expects a flattened list or handles children elsewhere. 
          For simplicity, let's assume the parent handles rendering or we pass children as props.
          Actually, standard way is recursive or flattened. Let's assume parent orchestrates.
      */}
      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentCard
            key={reply._id}
            comment={reply}
            onDelete={onDelete}
            onReply={onReply}
            depth={depth + 1}
          />
        ))}
    </div>
  );
};

export default CommentCard;
