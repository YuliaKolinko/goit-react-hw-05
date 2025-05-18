import css from "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <div className={css.container}>
      <Header {...props} />
      <MovieCast {...props} />
      <MovieReviews {...props} />
      <Navigation {...props} />
      <MovieDetails {...props} />
    </div>
  );
}
export default App;
