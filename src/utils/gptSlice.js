import {createSlice} from "@reduxjs/toolkit"

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showgptsearch: false,
        movieNames: null,
        movieResults: null
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showgptsearch = !state.showgptsearch
        },
        addGptMovieResults: (state, action) => {
            const {movieNames, movieResults } = action.payload
            state.movieNames = movieNames
            state.movieResults = movieResults
        }
    },
});

export const { toggleGptSearchView , addGptMovieResults } = gptSlice.actions;

export default gptSlice.reducer