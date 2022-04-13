import FeedbackContext from "../store";
import React, { useContext } from "react";
import styles from "../styles.module.css";

export default function Chat() {
  const {} = useContext(FeedbackContext);

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatMessageIn}>
        <span>hi</span>
      </div>
      <div className={styles.ChatMessageIn}>
        <span>hi</span>
      </div>
      <div className={styles.ChatMessageOut}>
        <span>hi</span>
      </div>
      <div className={styles.ChatMessageIn}>
        <span>hi</span>
      </div>
      <div className={styles.ChatMessageOut}>
        <span>hi</span>
      </div>
      <div className={styles.ChatMessageOut}>
        <span>hi</span>
      </div>
    </div>
  );
}
