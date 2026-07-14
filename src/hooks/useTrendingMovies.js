import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../utils/moviesSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector(
    (store) => store.movies.trendingMovies
  );

  useEffect(() => {
    if (trendingMovies) return;

    const fetchTrendingMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day",
          API_OPTIONS
        );

        const json = await data.json();
        dispatch(addTrendingMovies(json.results));
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, [dispatch, trendingMovies]);
};

export default useTrendingMovies;