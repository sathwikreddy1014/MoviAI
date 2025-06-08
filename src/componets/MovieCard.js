import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({ poster }) => {
  if (!poster) return null;

  return (
    <div className="relative overflow-hidden w-40 sm:w-48 md:w-56 cursor-pointer">
      <img
        className="transition-transform duration-300 ease-in-out transform hover:scale-110 z-10"
        alt="movie poster"
        src={IMG_CDN_URL + poster}
      />
    </div>
  );
};

export default MovieCard;
