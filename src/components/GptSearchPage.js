import React from 'react';
import { BG_URL } from './../utils/constants';
import GptSearchBar from './GptSearchBar';
import GptSuggestions from './GptSuggestions';

const GptSearchPage = () => {
  return (
    <>
      <div className="fixed -z-10">
      <img 
        className=" h-screen object-cover "
        alt="background"
        src={BG_URL}/>
      </div>
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 -z-10"></div> */}
      <div className = "">
        <GptSearchBar />
        <GptSuggestions />
      </div>
    </>
  );
};

export default GptSearchPage;
