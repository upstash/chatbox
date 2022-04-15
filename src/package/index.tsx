import React from "react";
import Modal from "./components/Modal";
import TriggerButton from "./components/TriggerButton";
import { FeedbackProvider } from "./store";
import styles from "./styles.module.css";

export default function FeedbackWidget({
  themeColor = "#2d00c6",
  textColor = "#fff",
  showOnInitial = false,
}: {
  themeColor?: string;
  textColor?: string;
  showOnInitial?: boolean;
  children?: React.ReactElement;
}) {
  return (
    <FeedbackProvider
      themeColor={themeColor}
      textColor={textColor}
      showOnInitial={showOnInitial}
    >
      <div
        className={styles.Root}
        style={{
          // @ts-ignore
          "--color-primary": themeColor,
          "--color-text": textColor,
        }}
      >
        <TriggerButton />
        <Modal />
      </div>
    </FeedbackProvider>
  );
}
