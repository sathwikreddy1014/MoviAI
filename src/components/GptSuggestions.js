// src/components/GptSuggestions.js
import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  let movieNamesArray;
  if (Array.isArray(movieNames)) {
    movieNamesArray = movieNames;
  } else {
    try {
      movieNamesArray = JSON.parse(movieNames);
    } catch {
      movieNamesArray = String(movieNames)
        .split(',')
        .map((name) => name.replace(/^\[?\"?|\\"?\]?$/g, '').trim());
    }
  }

  if (!movieResults || movieResults.length === 0) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <div>
        {movieNamesArray.map((movieName, index) => (
          <MovieList key={movieName} title={movieName} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  );
};

export default GptSuggestions;
