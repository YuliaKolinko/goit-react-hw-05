import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY = "dbkXD-zm5_9gR0ajWbHALgWq2Jz1IrNM1BOAq8638Yo";

export const fetchImages = async (query, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: query,
      page: currentPage,
      per_page: 12,
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  return {
    total: response.data.total,
    images: response.data.results,
  };
};
