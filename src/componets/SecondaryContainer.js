import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movies)
  //console.log("data",movies);
  

  return (
    <div className = "bg-black text-white">
      <div className = "-mt-44">
        <MovieList title = {"Trending"} movies = {movies?.upcomingMovies}/>
        <MovieList title = {"Now PLaying"} movies = {movies?.nowPlayingMovies}/>
        <MovieList title = {"Top Rated"} movies = {movies?.topRatedMovies}/>
        <MovieList title = {"Up Coming"} movies = {movies?.upcomingMovies}/>
      </div>
    </div>
  )
}

export default SecondaryContainer
