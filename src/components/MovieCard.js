import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown, Star, Clock, Calendar, Heart, Award } from 'lucide-react';

const MovieCard = ({ poster, movie, gradient = "from-blue-500 to-indigo-600", index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInList, setIsInList] = useState(false);

  // Mock poster URL for demonstration
  const posterUrl = poster ? `https://image.tmdb.org/t/p/w500${poster}` : `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop`;

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-emerald-600 border-emerald-500 bg-emerald-50';
    if (rating >= 6) return 'text-amber-600 border-amber-500 bg-amber-50';
    return 'text-rose-600 border-rose-500 bg-rose-50';
  };

  const getGenreIcon = (title) => {
    if (title?.toLowerCase().includes('action')) return Clock;
    if (title?.toLowerCase().includes('drama')) return Star;
    if (title?.toLowerCase().includes('award')) return Award;
    return Calendar;
  };

  //const GenreIcon = getGenreIcon(movie?.title);

  return (
    <div 
      className="relative w-52 cursor-pointer transition-all duration-500 animate-fade-in hover:z-20"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster Container - Individual hover effects */}
      <div className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ${
        isHovered ? 'scale-105 shadow-2xl shadow-blue-500/20' : 'hover:shadow-xl'
      }`}>
        {/* Poster Image with individual scaling */}
        <img
          className={`w-full h-80 object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : ''
          }`}
          alt={movie?.title || "Movie poster"}
          src={posterUrl}
        />
        
        {/* Professional Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Quality Badge - appears on hover */}
        <div className={`absolute top-4 left-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <div className={`px-3 py-1 bg-gradient-to-r ${gradient} rounded-full backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1 shadow-lg`}>
            <Award className="h-3 w-3" />
            Premium
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className={`absolute top-4 right-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <div className={`px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-md ${getRatingColor(movie?.vote_average || 7.5)}`}>
            ★ {(movie?.vote_average || 7.5).toFixed(1)}
          </div>
        </div>
        
        {/* Professional Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className={`bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 p-6 rounded-full transform transition-all duration-300 shadow-2xl border border-white/50 hover:scale-110 ${
            isHovered ? 'scale-100' : 'scale-75'
          }`}>
            <Play className="h-8 w-8 fill-current" />
          </button>
        </div>
        
        {/* Professional Bottom Info Bar */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-white font-medium text-lg truncate mb-3">
            {movie?.title || "Sample Movie Title"}
          </h3>
          
          {/* Professional Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                className={`p-2 rounded-full transition-all duration-300 border backdrop-blur-sm ${
                  isLiked 
                    ? 'bg-rose-500 border-rose-500 text-white scale-110' 
                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-110'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <button 
                className={`p-2 rounded-full transition-all duration-300 border backdrop-blur-sm ${
                  isInList 
                    ? 'bg-emerald-500 border-emerald-500 text-white scale-110' 
                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-110'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInList(!isInList);
                }}
              >
                <Plus className={`h-4 w-4 transition-transform duration-300 ${isInList ? 'rotate-45' : ''}`} />
              </button>
            </div>
            
            <div className="text-sm text-gray-200 font-medium">
              {(movie?.release_date || "2023-01-01").split('-')[0]}
            </div>
          </div>
        </div>

        {/* Professional Hover Glow Effect */}
        {/* <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} transition-opacity duration-500 ${
          isHovered ? 'opacity-10' : 'opacity-0'
        }`}></div>
      </div> */}

      {/* Professional Expanded Info Card */}
      {/* {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 p-6 mt-6 border border-white/50 animate-fade-in"> */}
          {/* Header */}
          {/* <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-slate-800 font-medium text-lg mb-2 line-clamp-2">
                {movie?.title || "Sample Movie Title"}
              </h3>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span>{(movie?.release_date || "2023-01-01").split('-')[0]}</span>
                <span>•</span>
                <span className={`font-medium ${getRatingColor(movie?.vote_average || 7.5).split(' ')[0]}`}>
                  ★ {(movie?.vote_average || 7.5).toFixed(1)}
                </span>
                <span>•</span>
                <div className={`p-1 bg-gradient-to-r ${gradient} rounded`}>
                  <GenreIcon className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200">
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </button>
          </div> */}
          
          {/* Professional Action Buttons */}
          {/* <div className="flex items-center gap-3 mb-6">
            <button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg">
              <Play className="h-5 w-5 fill-current" />
              <span>Watch Now</span>
            </button>
            
            <button className="p-3 border border-slate-300 hover:border-slate-400 text-slate-600 rounded-xl transition-colors duration-200 hover:bg-slate-50">
              <Plus className="h-5 w-5" />
            </button>
            
            <button className="p-3 border border-slate-300 hover:border-slate-400 text-slate-600 rounded-xl transition-colors duration-200 hover:bg-slate-50">
              <ThumbsUp className="h-5 w-5" />
            </button>
          </div> */}
          
          {/* Professional Movie Info */}
          {/* <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs">
              <span className={`px-3 py-1 rounded-full font-medium border ${getRatingColor(movie?.vote_average || 7.5)}`}>
                {Math.round((movie?.vote_average || 7.5) * 10)}% Match
              </span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-200 font-medium">
                4K Ultra HD
              </span>
              <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full border border-purple-200 font-medium">
                HDR
              </span>
            </div>
    
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {movie?.overview || "An exceptional cinematic experience that showcases masterful storytelling, outstanding performances, and breathtaking visuals. This carefully curated selection represents the finest in contemporary filmmaking."}
            </p>
            
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span className="font-medium">Release Date</span>
                <span>{movie?.release_date || '2023-01-01'}</span>
              </div>
            </div>
          </div> */}
        </div>
      {/* )} */}
    </div>
  );
};

export default MovieCard;