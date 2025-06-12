import React, { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX, Plus, ThumbsUp, Share } from 'lucide-react';

const VideoTitle = ({ title, overview }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Featured Badge */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Featured
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-2xl leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        
        {/* Subtitle Animation */}
        <div className="flex items-center gap-4 text-sm sm:text-base text-gray-300">
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30">
            HD
          </span>
          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-500/30">
            2024
          </span>
          <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded border border-purple-500/30">
            Action
          </span>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-lg lg:max-w-2xl">
        <p className=" hidden md:inline-block  text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed drop-shadow-lg">
          {overview?.length > 150 ? `${overview.substring(0, 150)}...` : overview}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
        {/* Play Button */}
        <button className="group relative bg-white hover:bg-gray-100 text-black font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base lg:text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center gap-2 sm:gap-3">
            <Play className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 fill-current group-hover:scale-110 transition-transform duration-300" />
            <span>Play</span>
          </div>
        </button>
        
        {/* More Info Button */}
        <button className="group bg-gray-600/80 hover:bg-gray-600 backdrop-blur-sm text-white font-bold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base lg:text-lg rounded-lg transition-all duration-300 border border-gray-500/50 hover:border-gray-400">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden sm:inline">More Info</span>
            <span className="sm:hidden">Info</span>
          </div>
        </button>

        {/* Secondary Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Add to List */}
          <button className="group p-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full border border-gray-600/50 hover:border-gray-400 transition-all duration-300 hover:scale-110">
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          {/* Like */}
          <button className="group p-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full border border-gray-600/50 hover:border-gray-400 transition-all duration-300 hover:scale-110">
            <ThumbsUp className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          {/* Share */}
          <button className="group p-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full border border-gray-600/50 hover:border-gray-400 transition-all duration-300 hover:scale-110">
            <Share className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
          </button>
          
          {/* Volume Toggle */}
          <button 
            className="group p-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full border border-gray-600/50 hover:border-gray-400 transition-all duration-300 hover:scale-110"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <Volume2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="hidden sm:block max-w-md">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>2:34:56</span>
          <div className="flex-1 bg-gray-700/50 rounded-full h-1 overflow-hidden">
            <div className="bg-red-500 h-full w-1/3 rounded-full animate-pulse"></div>
          </div>
          <span>2:45:12</span>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;