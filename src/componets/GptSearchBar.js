import React from 'react';
import { useSelector } from 'react-redux';
import language from './../utils/languageconstants';

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.language)
  return (
    <div className="pt-[20vh] flex justify-center items-start w-full">
      <form className="flex w-full max-w-2xl px-4">
        <input
          className="flex-grow px-6 py-4 rounded-l-md bg-[#141414] text-white placeholder-gray-400 focus:outline-none text-lg"
          type="text"
          placeholder={language[langKey]?.gptPlaceholder}
        />
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-r-md text-lg font-semibold transition-colors duration-200">
          {language[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
