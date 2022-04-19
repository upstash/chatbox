import FeedbackContext from "../store";
import { useContext } from "react";

import styles from "../styles.module.css";

export default function Header() {
  const {} = useContext(FeedbackContext);

  return (
    <div className={styles.Header}>
      <h2>Hi 👋</h2>
      <p>Ask us anything, or share your feedback.</p>
    </div>
  );
}
