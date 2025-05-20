import styles from "./MovieList.module.css";
import { useLocation, Link } from "react-router-dom";

export default function MovieList({ movies = [] }) {
  const location = useLocation();
  const defaultImg = `data:image/svg+xml;utf8,%3Csvg%20width%3D%22250%22%20height%3D%22375%22%20viewBox%3D%220%200%20250%20375%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22250%22%20height%3D%22375%22%20rx%3D%2220%22%20fill%3D%22rgba(5%2C%2066%2C%2066%2C%200.329)%22%20/%3E%3Cpath%20d%3D%22M125%20100a35%2035%200%201%200%200.001-70A35%2035%200%200%200%20125%20100zm0%2025c-29%200-60%2015-60%2045v35h120v-35c0-30-31-45-60-45z%22%20fill%3D%22rgb(4%2C%2049%2C%2049)%22%20/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%22320%22%20text-anchor%3D%22middle%22%20fill%3D%22rgb(4%2C%2049%2C%2049)%22%20font-size%3D%2218%22%20font-family%3D%22Arial%2C%20sans-serif%22%3ENo%20Image%20Available%3C/text%3E%3C/svg%3E`;

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <img
            className={styles.img}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
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
