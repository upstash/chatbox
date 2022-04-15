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
      <div className={styles.ChatMessageBot}>
        <span>
          Don't have time to wait for a response? Leave your email and we'll be
          in touch as soon as possible.
        </span>
      </div>
      <div className={styles.ChatMessageIn}>
        <span>ademilter@gmail.com</span>
      </div>
      <div className={styles.ChatMessageOut}>
        <span>123</span>
      </div>
      <div className={styles.ChatMessageOut}>
        <span>fsdfsdf</span>
      </div>
    </div>
  );
}
