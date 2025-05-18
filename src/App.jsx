import css from "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "./images-api.js";
import ModalComponent from "./components/ImageModal/Modal.jsx";
import ErrorMessage from "./components/ErrorMeaasge/ErrorMessage.jsx";
import { BeatLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchImage, setSearchImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };
  const handleImageClick = (image) => {
    openModal(image);
  };
  useEffect(() => {
    if (searchImage === "") {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(searchImage, currentPage);
        if (data.images.length === 0) {
          setError(true);
          return;
        }
        if (currentPage === 1) {
          setImages(data.images);
        } else {
          setImages((prevImages) => [...prevImages, ...data.images]);
        }

        setTotal(data.total);
      } catch (error) {
        setError(true);
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchImage, currentPage]);

  const handleSearch = async (query) => {
    setSearchImage(query);
    setCurrentPage(1);
    setError(false);
  };
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}

      {!error && (
        <>
          {loading && currentPage === 1 ? (
            <div className={css.loaderContainer}>
              <BeatLoader color="#132c20" size={50} />
            </div>
          ) : images.length > 0 ? (
            <ImageGallery imagesData={images} onImageClick={handleImageClick} />
          ) : null}

          {images.length > 0 && images.length < total && !loading && (
            <LoadMoreBtn onClick={nextPage} />
          )}

          {loading && currentPage > 1 && (
            <div className={css.loaderContainer}>
              <BeatLoader color="#132c20" size={30} />
            </div>
          )}
        </>
      )}
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
export default App;
