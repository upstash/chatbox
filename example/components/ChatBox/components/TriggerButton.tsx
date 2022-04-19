import { useContext } from "react";
import FeedbackContext from "../store";
import IconDefault from "./IconDefault";
import IconClose from "./IconClose";

import styles from "../styles.module.css";

export default function TriggerButton({
  children,
}: {
  children?: React.ReactElement;
}) {
  const { isModalShow, onModalShow } = useContext(FeedbackContext);

  return (
    <button
      type="button"
      className={styles.TriggerButton}
      onClick={() => {
        onModalShow(!isModalShow);
      }}
    >
      {isModalShow ? (
        <>
          <IconClose size={30} />
        </>
      ) : (
        <>{children ? children : <IconDefault />}</>
      )}
    </button>
  );
}
