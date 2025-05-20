import styles from "./MovieCast.module.css";
import { getMovieCast } from "../../MoviesApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export default function MovieCast() {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultImg = `data:image/svg+xml;utf8,%3Csvg%20width%3D%22250%22%20height%3D%22375%22%20viewBox%3D%220%200%20250%20375%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22250%22%20height%3D%22375%22%20rx%3D%2220%22%20fill%3D%22rgba(5%2C%2066%2C%2066%2C%200.329)%22%20/%3E%3Cpath%20d%3D%22M125%20100a35%2035%200%201%200%200.001-70A35%2035%200%200%200%20125%20100zm0%2025c-29%200-60%2015-60%2045v35h120v-35c0-30-31-45-60-45z%22%20fill%3D%22rgb(4%2C%2049%2C%2049)%22%20/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%22320%22%20text-anchor%3D%22middle%22%20fill%3D%22rgb(4%2C%2049%2C%2049)%22%20font-size%3D%2218%22%20font-family%3D%22Arial%2C%20sans-serif%22%3ENo%20Image%20Available%3C/text%3E%3C/svg%3E`;

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
      {loading && (
        <div className={styles.loaderWrapper}>
          <BeatLoader color="#043131" />
        </div>
      )}
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
                    : defaultImg
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
