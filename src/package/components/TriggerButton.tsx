import React, { useContext } from "react";
import FeedbackContext from "../store";
import IconDefault from "./IconDefault";
import styles from "../styles.module.css";
import IconClose from "./IconClose";

export default function TriggerButton({
  children,
}: {
  children?: React.ReactElement;
}) {
  const { isModalShow, onModalShow, textColor } = useContext(FeedbackContext);

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
          <IconClose color={textColor} size={30} />
        </>
      ) : (
        <>{children ? children : <IconDefault color={textColor} />}</>
      )}
    </button>
  );
}
