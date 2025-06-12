import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import { TrendingUp, Clock, Star, Calendar } from 'lucide-react';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies);

  const movieCategories = [
    {
      title: "Trending Now",
      movies: movies?.trendingMovies,
      icon: TrendingUp,
      gradient: "from-red-500 to-pink-500",
      description: "What's hot right now"
    },
    {
      title: "Now Playing",
      movies: movies?.nowPlayingMovies,
      icon: Clock,
      gradient: "from-blue-500 to-cyan-500",
      description: "Currently in theaters"
    },
    {
      title: "Top Rated",
      movies: movies?.topRatedMovies,
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      description: "Critically acclaimed"
    },
    {
      title: "Upcoming",
      movies: movies?.upcomingMovies,
      icon: Calendar,
      gradient: "from-purple-500 to-indigo-500",
      description: "Coming soon"
    }
  ];

  return (
    movies.nowPlayingMovies && (
      <div className="relative -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40 z-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="relative space-y-8 sm:space-y-12 lg:space-y-16 px-4 sm:px-6 lg:px-12 pb-16">
          {movieCategories.map((category, index) => (
            <div key={category.title} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-4 group">
                <div className={`p-3 bg-gradient-to-r ${category.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {category.title}
                  </h2>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {category.description}
                  </p>
                </div>
                
                {/* View All Button */}
                <button className="ml-auto text-sm text-gray-400 hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100">
                  View All →
                </button>
              </div>
              
              {/* Movie List */}
              <MovieList 
                title={category.title} 
                movies={category.movies} 
                gradient={category.gradient}
                index={index}
              />
            </div>
          ))}
          
          {/* Bottom Gradient */}
          <div className="h-32 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;