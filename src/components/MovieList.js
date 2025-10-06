import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies, gradient = "from-blue-500 to-indigo-600" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!movies || movies.length === 0) {
    // Placeholder / skeleton loader
    return (
      <div className="space-y-6 animate-pulse my-8">
        <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-64 mx-auto"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center px-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-200/50 rounded-xl backdrop-blur-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`my-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 px-4">{title}</h2>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MovieCard
              poster={movie.poster_path}
              movie={movie}
              gradient={gradient}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Optional subtle background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 blur-2xl rounded-3xl pointer-events-none`}></div>
    </div>
  );
};

export default MovieList;
