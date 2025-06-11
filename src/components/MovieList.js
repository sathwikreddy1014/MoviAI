import React, { useRef } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 500, behavior: 'smooth' });
  };

  if (!movies || movies.length === 0) {
    return (
      <div className="px-6 relative z-20">
        <h1 className="text-3xl py-4 text-white">{title}</h1>
        <p className="text-white">No movies available</p>
      </div>
    );
  }

  return (
    <div className="px-6 relative z-20">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>

      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 text-white p-2 rounded-full flex md:hidden"
        onClick={scrollLeft}
      >
        ‹
      </button>

      <div className="group relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start">
              <MovieCard poster={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 text-white p-2 rounded-full flex md:hidden"
        onClick={scrollRight}
      >
        ›
      </button>
    </div>
  );
};

export default MovieList;
