import {createSlice} from "@reduxjs/toolkit"

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showgptsearch: false
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showgptsearch = !state.showgptsearch
        }
    },
});

export const { toggleGptSearchView } = gptSlice.actions;

export default gptSlice.reducer