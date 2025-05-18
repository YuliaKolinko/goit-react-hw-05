import styles from "./MovieList.module.css";
import { useLocation, Link } from "react-router-dom";

export default function MovieList({ movies = [] }) {
  const location = useLocation();
  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <img
            className={styles.img}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
          />
          <div className={styles.movieInfo}>
            <Link
              to={`/movies/${movie.id}`}
              className={styles.movieLink}
              state={{ from: location }}
            >
              <h2 className={styles.movieTitle}>{movie.title}</h2>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
