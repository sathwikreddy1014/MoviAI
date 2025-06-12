
import React from 'react';
import { BG_URL } from '../utils/constants';
import GptSearchBar from './GptSearchBar';
import GptSuggestions from './GptSuggestions';

const GptSearchPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img 
          className="w-full h-full object-cover"
          alt="background"
          src={BG_URL}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-32">
        <GptSearchBar />
        <GptSuggestions />
      </div>
    </div>
  );
};

export default GptSearchPage;