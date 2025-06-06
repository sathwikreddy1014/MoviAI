import React from 'react'

const VideoTitle = ({title , overview}) => {
  return (
    <div className = "pt-[20%] px-16 absolute bg-gradient-to-r from-black w-screen aspect-video text-white">
      <h1 className = "text-4xl font-bold">{title}</h1>
      <p className = "text-lg w-3/12">{overview}</p>
      <div className = "mt-4 text-xl">
        <button className = "bg-orange-50 text-black w-32 h-12 rounded-lg hover:opacity-40 ">▶️ Play</button>
        <button className = "bg-gray-600 text-black w-40 h-12 ml-4 rounded-lg hover:opacity-40">More info</button>
      </div>
    </div>
  )
}

export default VideoTitle
