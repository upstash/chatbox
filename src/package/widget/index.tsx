import { PropsWithChildren } from "react";
import Modal from "./components/Modal";
import TriggerButton from "./components/TriggerButton";
import { ChatBoxProvider } from "./store";

import styles from "./styles.module.css";

type Props = PropsWithChildren<any> & {
  themeColor?: string;
  textColor?: string;
  showOnInitial?: boolean;
};

export default function ChatBox({
  themeColor = "#2d00c6",
  textColor = "#fff",
  showOnInitial = false,
}: Props) {
  return (
    <ChatBoxProvider showOnInitial={showOnInitial}>
      <div
        className={styles.ChatBox}
        style={{
          // @ts-ignore
          "--color-primary": themeColor,
          "--color-text": textColor,
        }}
      >
        <TriggerButton />
        <Modal />
      </div>
    </ChatBoxProvider>
  );
}
