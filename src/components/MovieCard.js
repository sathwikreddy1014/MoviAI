import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Heart, Award } from 'lucide-react';
import { addWish, removeWish } from '../utils/wishSlice'; // adjust path

const MovieCard = ({ poster, movie, gradient = "from-blue-500 to-indigo-600", index = 0 }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);

  const [isHovered, setIsHovered] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Sync local heart state with Redux
  useEffect(() => {
    setIsInWatchlist(!!wishlist.find(item => item.id === movie.id));
  }, [wishlist, movie.id]);

  const posterUrl = poster 
    ? `https://image.tmdb.org/t/p/w500${poster}` 
    : `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop`;

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-emerald-600 border-emerald-500 bg-emerald-50';
    if (rating >= 6) return 'text-amber-600 border-amber-500 bg-amber-50';
    return 'text-rose-600 border-rose-500 bg-rose-50';
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (isInWatchlist) {
      dispatch(removeWish(movie.id));
    } else {
      dispatch(addWish(movie));
    }
  };

  return (
    <div 
      className="relative w-36 sm:w-44 md:w-52 cursor-pointer transition-all duration-500 animate-fade-in hover:z-20"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ${
        isHovered ? 'scale-105 shadow-2xl shadow-blue-500/20' : 'hover:shadow-xl'
      }`}>
        
        {/* Poster */}
        <img
          className={`w-full h-56 sm:h-72 md:h-80 object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : ''
          }`}
          alt={movie?.title || "Movie poster"}
          src={posterUrl}
        />

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Premium Badge */}
        <div className={`absolute top-3 left-3 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <div className={`px-2 sm:px-3 py-1 bg-gradient-to-r ${gradient} rounded-full backdrop-blur-sm text-white text-xs sm:text-sm font-medium flex items-center gap-1 shadow-lg`}>
            <Award className="h-3 w-3" />
            Premium
          </div>
        </div>

        {/* Rating Badge */}
        <div className={`absolute top-3 right-3 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md ${getRatingColor(movie?.vote_average || 7.5)}`}>
            ★ {(movie?.vote_average || 7.5).toFixed(1)}
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className={`bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 p-4 sm:p-6 rounded-full transform transition-all duration-300 shadow-2xl border border-white/50 hover:scale-110 ${
            isHovered ? 'scale-100' : 'scale-75'
          }`}>
            <Play className="h-6 w-6 sm:h-8 sm:w-8 fill-current" />
          </button>
        </div>

        {/* Bottom Info Bar */}
        <div className={`absolute bottom-0 left-0 right-0 p-2 sm:p-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-white font-medium text-sm sm:text-base truncate mb-1">
            {movie?.title || "Sample Movie Title"}
          </h3>

          <div className="flex items-center justify-between">
            {/* Heart Button */}
            <button 
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 border backdrop-blur-sm ${
                isInWatchlist 
                  ? 'bg-rose-500 border-rose-500 text-white scale-110' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-110'
              }`}
              onClick={handleHeartClick}
            >
              <Heart className={`h-4 w-4 ${isInWatchlist ? 'fill-current' : ''}`} />
            </button>

            {/* Release Year */}
            <div className="text-xs sm:text-sm text-gray-200 font-medium">
              {(movie?.release_date || "2023-01-01").split('-')[0]}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieCard;
