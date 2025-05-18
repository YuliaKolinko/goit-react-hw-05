import css from "./Modal.module.css";
import Modal from "react-modal";
export default function ModalComponent({ isOpen, onRequestClose, image }) {
  if (!image) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      closeTimeoutMS={300}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={css.image}
      />
    </Modal>
  );
}
