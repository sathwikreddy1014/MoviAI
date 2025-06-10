// src/hooks/useGptMovieSearch.js
import { useDispatch } from 'react-redux';
import { GEMINI_API_KEY, API_OPTIONS } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';

const useGptMovieSearch = () => {
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await response.json();
    return json.results;
  };

  const searchMovies = async (query) => {
    if (!query) {
      console.error('Please Enter Your Thoughts');
      return;
    }

    //console.log('Searching for:', query);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const prompt = `Return ONLY a JSON array of 10 popular movies related to "${query}". Do not include markdown, explanation, or formatting. Just the array. Example: ["Movie 1", "Movie 2"]`;

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanMarkdownJson = (text) =>
        text.replace(/```json|```/gi, '').replace(/[\r\n]+/g, '').trim();

      try {
        const cleanedText = cleanMarkdownJson(generatedText);
        const parsedMovies = JSON.parse(cleanedText);
        const promiseArray = parsedMovies.map((movie) => searchMovieTMDB(movie));
        const movieResults = await Promise.all(promiseArray);
       
        dispatch(addGptMovieResults({ movieNames: cleanedText , movieResults: movieResults }));
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
      }
    } catch (err) {
      console.error('API error:', err);
    }
  };

  return { searchMovies };
};

export default useGptMovieSearch;
