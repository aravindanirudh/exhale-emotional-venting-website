import { useNavigate } from 'react-router-dom';
import heroVideo from '../assets/hero_video.webm';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/webm" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-3 font-anton tracking-wide drop-shadow-lg">
          Welcome to Exhale!
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-5 max-w-2xl mx-auto font-light drop-shadow-md">
          A safe space to vent your thoughts, emotions, and experiences anonymously.
        </p>
        <button
          onClick={() => navigate('/wall')}
          className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl"
        >
          Wall of Vents
        </button>
      </div>
    </div>
  );
};

export default HomePage;
