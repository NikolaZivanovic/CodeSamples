import React from "react";
import styles from "./Loader.scss";

const Loader = () => {
  return (
    <aside className={styles.LoaderWrapper}>
      <div className={styles.Loader}>
        <div className={styles.Loader__inner} />
      </div>
    </aside>
  );
};

export default Loader;
