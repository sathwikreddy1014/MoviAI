
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trendingMovies: null
  },
  reducers: {
    addNewPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addNewMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    }
  },
});

export const { addNewPlayingMovies, addTrailerVideo, addTopRatedMovies, addNewMovies, addTrendingMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
