// src/redux/wishSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage or default to empty array
const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: savedWishlist
  },
  reducers: {
    addWish: (state, action) => {
      const movie = action.payload;
      if (!state.items.find(item => item.id === movie.id)) {
        state.items.push(movie);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    removeWish: (state, action) => {
      const movieId = action.payload;
      state.items = state.items.filter(item => item.id !== movieId);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWish: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    }
  }
});

export const { addWish, removeWish, clearWish } = wishSlice.actions;
export default wishSlice.reducer;
