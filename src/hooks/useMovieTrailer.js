
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movie_Id) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovies = async () => {
    try {
      const data = await fetch("https://api.themoviedb.org/3/movie/" + movie_Id + "/videos?language=en-US", API_OPTIONS);
      const json = await data.json();
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Failed to fetch movie trailer:", error);
    }
  };

  useEffect(() => {
    !trailerVideo && getMovies();
  }, []);
};

export default useMovieTrailer;
