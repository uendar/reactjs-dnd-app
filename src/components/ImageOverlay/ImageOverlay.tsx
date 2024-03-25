import React, { useEffect } from "react";
import styles from "./ImageOverlay.module.css";

type ImageOverlayProps = {
  imageThumbnail: string;
  onClose: () => void;
};

const ImageOverlay: React.FC<ImageOverlayProps> = ({
  imageThumbnail,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.imageOverlay} onClick={onClose}>
      <div className={styles.imageContainer} onClick={handleClick}>
        <img src={imageThumbnail} alt="" />
      </div>
    </div>
  );
};

export default ImageOverlay;
