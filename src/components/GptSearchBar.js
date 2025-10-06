import React, { useRef, useState } from 'react';
import useGptMovieSearch from '../hooks/useGptMovieSearch';
import { Search, Loader } from 'lucide-react';

const GptSearchBar = () => {
  const searchText = useRef(null);
  const { searchMovies } = useGptMovieSearch();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;
    
    setIsSearching(true);
    await searchMovies(query);
    setIsSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            AI-Powered Movie Search
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Describe any movie scenario and let AI find the perfect matches for you
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="flex rounded-lg overflow-hidden shadow-2xl">
            <div className="relative flex-grow">
              <input
                ref={searchText}
                className="w-full px-6 py-4 sm:py-5 lg:py-6 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg sm:text-xl transition-all duration-200"
                type="text"
                placeholder="Search for movies..."
                onKeyPress={handleKeyPress}
                disabled={isSearching}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>
            
            <button
              type="button"
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-red-600/50 text-white px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl font-semibold transition-all duration-200 flex items-center gap-3 min-w-[120px] justify-center"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Example Searches */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Sci-fi movies with time travel",
              "Romantic comedies from the 90s",
              "Action movies with superheroes",
              "Horror movies in space"
            ].map((example, index) => (
              <button
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all duration-200"
                onClick={() => {
                  searchText.current.value = example;
                  handleSearch();
                }}
                disabled={isSearching}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptSearchBar;
