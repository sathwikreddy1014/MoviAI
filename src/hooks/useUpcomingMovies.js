import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addNewMovies } from '../utils/moviesSlice';

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const checkupcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const upComingMovies = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addNewMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };

  useEffect(() => {
    !checkupcomingMovies && upComingMovies();
  }, []);
};

export default useUpcomingMovies;