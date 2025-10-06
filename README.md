# MoviAI
# Project Setup
Before starting the project, create a .env file in the project root and add your API keys:

REACT_APP_TMDB_KEY=your_tmdb_api_key

REACT_APP_OPENAI_KEY=your_openai_api_key

# A brief description of the project
MoviAI is a Movie-Library, Netflix-style movie discovery app built with React, React Router, Tailwind CSS, and Redux Toolkit. It integrates TMDB for real-time movie data and OpenAI for GPT-powered search suggestions. Users can browse now playing, top rated, trending, and upcoming lists, and watch autoplaying/muted trailers.

# Set up and run locally (Windows)
Install Git on your desktop if it isn’t already installed.
Open the GitHub repository and copy the HTTPS clone URL.
Open Terminal or Command Prompt.
Navigate to the directory where you want the project:
Use dir to list folders.
Use cd foldername to enter the desired folder.
Clone the repository:
git clone <paste-https-url-here>
Open the project in VS Code:
code .
In VS Code, open a new terminal.
Install dependencies:
npm install
Start the app:
npm start
The app will run at http://localhost:3000.

# Running tests
This project uses Jest and React Testing Library for unit and integration tests. Test files are placed alongside corresponding components and slices (e.g., Wishlist.test.js).

Install test dependencies:

npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

Run all tests:

npm test


# Assumptions and design choices
TMDB is the source of truth for movie metadata, artwork, and categorizations (now playing, top rated, trending, upcoming).

OpenAI GPT is used for natural-language movie queries and suggestions; final movie details are resolved via TMDB.

React + Redux Toolkit provides centralized, predictable state management (movies, wishlist, GPT suggestions).

React Router is used for clean navigation and route-based organization.

Tailwind CSS enables fast, responsive UI development.

Environment variables are used for API keys and are not committed to version control.

Authentication note: I previously implemented login and logout using Firebase, but removed the feature since it was not part of the project requirements.