import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="text-white space-y-4">
      <h1 className="text-5xl font-bold drop-shadow-md">{title}</h1>
      <p className="text-lg max-w-xl line-clamp-4 drop-shadow-md">{overview}</p>
      <div className="flex space-x-4">
        <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 text-lg rounded hover:bg-opacity-80 transition">
          <FaPlay /> Play
        </button>
        <button className="flex items-center gap-2 bg-gray-600 text-white font-semibold px-6 py-3 text-lg rounded hover:bg-gray-500 transition">
          <AiOutlineInfoCircle size={22} /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
