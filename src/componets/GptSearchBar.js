// src/components/GptSearchBar.js
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import language from '../utils/languageconstants';
import useGptMovieSearch from '../hooks/useGptMovieSearch';

const GptSearchBar = () => {
  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.language);
  const { searchMovies } = useGptMovieSearch();

  const handleSearch = () => {
    const query = searchText.current.value.trim();
    searchMovies(query);
  };

  return (
    <div className="pt-[20vh] flex flex-col items-center w-full">
      <form className="flex w-full max-w-2xl px-4" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          className="flex-grow px-6 py-4 rounded-l-md bg-[#141414] text-white placeholder-gray-400 focus:outline-none text-lg"
          type="text"
          placeholder={language[langKey]?.gptPlaceholder}
        />
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-r-md text-lg font-semibold transition-colors duration-200"
          onClick={handleSearch}
        >
          {language[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
