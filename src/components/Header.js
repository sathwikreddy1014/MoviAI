import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import { Search, Home, LogOut, Globe, Sparkles, Bell, User } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const showConfig = useSelector((store) => store.gpt.showgptsearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate('/errorpage');
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (location.pathname === '/') {
          navigate('/browse');
        }
      } else {
        dispatch(removeUser());
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]);

  // Don't render header on login page if user is not authenticated
  if (location.pathname === '/' && !user) {
    return null;
  }

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-500">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-zinc-900/70 to-black/80 backdrop-blur-xl border-b border-white/10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -top-2 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute -top-6 right-12 w-20 h-20 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer" onClick={() => navigate('/browse')}>
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-6 sm:h-8 lg:h-10 w-auto transition-transform duration-300 group-hover:scale-110 flex items-center">
              <span className="text-red-500 font-black text-xl sm:text-2xl lg:text-3xl">NETFLIX</span>
              <span className="text-white font-black text-xl sm:text-2xl lg:text-3xl">GPT</span>
            </div>
          </div>
          
          {/* Navigation Pills */}
          {user && (
            <nav className="hidden md:flex items-center gap-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === '/browse' 
                    ? 'bg-white/20 text-white backdrop-blur-sm border border-white/20' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => navigate('/browse')}
              >
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </div>
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === '/about' 
                    ? 'bg-white/20 text-white backdrop-blur-sm border border-white/20' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => navigate('/about')}
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>About</span>
                </div>
              </button>
            </nav>
          )}
        </div>

        {/* User Controls */}
        {user && (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector - Only show on browse page */}
            {showConfig && location.pathname === '/browse' && ( 
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
                  <select 
                    className="bg-transparent pl-10 pr-8 py-2 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                    onChange={handleLanguage}
                  >
                    {SUPPORTED_LANGAGES.map((language) => (
                      <option key={language.identifier} value={language.identifier} className="bg-black">
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              <button
                className={`text-white hover:text-gray-300 text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10 ${
                  location.pathname === '/browse' ? 'bg-white/20' : ''
                }`}
                onClick={() => navigate('/browse')}
              >
                <Home className="h-4 w-4" />
              </button>
              <button
                className={`text-white hover:text-gray-300 text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10 ${
                  location.pathname === '/about' ? 'bg-white/20' : ''
                }`}
                onClick={() => navigate('/about')}
              >
                <User className="h-4 w-4" />
              </button>
            </div>

            {/* Search/Home Toggle - Only show on browse page */}
            {location.pathname === '/browse' && (
              <button 
                className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                onClick={handleGptSearchClick}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
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

            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                  alt="User Avatar"
                  src="https://occ-0-4857-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTMiZwRhh5FJfP3aZxAPx3Um3gL-gt38U0Txelj-JIiLvU-9M9i4rjnFRNbpUgCFkZxk_60QwarCVVgnUbHMyp66r7h6dWE.png?r=a82"
                />
              </div>
              
              {/* Sign Out Button */}
              <button 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10 group"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden lg:inline text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;