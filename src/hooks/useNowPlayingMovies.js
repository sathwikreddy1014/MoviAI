import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addNewPlayingMovies } from '../utils/moviesSlice';
import { useSelector } from 'react-redux';

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)
  const getPlayingMovies = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addNewPlayingMovies(json.results));
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
    }
  };

  useEffect(() => {
    !nowPlayingMovies &&  getPlayingMovies(); 
  }, []);
};

export default useNowPlayingMovies;
