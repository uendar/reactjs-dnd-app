import React from "react";
import styles from "./Loader.module.css";
import CircularProgress from "@mui/material/CircularProgress";

type LoaderProps = {
  text?: string;
};
const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className={styles.loaderContainer}>
      <CircularProgress />
      {text && <span className={styles.loaderText}>{text}</span>}
    </div>
  );
};
export default Loader;
