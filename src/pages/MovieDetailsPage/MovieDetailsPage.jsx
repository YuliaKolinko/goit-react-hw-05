import styles from "./MovieDetailsPage.module.css";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  NavLink,
  useLocation,
} from "react-router-dom";
import { getMovieDetails } from "../../MoviesApi";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div className={styles.container}>
      <Link to={location.state?.from || "/"} className={styles.backLink}>
        ← Go back
      </Link>
      {loading && (
        <div className={styles.loaderWrapper}>
          <BeatLoader color="#043131" />
        </div>
      )}
      {error && (
        <p className={styles.error}>Something went wrong: {error.message}</p>
      )}

      {movie && <MovieDetails movie={movie} />}
      <ul className={styles.nav}>
        <li>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
            state={{ from: location.state?.from || "/" }}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
            state={{ from: location.state?.from || "/" }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
