import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null;

  const randomIndex = Math.floor(Math.random() * movies.length);
  const mainMovie = movies[randomIndex];
  const { overview, original_title, id } = mainMovie;

  return (
    <div className="relative w-full h-[100vh] text-white bg-none">
      <VideoBackground movie_Id={id} />
      <div className="absolute top-[40%] left-12 z-20 max-w-2xl">
        <VideoTitle title={original_title} overview={overview} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
    </div>
  );
};

export default MainContainer;
