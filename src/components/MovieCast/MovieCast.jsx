import styles from "./MovieCast.module.css";
import { getMovieCast } from "../../MoviesApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(false);
    getMovieCast(movieId)
      .then((data) => setActors(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cast</h2>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && (
        <p className={styles.error}>Something went wrong: {error.message}</p>
      )}
      {!loading && !error && actors.length === 0 && (
        <p className={styles.noActors}>No actors found</p>
      )}
      {!loading && !error && actors.length > 0 && (
        <ul className={styles.castList}>
          {actors.map((actor) => (
            <li key={actor.id} className={styles.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className={styles.actorImage}
              />
              <div className={styles.actorInfo}>
                <p className={styles.actorName}>{actor.name}</p>
                <p>
                  {""}
                  <strong>Character:</strong> {actor.character}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
