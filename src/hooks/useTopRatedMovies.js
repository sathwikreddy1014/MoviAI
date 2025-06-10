import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTopRatedMovies } from '../utils/moviesSlice';
import { useSelector } from 'react-redux';

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)
  const fetchTopRatedMovies = async () => {
    try {
      const data = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?page=1',
        API_OPTIONS
      );
      const json = await data.json();
      //console.log(json.results);
      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
    }
  };

  useEffect(() => {
    !topRatedMovies && fetchTopRatedMovies();
  }, []);

};

export default useTopRatedMovies;
