/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router';
import Header from '../Pages/Header';



const mockedNavigate = jest.fn();
useNavigate.mockReturnValue(mockedNavigate);

// ✅ Stub reducer for GPT slice
const gptReducer = (state = { showgptsearch: false }, action) => {
  switch (action.type) {
    case 'gpt/toggleGptSearchView':
      return { ...state, showgptsearch: !state.showgptsearch };
    default:
      return state;
  }
};

const toggleGptSearchView = () => ({ type: 'gpt/toggleGptSearchView' });

// ✅ Utility function to render Header
const renderHeader = ({
  initialRoute = '/browse',
  preloadedState = { gpt: { showgptsearch: false } },
} = {}) => {
  const store = configureStore({
    reducer: { gpt: gptReducer },
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="*" element={<Header />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders logo and avatar on /browse', () => {
    renderHeader({ initialRoute: '/browse' });

    expect(screen.getByText('MOVI')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();

    const avatar = screen.getByAltText(/user avatar/i);
    expect(avatar).toBeInTheDocument();
  });

  test('shows AI Search button when showgptsearch is false', () => {
    renderHeader({ preloadedState: { gpt: { showgptsearch: false } } });
    expect(screen.getByRole('button', { name: /ai search/i })).toBeInTheDocument();
  });

  test('shows Home button when showgptsearch is true', () => {
    renderHeader({ preloadedState: { gpt: { showgptsearch: true } } });
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
  });

  test('does not render GPT toggle outside /browse (e.g., /wishlist)', () => {
    renderHeader({ initialRoute: '/wishlist' });
    expect(screen.queryByRole('button', { name: /ai search/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /home/i })).not.toBeInTheDocument();
  });

  test('clicking GPT button toggles state and scrolls to top', () => {
    const scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { store } = renderHeader({ preloadedState: { gpt: { showgptsearch: false } } });

    const toggleBtn = screen.getByRole('button', { name: /ai search/i });
    fireEvent.click(toggleBtn);

    // Check state toggle
    expect(store.getState().gpt.showgptsearch).toBe(true);
    // Check UI change
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    // Check scroll
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    scrollSpy.mockRestore();
  });

  test('clicking wishlist icon triggers navigation', () => {
    renderHeader({ initialRoute: '/browse' });
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // Assuming 2nd button is wishlist
    expect(mockedNavigate).toHaveBeenCalledWith('/wishlist');
  });

  test('clicking Exit navigates to /browse', () => {
    renderHeader({ initialRoute: '/other' });
    const exitBtn = screen.getByRole('button', { name: /exit/i });
    fireEvent.click(exitBtn);
    expect(mockedNavigate).toHaveBeenCalledWith('/browse');
  });

  test('clicking logo navigates to /browse', () => {
    renderHeader({ initialRoute: '/other' });
    fireEvent.click(screen.getByText('MOVI'));
    expect(mockedNavigate).toHaveBeenCalledWith('/browse');
  });
});
