import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";


const useGptMovieSearch = () => {
  const dispatch = useDispatch();
  const abortControllerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // 🎬 Search Movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      if (!response.ok) return [];

      const json = await response.json();
      return json.results || [];
    } catch (error) {
      console.error("TMDB error:", error);
      return [];
    }
  };

  // 🤖 Gemini Movie Generator
  const searchMovies = async (query) => {
    if (!query?.trim()) {
      console.error("Please enter something");
      return;
    }

    if (loading) return; // prevent multiple clicks

    setLoading(true);

    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const url = "https://api.groq.com/openai/v1/chat/completions";

    const prompt = `
Return ONLY a pure JSON array of 10 popular movies related to "${query}".
No markdown.
No explanation.
Only JSON.
Example:
["Inception","Interstellar"]
`;

const requestBody = {
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.7,
};

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
  Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
  "Content-Type": "application/json",
},
        body: JSON.stringify(requestBody),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Try again later.");
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

     const generatedText =
  data?.choices?.[0]?.message?.content || "";

      // 🧹 Clean Markdown if Gemini sends it
      const cleanedText = generatedText
        .replace(/```json|```/gi, "")
        .replace(/[\r\n]+/g, "")
        .trim();

      let parsedMovies = [];

      try {
        parsedMovies = JSON.parse(cleanedText);
      } catch (err) {
        console.error("JSON parse failed:", cleanedText);
        throw new Error("Invalid JSON from Gemini");
      }

      if (!Array.isArray(parsedMovies)) {
        throw new Error("Gemini did not return an array");
      }

      // 🎥 Fetch TMDB results
      const movieResults = await Promise.all(
        parsedMovies.map((movie) => searchMovieTMDB(movie))
      );

      dispatch(
        addGptMovieResults({
          movieNames: parsedMovies,
          movieResults: movieResults,
        })
      );
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Previous request cancelled");
      } else {
        console.error("Search error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { searchMovies, loading };
};

export default useGptMovieSearch;
