import { Smile, Frown, Angry, AlertCircle, HelpCircle, Meh, Star, Heart } from 'lucide-react';

export const MOODS = [
  { id: 'happy', label: 'Happy', color: 'text-green-500', bg: 'bg-green-500/10', icon: Smile },
  { id: 'sad', label: 'Sad', color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Frown },
  { id: 'angry', label: 'Angry', color: 'text-red-500', bg: 'bg-red-500/10', icon: Angry },
  { id: 'anxious', label: 'Anxious', color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: AlertCircle },
  { id: 'confused', label: 'Confused', color: 'text-purple-500', bg: 'bg-purple-500/10', icon: HelpCircle },
  { id: 'neutral', label: 'Neutral', color: 'text-gray-500', bg: 'bg-gray-500/10', icon: Meh },
  { id: 'hopeful', label: 'Hopeful', color: 'text-teal-500', bg: 'bg-teal-500/10', icon: Star },
  { id: 'grateful', label: 'Grateful', color: 'text-pink-500', bg: 'bg-pink-500/10', icon: Heart },
];

const MoodSelector = ({ selectedMood, onSelect, className = '' }) => {
  return (
    <div className={`grid grid-cols-4 sm:grid-cols-8 gap-2 ${className}`}>
      {MOODS.map((mood) => {
        const Icon = mood.icon;
        const isSelected = selectedMood === mood.id;
        
        return (
          <button
            key={mood.id}
            type="button"
            onClick={() => onSelect(mood.id)}
            className={`
              flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200
              ${isSelected 
                ? `${mood.bg} ${mood.color} ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600` 
                : 'hover:bg-gray-100 dark:hover:bg-dark-hover text-gray-500 dark:text-gray-400'
              }
            `}
          >
            <Icon className={`w-6 h-6 mb-1 ${isSelected ? 'stroke-2' : 'stroke-1'}`} />
            <span className="text-xs font-medium">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
