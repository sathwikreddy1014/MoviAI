import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  const movieNamesArray = Array.isArray(movieNames)
    ? movieNames
    : movieNames.split(',').map((name) => name.trim());

  if (!movieResults || movieResults.length === 0) {
    // No results yet, return null or fallback UI if needed
    return null;
  }

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80 ">
      <div>
        {movieNamesArray.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptSuggestions;
