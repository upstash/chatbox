import React, { useContext } from "react";
import FeedbackContext from "../store";
// import TextareaAutosize from "react-textarea-autosize";

import styles from "../styles.module.css";

interface IChatBoxAdminForm {}

export default function Form(props: IChatBoxAdminForm) {
  const { message, onChangeMessage, onSendMessage } =
    useContext(FeedbackContext);

  return (
    <form
      className={styles.Form}
      onSubmit={(e) => {
        e.preventDefault();
        onSendMessage();
      }}
    >
      {/*<TextareaAutosize
        autoFocus
        required
        name="message"
        placeholder="Write a message..."
        className={"styles.FormMessage"}
        maxRows={5}
        value={message}
        onChange={(event) => onChangeMessage(event.target.value)}
      />*/}
      <input
        required
        name="message"
        placeholder="Write a message..."
        className={styles.FormMessage}
        value={message}
        onChange={(event) => onChangeMessage(event.target.value)}
      />

      <div>
        <button type="submit" className={styles.FormSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-send"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#666"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="10" y1="14" x2="21" y2="3" />
            <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
