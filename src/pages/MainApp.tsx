import React, { useEffect, useRef, useState } from "react";
import styles from "./MainApp.module.css";
import Card from "../components/Card/Card";
import ImageOverlay from "../components/ImageOverlay/ImageOverlay";
import Loader from "../components/Loader/Loader";
import { apiGet } from "../helpers/apis";

const CAT_URL = "/api/catsList";
const TIME_RELOAD = 5000;

type CAT_PROP = {
  type: string;
  title: string;
  position: number;
  thumbnail: string;
};
const MainApp: React.FC = () => {
  const dragItem = useRef<number>(0);
  const dragOverItem = useRef<number>(0);
  const initialCatList = useRef<CAT_PROP[]>([]);
  const currentCatList = useRef<CAT_PROP[]>([]);

  const [catList, setCatList] = useState<CAT_PROP[]>([]);
  const [showImageOverlay, setShowImageOverlay] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getCats();
  }, []);

  //
  useEffect(() => {
    const timer = setTimeout(() => {
      checkCatListChanges();

      setCount((prevCount) => prevCount + 1);
    }, TIME_RELOAD);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [count]);

  const getCats = async () => {
    const { response, error } = await apiGet<any>(CAT_URL, setLoading);
    if (response && response.data) {
      setCatList(response.data);
      initialCatList.current = response.data;
      currentCatList.current = response.data;
    } else {
      error && setError(error);
    }
    setLoading(false);
  };

  const checkCatListChanges = () => {
    if (
      JSON.stringify(currentCatList.current) !==
      JSON.stringify(initialCatList.current)
    ) {
      getCats();
    }
  };

  const handleCardClick = (thumbnail: string) => {
    setSelectedImage(thumbnail);
    setShowImageOverlay(true);
  };

  const handleCloseImageOverlay = () => {
    setShowImageOverlay(false);
  };

  const handleDrop = () => {
    const itemClone = [...catList];
    const temporary = itemClone[dragItem.current];
    itemClone[dragItem.current] = itemClone[dragOverItem.current];
    itemClone[dragOverItem.current] = temporary;
    setCatList(itemClone);
    currentCatList.current = itemClone;
  };

  const CardContainer = (cat: CAT_PROP, index: number) => {
    return (
      <div
        className={styles.cardContainer}
        draggable
        onDragStart={() => (dragItem.current = index)}
        onDragEnter={() => (dragOverItem.current = index)}
        onDragEnd={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        key={index}
        onClick={() => handleCardClick(cat.thumbnail)}
      >
        <Card title={cat.title} thumbnail={cat.thumbnail} index={index} />
      </div>
    );
  };

  if (error) {
    return (
      <div className={styles.cardWrapper}>There is error retrieving data</div>
    );
  }

  return (
    <>
      {loading ? (
        <div className={styles.loadWrapper}>
          <Loader text="Getting Data" />
        </div>
      ) : (
        <div className={styles.cardWrapper}>
          {catList.map((i, index) => {
            return CardContainer(i, index);
          })}
          {showImageOverlay && (
            <ImageOverlay
              imageThumbnail={selectedImage}
              onClose={handleCloseImageOverlay}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MainApp;
