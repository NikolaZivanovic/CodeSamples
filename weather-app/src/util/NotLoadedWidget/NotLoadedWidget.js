import React from "react";
import styles from "./NotLoadedWidget.scss";

const NotLoadedWidget = () => {
  return (
    <aside className={styles.NotLoadedWidgetWrapper}>
      <div className={styles.NotLoadedWidget}>
        <h6 className={styles.NotLoadedWidget__title}>Not Loaded</h6>
        <p>Widget is not loaded.</p>
        <p>Please refresh the page.</p>

        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
          className={["btn btn--link", styles.NotLoadedWidget__refreshBtn].join(
            " "
          )}
        >
          Reload
        </button>
      </div>
    </aside>
  );
};

export default NotLoadedWidget;
