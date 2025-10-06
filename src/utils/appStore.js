
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./moviesSlice"; 
import gptReducer from "./gptSlice";
import wishReducer from "./wishSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    wishlist: wishReducer
  },
});

export default appStore;