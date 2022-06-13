import React, { useContext } from "react";
import FeedbackContext from "../store";
import IconDefault from "./icon-default";
import IconClose from "./icon-close";

export default function TriggerButton({
  children,
}: {
  children?: React.ReactElement;
}) {
  const { isModalShow, onModalShow } = useContext(FeedbackContext);

  return (
    <button
      type="button"
      className="chatbox-widget-trigger-button"
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
