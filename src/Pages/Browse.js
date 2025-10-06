import React from 'react';
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from '../components/MainContainer';
import SecondaryContainer from '../components/SecondaryContainer';
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import GptSearchPage from '../components/GptSearchPage';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showView = useSelector((store) => store?.gpt?.showgptsearch);
  
  
  useTrendingMovies();
  useNowPlayingMovies();
  useTopRatedMovies();
  useUpcomingMovies();


  return (
    <div>
      {showView ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;