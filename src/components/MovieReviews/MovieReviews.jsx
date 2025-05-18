import styles from "./MovieReviews.module.css";
import { getMovieReviews } from "../../MoviesApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(false);
    getMovieReviews(movieId)
      .then((data) => setReviews(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && (
        <p className={styles.error}>Something went wrong: {error.message}</p>
      )}
      {!loading && !error && reviews.length === 0 && (
        <p className={styles.noReviews}>No reviews found</p>
      )}
      {!loading && !error && reviews.length > 0 && (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h3 className={styles.author}>{review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
