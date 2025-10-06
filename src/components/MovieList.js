import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, gradient = "from-blue-500 to-indigo-600" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!movies || movies.length === 0) {
    // Shimmer / Skeleton loader
    return (
      <div className="space-y-6 my-8 px-4 sm:px-6 lg:px-8">
        <div className="h-10 bg-slate-300 rounded-lg w-64 mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 animate-shimmer"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="h-72 sm:h-80 w-full bg-slate-300 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 animate-shimmer"></div>
              </div>
              <div className="h-4 w-3/4 bg-slate-300 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`my-8 transition-all duration-1000 px-4 sm:px-6 lg:px-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="animate-fade-in flex flex-col items-center"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MovieCard
              poster={movie.poster_path}
              movie={movie}
              gradient={gradient}
              index={index}
            />
            {/* Movie Title */}
            <h2 className="mt-2 text-center text-sm sm:text-base font-semibold text-white truncate w-full">
              {movie?.title || movie?.name || "Untitled"}
            </h2>
          </div>
        ))}
      </div>

      {/* Optional subtle background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 blur-2xl rounded-3xl pointer-events-none`}></div>
    </div>
  );
};

export default MovieList;
