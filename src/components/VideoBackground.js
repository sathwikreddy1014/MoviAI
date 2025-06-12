import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from './../hooks/useMovieTrailer';

const VideoBackground = ({ movie_Id }) => {
  const trailerPlay = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movie_Id);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Video Container */}
      <div className="relative w-full h-full">
        <iframe
          className="absolute inset-0 w-full h-full object-cover scale-110 transform"
          src={
            "https://www.youtube.com/embed/" +
            trailerPlay?.key +
            "?&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&loop=1&playlist=" +
            trailerPlay?.key
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        
        {/* Video Overlay Effects */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-blue-900/10"></div>
      </div>
    </div>
  );
};

export default VideoBackground;