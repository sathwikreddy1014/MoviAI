import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer, { removeWish } from "../utils/wishSlice";
import Wishlist from "../Pages/Wishlist";

// Helper to render with configured store
const renderWithStore = (preloadedState = { wishlist: { items: [] } }) => {
  const store = configureStore({
    reducer: { wishlist: wishlistReducer },
    preloadedState
  });

  return render(
    <Provider store={store}>
      <Wishlist />
    </Provider>
  );
};

describe("Wishlist Component", () => {
  test("renders empty wishlist message", () => {
    renderWithStore();
    expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();
  });

  test("renders wishlist title when items present", () => {
    renderWithStore({
      wishlist: {
        items: [{ 
          id: 1, 
          poster_path: "/somepath.jpg", 
          title: "Sample Movie", 
          release_date: "2020-01-15", 
          overview: "A movie overview" 
        }]
      }
    });
    expect(screen.getByText(/my wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/sample movie/i)).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText(/a movie overview/i)).toBeInTheDocument();
  });

  test("renders fallback poster if poster_path not present", () => {
    renderWithStore({
      wishlist: {
        items: [{ 
          id: 2, 
          title: "No Poster Movie", 
          release_date: "2019-05-10", 
          overview: "No poster available" 
        }]
      }
    });
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("pexels-photo-7991579.jpeg");
  });

  test("removes a movie when heart button is clicked", () => {
    const preloadedState = {
      wishlist: {
        items: [{
          id: 3,
          title: "Removable Movie",
          poster_path: "/removable.jpg",
          release_date: "2018-12-01",
          overview: "Remove me"
        }]
      }
    };
    const store = configureStore({
      reducer: { wishlist: wishlistReducer },
      preloadedState
    });

    render(
      <Provider store={store}>
        <Wishlist />
      </Provider>
    );

    // Should show movie card first
    expect(screen.getByText(/removable movie/i)).toBeInTheDocument();

    // Click the heart remove button
    const removeButton = screen.getByRole("button");
    fireEvent.click(removeButton);

    // The movie should be gone - UI should render empty state message
    expect(screen.getByText(/your wishlist is empty/i)).toBeInTheDocument();
  });

  test("renders multiple wishlist items correctly", () => {
    renderWithStore({
      wishlist: {
        items: [
          { 
            id: 4, 
            title: "Movie 1", 
            poster_path: "/m1.jpg", 
            release_date: "2017-11-02", 
            overview: "First overview" 
          },
          { 
            id: 5, 
            title: "Movie 2", 
            poster_path: "/m2.jpg", 
            release_date: "2016-10-03", 
            overview: "Second overview" 
          }
        ]
      }
    });

    expect(screen.getByText(/movie 1/i)).toBeInTheDocument();
    expect(screen.getByText(/movie 2/i)).toBeInTheDocument();
    expect(screen.getByText("2017")).toBeInTheDocument();
    expect(screen.getByText("2016")).toBeInTheDocument();
    expect(screen.getByText(/first overview/i)).toBeInTheDocument();
    expect(screen.getByText(/second overview/i)).toBeInTheDocument();
  });
});
