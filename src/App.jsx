import css from "./App.module.css";
// import { useEffect, useState } from "react";
// import SearchBar from "./components/SearchBar/SearchBar";
import { Routes, Route } from "react-router-dom";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviesPage/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MovieList from "./components/MovieList/MovieList";

function App() {
  return (
    <div className={css.container}>
      <Header />
      <MovieList />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
