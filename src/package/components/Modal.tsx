import FeedbackContext from "../store";
import React, { useContext } from "react";
import styles from "../styles.module.css";
import Form from "./Form";
import Chat from "./Chat";
import Header from "./Header";

export default function Modal() {
  const { isModalShow } = useContext(FeedbackContext);

  if (!isModalShow) return null;

  return (
    <div className={styles.Modal}>
      <Header />
      <Chat />
      <Form />
    </div>
  );
}
