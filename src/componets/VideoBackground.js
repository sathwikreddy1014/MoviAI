import React from 'react'
import { useSelector } from 'react-redux';
import useMovieTrailer from './../hooks/useMovieTrailer';

const VideoBackground = ({movie_Id}) => {

 const trailerPlay = useSelector(store => store.movies?.trailerVideo)  
  useMovieTrailer(movie_Id)
  return (
    <div className="w-screen aspect-video p-0 m-0">
  <iframe
    className="w-screen aspect-video"
    src={`https://www.youtube.com/embed/${trailerPlay?.key}?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&iv_load_policy=3&playsinline=1`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    referrerPolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>

  )
}

export default VideoBackground
