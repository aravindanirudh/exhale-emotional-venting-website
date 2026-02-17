import { useState } from "react";
import PostList from "../components/posts/PostList";
import MoodSelector from "../components/posts/MoodSelector";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const VentingWallPage = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState("");

  const handleMoodSelect = (moodId) => {
    setSelectedMood((prev) => (prev === moodId ? "" : moodId));
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div className="mb-8 text-center bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-dark-border">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          Wall of Vents
        </h1>
        <p className="text-black dark:text-gray-400 mb-6">
          A safe space to vent your thoughts, emotions, and experiences
          anonymously.
        </p>

        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-white mb-3">
            Filter by Mood
          </span>
          <MoodSelector
            selectedMood={selectedMood}
            onSelect={handleMoodSelect}
          />
        </div>
      </div>

      <PostList moodFilter={selectedMood} />

      <button
        onClick={() => navigate("/create-post")}
        className="fixed bottom-8 right-8 p-4 bg-white hover:bg-gray-500 text-black border border-gray-200 rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 z-40"
        aria-label="Create post"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VentingWallPage;
