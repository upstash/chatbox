import FeedbackContext from "../store";
import React, { useContext } from "react";
import styles from "../styles.module.css";

export default function Chat() {
  const {} = useContext(FeedbackContext);

  return (
    <div>
      <div>hi</div>
      <div>hello</div>
    </div>
  );
}
