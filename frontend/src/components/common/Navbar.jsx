import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, LogOut, User, Coins } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="font-anton text-3xl">Exhale</h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-medium text-gray-500 dark:hover:text-black dark:text-gray-400 transition duration-250 hover:bg-white rounded-md"
              >
                Home
              </Link>
              <Link
                to="/wall"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-medium text-gray-500 dark:hover:text-black dark:text-gray-400 transition duration-250 hover:bg-white rounded-md"
              >
                Venting Wall
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent font-medium text-gray-500 dark:hover:text-black dark:text-gray-400 transition duration-250 hover:bg-white rounded-md"
              >
                About
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-black dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-gray-700">
                  <Coins className="w-4 h-4 mr-1.5" />
                  {user?.tokens}
                </div>

                <div className="relative ml-3 group">
                  <button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-black dark:text-gray-200 font-bold border border-gray-200 dark:border-gray-700">
                      {user?.anonymousName?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  {/* Dropdown menu */}
                  <div className="origin-top-right absolute right-0 top-full pt-2 w-48 hidden group-hover:block">
                    <div className="rounded-md shadow-lg py-1 bg-white dark:bg-dark-card ring-1 ring-black ring-opacity-5 border border-gray-100 dark:border-dark-border">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover"
                      >
                        Your profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="bg-white hover:bg-gray-500 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white hover:bg-gray-500 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-4 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white rounded-md"
            >
              Home
            </Link>
            <Link
              to="/wall"
              className="block pl-4 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white rounded-md"
            >
              Venting Wall
            </Link>
            <Link
              to="/about"
              className="block pl-4 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white rounded-md"
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200 dark:border-dark-border">
            {isAuthenticated ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-black dark:text-gray-200 font-bold border border-gray-200 dark:border-gray-700">
                    {user?.anonymousName?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">
                    {user?.anonymousName}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {user?.tokens} tokens
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex-shrink-0 p-1 text-gray-400 hover:text-gray-500"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-1 px-4">
                <Link
                  to="/login"
                  className="block text-center w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-500"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block text-center w-full mt-2 px-4 py-2 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-500"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
