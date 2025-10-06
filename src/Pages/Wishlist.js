import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWish } from '../utils/wishSlice';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(store => store?.wishlist?.items || []);

  if (!wishlist.length) {
    return (
      <div className="flex items-center justify-center bg-gray-900 min-h-screen p-6 text-white">
        Your wishlist is empty.
      </div>
    );
  }

  const handleRemove = (id) => {
    dispatch(removeWish(id));
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-white mb-6">My Wishlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {wishlist.map(movie => (
          <div
            key={movie.id}
            className="relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gray-800 cursor-pointer"
          >
            {/* Poster Image */}
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop`}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />

            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

            {/* Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent">
              <h3 className="text-white text-lg font-semibold truncate">{movie.title}</h3>
              <p className="text-gray-300 text-sm">{(movie.release_date || '').split('-')[0]}</p>
              <p className="text-gray-400 text-xs mt-1 truncate">{movie.overview}</p>
            </div>

            {/* Remove Heart Button */}
            <button
              onClick={() => handleRemove(movie.id)}
              className="absolute top-3 right-3 p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
            >
              <Heart className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
