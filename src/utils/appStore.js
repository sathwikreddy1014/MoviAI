import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./moviesSlice"; // ✅ make sure this path is correct

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer, // ✅ this key must match your slice name or desired namespace
  },
});

export default appStore;
