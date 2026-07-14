import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Play, Plus, Heart, Award } from "lucide-react";
import { addWish, removeWish } from "../utils/wishSlice";

const MovieCard = ({
  poster,
  movie,
  gradient = "from-blue-500 to-indigo-600",
  index = 0,
}) => {
  const dispatch = useDispatch();

  const wishlist = useSelector((store) => store.wishlist.items);

  const isInList = wishlist.some((item) => item.id === movie.id);

  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const posterUrl = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop";

  const getRatingColor = (rating) => {
    if (rating >= 8)
      return "text-emerald-600 border-emerald-500 bg-emerald-50";
    if (rating >= 6)
      return "text-amber-600 border-amber-500 bg-amber-50";
    return "text-rose-600 border-rose-500 bg-rose-50";
  };

  const handleWishlist = (e) => {
    e.stopPropagation();

    if (isInList) {
      dispatch(removeWish(movie.id));
    } else {
      dispatch(addWish(movie));
    }
  };

  return (
    <div
      className="relative w-52 cursor-pointer transition-all duration-500 animate-fade-in hover:z-20"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ${
          isHovered
            ? "scale-105 shadow-2xl shadow-blue-500/20"
            : "hover:shadow-xl"
        }`}
      >
        <img
          className={`w-full h-80 object-cover transition-all duration-700 ${
            isHovered ? "scale-110" : ""
          }`}
          src={posterUrl}
          alt={movie?.title || "Movie Poster"}
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Premium Badge */}
        <div
          className={`absolute top-4 left-4 transition-all duration-500 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <div
            className={`px-3 py-1 bg-gradient-to-r ${gradient} rounded-full text-white text-xs font-medium flex items-center gap-1 shadow-lg backdrop-blur-sm`}
          >
            <Award className="h-3 w-3" />
            Premium
          </div>
        </div>

        {/* Rating */}
        <div
          className={`absolute top-4 right-4 transition-all duration-500 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${getRatingColor(
              movie?.vote_average || 7.5
            )}`}
          >
            ★ {(movie?.vote_average || 7.5).toFixed(1)}
          </div>
        </div>

        {/* Play Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className={`bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 p-6 rounded-full border border-white/50 shadow-2xl transition-all duration-300 ${
              isHovered ? "scale-100" : "scale-75"
            } hover:scale-110`}
          >
            <Play className="h-8 w-8 fill-current" />
          </button>
        </div>

        {/* Bottom Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-white text-lg font-medium truncate mb-3">
            {movie?.title || "Sample Movie"}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={`p-2 rounded-full border backdrop-blur-sm transition-all duration-300 ${
                  isLiked
                    ? "bg-rose-500 border-rose-500 text-white scale-110"
                    : "bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-110"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full border backdrop-blur-sm transition-all duration-300 ${
                  isInList
                    ? "bg-emerald-500 border-emerald-500 text-white scale-110"
                    : "bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-110"
                }`}
              >
                <Plus
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isInList ? "rotate-45" : ""
                  }`}
                />
              </button>
            </div>

            <div className="text-sm text-gray-200 font-medium">
              {(movie?.release_date || "2023-01-01").split("-")[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;