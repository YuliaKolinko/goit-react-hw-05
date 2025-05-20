import styles from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getMovieByQuery } from "../../MoviesApi";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";

import { BeatLoader } from "react-spinners";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    if (newQuery !== "") {
      setSearchParams({ query: newQuery });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    if (!debouncedQuery.trim() === "") {
      setMovies([]);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    getMovieByQuery(debouncedQuery)
      .then((results) => {
        setMovies(results);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedQuery]);

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {loading && (
        <div className={styles.loaderWrapper}>
          <BeatLoader color="#043131" />
        </div>
      )}
      {error && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
