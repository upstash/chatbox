import FeedbackContext from "../store";
import React, { useContext } from "react";
import styles from "../styles.module.css";

export default function Form() {
  const { message, onChangeMessage, onSend } = useContext(FeedbackContext);

  return (
    <form
      className={styles.Form}
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
    >
      <input
        required
        name="message"
        placeholder="Write a message..."
        className={styles.FormMessage}
        value={message}
        onChange={(event) => onChangeMessage(event.target.value)}
      />

      <div>
        <button className={styles.FormSubmit} type="submit">
          Send
        </button>
      </div>
    </form>
  );
}
