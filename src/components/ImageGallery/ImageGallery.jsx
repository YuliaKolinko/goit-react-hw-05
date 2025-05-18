import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
export default function ImageGallery({ imagesData, onImageClick }) {
  return (
    <>
      <ul className={css.imageGallery}>
        {imagesData.map((image) => (
          <li key={image.id} className={css.imageCard}>
            <ImageCard imageData={image} onClick={() => onImageClick(image)} />
          </li>
        ))}
      </ul>
    </>
  );
}
