import { API_OPTIONS } from './../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrendingMovies } from "../utils/moviesSlice"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const useTrendingMovies = () => {
    const dispatch = useDispatch()
  const checktrendingMovies = useSelector((store) => store.movies.trendingMovies)
  const trendingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/trending/movie/day', API_OPTIONS)
    const json = await data.json()
    //console.log(json.results);
    dispatch(addTrendingMovies(json.results))
  }

  useEffect(() => {
    !checktrendingMovies && trendingMovies()
  },[])
}

export default useTrendingMovies
