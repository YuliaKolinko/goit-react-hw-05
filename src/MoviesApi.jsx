import axios from "axios";
const URL = "https://api.themoviedb.org/3";
const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export const getMoviesList = async () => {
  const { data } = await axios.get(
    `${URL}/trending/movie/day?language=en-US`,

    options
  );
  return data.results;
};
export const getMovieDetails = async (movieId) => {
  const { data } = await axios.get(
    `${URL}/movie/${movieId}?language=en-US`,
    options
  );
  return data;
};
export const getMovieCast = async (movieId) => {
  const { data } = await axios.get(
    `${URL}/movie/${movieId}/credits?language=en-US`,
    options
  );
  return data.cast;
};
export const getMovieReviews = async (movieId) => {
  const { data } = await axios.get(
    `${URL}/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return data.results;
};
export const getMovieByQuery = async (query) => {
  const { data } = await axios.get(`${URL}/search/movie`, {
    ...options,
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return data.results;
};
