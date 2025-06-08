import { API_OPTIONS } from './../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrendingMovies } from "../utils/moviesSlice"
import { useEffect } from 'react';


const useTrendingMovies = () => {
    const dispatch = useDispatch()

  const trendingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/trending/movie/day', API_OPTIONS)
    const json = await data.json()
    //console.log(json.results);
    dispatch(addTrendingMovies(json.results))
  }

  useEffect(() => {
    trendingMovies()
  },[])
}

export default useTrendingMovies
