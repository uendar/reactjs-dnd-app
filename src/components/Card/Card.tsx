import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import Loader from "../Loader/Loader";

type CardProps = {
  title: string;
  thumbnail: string;
  index: number;
};

const Card: React.FC<CardProps> = ({ title, thumbnail, index }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, (index + 1) * 300);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={styles.card} draggable>
      <span className={styles.title}>{title}</span>
      {loading ? (
        <div className={styles.cardLoaderWrapper}>
          <Loader />
        </div>
      ) : (
        <img
          src={thumbnail}
          alt={title}
          className={styles.thumbnailImage}
          draggable="false"
        />
      )}
    </div>
  );
};
export default Card;
