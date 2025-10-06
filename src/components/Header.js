import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { toggleGptSearchView } from '../utils/gptSlice';
import { Search, Home, Sparkles, Heart, LogOut } from 'lucide-react';
import { USER_AVATAR } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const showConfig = useSelector((store) => store.gpt.showgptsearch);

  const handleGptSearchClick = () =>{
     dispatch(toggleGptSearchView());
     window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top
  }
  const handleExit = () => {
    // Add any cleanup if needed
    navigate('/browse'); // Redirect to home or exit page
  };

  return (
    <header className="fixed top-0 w-full z-50 text-orange-600">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-zinc-900/70 to-black/80 backdrop-blur-xl border-b border-white/10"></div>

      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/browse')}
        >
          <span className="text-orange-500 font-black text-2xl sm:text-3xl">MOVI</span>
          <span className="text-white font-black text-2xl sm:text-3xl">AI</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* GPT Search / Home Toggle */}
          {location.pathname === '/browse' && (
            <button
              className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              onClick={handleGptSearchClick}
            >
              <div className="relative flex items-center gap-2">
                {showConfig ? (
                  <>
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Home</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">AI Search</span>
                    <Sparkles className="h-3 w-3 animate-pulse" />
                  </>
                )}
              </div>
            </button>
          )}

          {/* Wishlist */}
          <button
            className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg"
            onClick={() => navigate('/wishlist')}
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* User Avatar */}
          <img
            src={USER_AVATAR}
            alt="User Avatar"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300"
          />

          {/* Exit Button */}
          <button
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10 group"
            onClick={handleExit}
          >
            <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden lg:inline text-sm">Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
