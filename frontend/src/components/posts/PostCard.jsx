import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Clock, Heart, Trash2 } from "lucide-react";
import { MOODS } from "./MoodSelector";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const PostCard = ({ post, onReact, onDelete }) => {
  const { user } = useAuth();
  const mood = MOODS.find((m) => m.id === post.mood) || MOODS[5]; // Default to neutral
  const MoodIcon = mood.icon;

  // Check if current user is the owner
  // post.author can be a string (ID) or an object (populated user)
  const authorId = post.author?._id || post.author;

  const isOwner =
    user &&
    (user.id === authorId ||
      user.id === authorId?.toString() ||
      user._id === authorId ||
      user._id === authorId?.toString());
  const isAdmin = user && user.role === "admin";

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className={`p-2 rounded-full ${mood.bg} shrink-0`}>
            <MoodIcon className={`w-5 h-5 ${mood.color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                {post.author.anonymousName || "Anonymous"}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${mood.bg} ${mood.color} shrink-0`}
              >
                {mood.label}
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              <Clock className="w-3 h-3 mr-1" />
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>

        {(isOwner || isAdmin) && (
          <button
            onClick={() => onDelete(post._id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0 ml-2"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {post.title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h3>
      )}

      <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
        {post.content}
      </p>

      {post.autoDelete?.enabled && (
        <div className="text-xs text-orange-500 mb-4 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          Auto-deletes{" "}
          {formatDistanceToNow(new Date(post.autoDelete.deleteAt), {
            addSuffix: true,
          })}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-border">
        <div className="flex space-x-4">
          {/* Reaction buttons */}
          <button
            onClick={() => onReact(post._id, "❤️")}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-white hover:bg-black hover:text-white border border-transparent hover:border-transparent text-black dark:text-black transition-colors group"
          >
            <Heart className="w-4 h-4 text-black group-hover:text-white dark:text-black" />
            <span className="text-sm font-medium text-black group-hover:text-white dark:text-black">
              {post.reactionCounts?.["❤️"] || 0}
            </span>
          </button>
        </div>

        <Link
          to={`/posts/${post._id}`}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-white hover:bg-black hover:text-white border border-transparent hover:border-transparent text-black dark:text-black transition-colors group"
        >
          <MessageSquare className="w-4 h-4 text-black group-hover:text-white dark:text-black" />
          <span className="text-sm font-medium text-black group-hover:text-white dark:text-black">
            {post.commentCount} Comments
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
