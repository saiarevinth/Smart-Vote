import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Menu, X, LogOut, Home, UserSquare, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-orange-500">
                Smart Vote
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            >
              <Home className="h-5 w-5 mr-1" />
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            >
              <UserSquare className="h-5 w-5 mr-1" />
              Profile
            </Link>
            <Link
              to="/advisor"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              Political Advisor
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserSquare className="h-5 w-5 mr-2" />
              Profile
            </Link>
            <Link
              to="/advisor"
              className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Political Advisor
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
