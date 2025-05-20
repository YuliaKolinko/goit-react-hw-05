import css from "./App.module.css";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

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
