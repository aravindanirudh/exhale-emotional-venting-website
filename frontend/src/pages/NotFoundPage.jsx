import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Page not found</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8 max-w-md">
        The page you are looking for has vanished into the void, or perhaps it never existed in the first place.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 btn-primary"
      >
        <Home className="w-5 h-5 mr-2" />
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
