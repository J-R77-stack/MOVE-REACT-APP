import { useState } from "react";

/* eslint-disable react/prop-types */

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies] = useState(tempMovieData);
  const [watched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <Search />
        <Numresults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return (
    <nav className=" grid grid-rows-3 grid-flow-col sm:flex items-center justify-center sm:justify-between py-6 bg-stone-400 font-bold text-center">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex flex-shrink-0 my-1  items-center">
      <span className="sm:mx-3 mr-4 text-3xl" role="img">
        🎬
      </span>
      <h1 className="text-5xl sm:text-4xl">React Movies</h1>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="text-2xl sm:flex items-center border py-1 px-2 rounded text-grey-darkest cursor-pointer text-center bg-stone-300"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Numresults({ movies }) {
  return (
    <p className="sm:flex gap-2 text-1xl sm:mx-3">
      Found {movies.length} results
    </p>
  );
}

function Main({ children }) {
  return (
    <main className="sm:flex gap-[2.4rem] sm:justify-center bg-slate-900 h-screen ">
      {children}
    </main>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className=" bg-slate-800 sm:w-[42rem] sm:max-w-[42rem] rounded-xl sm:mt-10 relative ">
      <button
        className=" absolute top-[0.8rem] right-[0.8rem] h-[2.4rem] z-[999] aspect-[1] rounded-full bg-stone-300 font-bold cursor-pointer"
        onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// function WatchedBox() {
//   const [watched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="rounded-xl bg-slate-800 sm:w-[42rem] sm:max-w-[42rem] sm:mt-10 relative ">
//       <button
//         className="absolute top-[0.8rem] right-[0.8rem] h-[2.4rem] z-[999] aspect-[1] rounded-full bg-stone-300 font-bold cursor-pointer"
//         onClick={() => setIsOpen2((open) => !open)}>
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

function MovieList({ movies }) {
  return (
    <ul className="list-none p-[0.8rem] cursor-pointer">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li className="relative grid grid-rows-[auto_auto] grid-cols-[4rem_1fr] items-center  p-4 text-stone-300 cursor-pointer  hover:bg-stone-400">
      <img
        className=" w-[100%] pr-4 row-span-full"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3 className="text-[1.8rem]">{movie.Title}</h3>
      <div className=" flex items-center gap-[2.4rem]">
        <p className="flex items-center gap-[0.8rem]">
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="bg-slate-600 rounded text-[1.4rem] leading-[1.4] p-4 text-stone-300">
      <h2>Movies you watched</h2>
      <div className="flex gap-4 ">
        <p>
          <span>🎥 </span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️ </span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>✨ </span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⌚️ </span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list-none p-[0.8rem] cursor-pointer">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li className="relative grid grid-rows-[auto_auto] grid-cols-[4rem_1fr] items-center  p-4 text-stone-300 cursor-pointer  hover:bg-stone-400">
      <img
        className="w-[100%] pr-4 row-span-full"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3 className="text-[1.8rem]">{movie.Title}</h3>
      <div className="flex items-center gap-[0.8rem]">
        <p className="flex items-center gap-[0.8rem]">
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>✨</span>
          <span>{movie.userRating}</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>⌚️</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
