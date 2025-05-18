import styles from "./MovieDetails.module.css";
import { Link } from "react-router-dom";

export default function MovieDetails({ movie }) {
  return (
    <div className={styles.container}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className={styles.poster}
      />
      <h2 className={styles.title}>
        {movie.title} ({" "}
        {movie.release_date ? movie.release_date.slice(0, 4) : "No"} )
      </h2>
      <p className={styles.rating}>
        Rating: {movie.vote_average ? movie.vote_average : "No rating"}
      </p>
      <p className={styles.genres}>
        Genres:{" "}
        {movie.genres.map((genre) => genre.name).join(", ") || "No genres"}
      </p>
    </div>
  );
}
