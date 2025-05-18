import css from "./ImageCard.module.css";
export default function ImageCard({ imageData, onClick }) {
  return (
    <div className={css.imageCard} onClick={onClick}>
      <img
        className={css.image}
        src={imageData.urls.small}
        alt={imageData.alt_description || "Unsplash Image"}
      />
    </div>
  );
}
