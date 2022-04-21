import FeedbackContext from "../store";
import { useContext } from "react";
import Form from "./Form";
import Chat from "./Chat";
import Header from "./Header";

import styles from "../styles.module.css";

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
