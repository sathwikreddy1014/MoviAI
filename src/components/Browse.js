import React from 'react'
import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useTopRatedMovies from "../hooks/useTopRatedMovies"
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import useTrendingMovies from "../hooks/useTrendingMovies"
import GptSearchPage from './GptSearchPage';
import { useSelector } from 'react-redux';



const Browse = () => {

  const showView = useSelector((store) => store?.gpt?.showgptsearch)

  useNowPlayingMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTrendingMovies();

  return (
    <div >
      <div>
        <Header/>
        { showView ? (<GptSearchPage/> ) : (
        <>
        <MainContainer/>
        <SecondaryContainer/>
        </>)}
        
      </div>
    </div>
  )
}

export default Browse
