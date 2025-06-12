
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrendingMovies } from '../utils/moviesSlice';

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const checktrendingMovies = useSelector((store) => store.movies.trendingMovies);

  const trendingMovies = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/trending/movie/day', API_OPTIONS);
      const json = await data.json();
      dispatch(addTrendingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    }
  };

  useEffect(() => {
    !checktrendingMovies && trendingMovies();
  }, []);
};

export default useTrendingMovies;
