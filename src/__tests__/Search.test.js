// src/__tests__/GptSearchBar.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GptSearchBar from '../components/GptSearchBar';

// Ensure jest-dom matchers are available via setupTests.js:
// import '@testing-library/jest-dom'

// Mock hook with controllable promise
const searchMoviesMock = jest.fn();

jest.mock('../hooks/useGptMovieSearch', () => ({
  __esModule: true,
  default: () => ({ searchMovies: searchMoviesMock }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders header and description', () => {
  render(<GptSearchBar />);
  expect(screen.getByText('AI-Powered Movie Search')).toBeInTheDocument(); // [web:5]
  expect(screen.getByText(/Describe any movie scenario/i)).toBeInTheDocument(); // [web:5]
});

test('renders input and search button', () => {
  render(<GptSearchBar />);
  expect(screen.getByPlaceholderText('Search for movies...')).toBeInTheDocument(); // [web:5]
  expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument(); // [web:5]
});

test('does not trigger search on empty input', async () => {
  render(<GptSearchBar />);
  await userEvent.click(screen.getByRole('button', { name: /Search/i })); // [web:6]
  expect(searchMoviesMock).not.toHaveBeenCalled(); // [web:6]
});

test('calls searchMovies on click and awaits completion', async () => {
  // make searchMovies resolve after a microtask
  const resolver = Promise.resolve();
  searchMoviesMock.mockImplementation(async () => { await resolver; });

  render(<GptSearchBar />);
  const input = screen.getByPlaceholderText('Search for movies...');
  await userEvent.type(input, 'Avengers'); // [web:6]
  await userEvent.click(screen.getByRole('button', { name: /Search/i })); // [web:6]

  await waitFor(() => expect(searchMoviesMock).toHaveBeenCalledWith('Avengers')); // [web:6]
});

test('calls searchMovies when Enter is pressed (keyDown preferred)', async () => {
  searchMoviesMock.mockResolvedValueOnce(undefined);

  render(<GptSearchBar />);
  const input = screen.getByPlaceholderText('Search for movies...');
  await userEvent.type(input, 'Avengers'); // [web:6]

  // Prefer keyDown over deprecated keyPress
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 }); // [web:10]

  await waitFor(() => expect(searchMoviesMock).toHaveBeenCalledWith('Avengers')); // [web:6]
});

test('disables input and button while searching, then re-enables', async () => {
  let resolveSearch;
  const searchPromise = new Promise((res) => { resolveSearch = res; });
  searchMoviesMock.mockImplementation(() => searchPromise);

  render(<GptSearchBar />);
  const input = screen.getByPlaceholderText('Search for movies...');
  const button = screen.getByRole('button', { name: /Search/i });

  await userEvent.type(input, 'Test Movie'); // [web:6]
  await userEvent.click(button); // [web:6]

  expect(input).toBeDisabled(); // [web:8]
  expect(button).toBeDisabled(); // [web:8]

  // Resolve async search to allow setIsSearching(false)
  resolveSearch();

  await waitFor(() => {
    expect(input).not.toBeDisabled();
    expect(button).not.toBeDisabled();
  }); // [web:6]
});

test('example search buttons fill input and trigger search', async () => {
  searchMoviesMock.mockResolvedValue(undefined);

  render(<GptSearchBar />);

  const examples = [
    'Sci-fi movies with time travel',
    "Romantic comedies from the 90s",
    'Action movies with superheroes',
    'Horror movies in space',
  ];

  for (const text of examples) {
    const btn = screen.getByRole('button', { name: text });
    expect(btn).toBeInTheDocument(); // [web:5]
    await userEvent.click(btn); // [web:6]
    await waitFor(() => expect(searchMoviesMock).toHaveBeenCalledWith(text)); // [web:6]
  }
});
