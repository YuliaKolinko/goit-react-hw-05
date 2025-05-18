import css from "./App.module.css";
// import { useEffect, useState } from "react";
// import SearchBar from "./components/SearchBar/SearchBar";
import { Routes, Route } from "react-router-dom";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

import Header from "./components/Header/Header";
// import MovieDetails from "./components/MovieDetails/MovieDetails";
// import HomePage from "./pages/HomePage/HomePage";
// import MoviePage from "./pages/MoviesPage/MoviesPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MovieList from "./components/MovieList/MovieList";
import { lazy, Suspense } from "react";

const LazyMovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const LazyMovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className={css.container}>
      <Header />
      <Suspense fallback={null}>
        <MovieList />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<LazyMovieCast />} />
            <Route path="reviews" element={<LazyMovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
