import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/postService';
import MoodSelector, { MOODS } from '../components/posts/MoodSelector';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '',
    autoDelete: {
      enabled: false,
      hours: 24
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mood) {
      return toast.error('Please select a mood that represents how you feel');
    }
    
    setLoading(true);
    try {
      const response = await postService.createPost({
        ...formData,
        autoDelete: formData.autoDelete.enabled ? formData.autoDelete : undefined
      });
      
      toast.success(response.message || 'Post created successfully');
      navigate('/wall');
    } catch (error) {
       toast.error(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const selectedMoodColor = MOODS.find(m => m.id === formData.mood)?.color || 'text-gray-500';

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link to="/wall" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Wall
      </Link>

      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Vent your feelings
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              How are you feeling right now?
            </label>
            <MoodSelector 
              selectedMood={formData.mood} 
              onSelect={(id) => setFormData({ ...formData, mood: id })} 
            />
          </div>

          {/* Title (Optional) */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Give your vent a headline..."
              maxLength={200}
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              What's on your mind?
            </label>
            <textarea
              id="content"
              rows={8}
              required
              minLength={10}
              maxLength={5000}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input-field resize-none"
              placeholder="Let it all out... (Minimum 10 characters)"
            />
            <div className="flex justify-end mt-1 text-xs text-gray-400">
              {formData.content.length}/5000
            </div>
          </div>

          {/* Auto-delete settings */}
          <div className="bg-gray-50 dark:bg-dark-hover p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-black dark:text-white">Auto-delete post</h3>
                <p className="text-xs text-gray-500">Automatically remove this post after a set time.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.autoDelete.enabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    autoDelete: { ...formData.autoDelete, enabled: e.target.checked }
                  })}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-700 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
              </label>
            </div>

            {formData.autoDelete.enabled && (
              <div className="mt-4">
                <label className="block text-xs font-medium text-black dark:text-gray-300 mb-2">
                  Delete after:
                </label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {[1, 6, 12, 24, 48, 168].map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        autoDelete: { ...formData.autoDelete, hours }
                      })}
                      className={`px-3 py-2 text-xs font-medium rounded-md border ${
                        formData.autoDelete.hours === hours
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : 'bg-white border-gray-300 text-black hover:bg-gray-100 dark:bg-dark-card dark:border-dark-border dark:text-gray-300 dark:hover:bg-dark-hover'
                      }`}
                    >
                      {hours >= 24 ? `${hours/24} day${hours/24 > 1 ? 's' : ''}` : `${hours}h`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4">
             <button
               type="submit"
               disabled={loading}
               className="w-full flex justify-center py-3 px-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
               {loading ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                 'Post Anonymously'
               )}
             </button>
            <p className="mt-2 text-center text-xs text-gray-500">
              You'll earn 5 tokens for this post!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
