import React, { useRef, useState } from 'react';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight, Sparkles, Award } from 'lucide-react';

const MovieList = ({ title, movies, gradient = "from-blue-500 to-indigo-600", index = 0 }) => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  if (!movies || movies.length === 0) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-64 mx-auto"></div>
        <div className="flex gap-6 justify-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-52 h-80 bg-slate-200/50 rounded-xl backdrop-blur-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ animationDelay: `${index * 200}ms` }}>
      {/* Professional Section Header */}
      {/* <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`bg-gradient-to-r ${gradient} p-2 rounded-xl shadow-md`}>
          <Award className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-light text-slate-700 text-center">
          {title}
        </h2>
        <div className={`bg-gradient-to-r ${gradient} p-2 rounded-xl shadow-md`}>
          <Sparkles className="h-5 w-5 text-white" />
        </div>
      </div> */}

      {/* Professional Navigation Buttons */}
      <button
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-slate-700 p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg border border-white/50 ${
          showLeftButton ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'
        }`}
        onClick={scrollLeft}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-slate-700 p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg border border-white/50 ${
          showRightButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
        onClick={scrollRight}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Movies Container */}
      <div className="relative">
        {/* Subtle Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 blur-2xl rounded-3xl`}></div>
        
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-8 px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
        >
          {movies.map((movie, movieIndex) => (
            <div 
              key={movie.id} 
              className="snap-start flex-shrink-0 animate-fade-in"
              style={{ animationDelay: `${movieIndex * 150}ms` }}
            >
              <MovieCard 
                poster={movie.poster_path} 
                movie={movie} 
                gradient={gradient}
                index={movieIndex}
              />
            </div>
          ))}
          
          {/* End Spacer */}
          <div className="flex-shrink-0 w-8"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;