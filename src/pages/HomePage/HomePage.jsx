import styles from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { getMoviesList } from "../../MoviesApi";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getMoviesList()
      .then((data) => {
        setMovies(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.description}>Top trending movies</h2>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && (
        <p className={styles.error}>
          Something went wrong, please try again later.
        </p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
