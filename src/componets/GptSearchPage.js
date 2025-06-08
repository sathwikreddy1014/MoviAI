import React from 'react';
import { BG_URL } from './../utils/constants';
import GptSearchBar from './GptSearchBar';
import GptSuggestions from './GptSuggestions';

const GptSearchPage = () => {
  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <img 
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        alt="background"
        src={BG_URL}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 -z-10"></div>
      
      <GptSearchBar />
      <GptSuggestions />
    </div>
  );
};

export default GptSearchPage;
