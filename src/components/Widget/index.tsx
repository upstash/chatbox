import React from "react";
import Modal from "./components/Modal";
import TriggerButton from "./components/TriggerButton";
import { ChatBoxProvider } from "./store";

import "./styles.scss";

export interface IChatBoxWidget {
  themeColor?: string;
  textColor?: string;
  autoMessage?: null | string | React.ReactElement;
  title?: null | string | React.ReactElement;
  description?: null | string | React.ReactElement;
  showOnInitial?: boolean;
  children?: React.ReactElement;
}

export default function ChatBox({
  themeColor = "#2d00c6",
  textColor = "#fff",
  showOnInitial = false,
}: IChatBoxWidget) {
  return (
    <ChatBoxProvider showOnInitial={showOnInitial}>
      <div
        className="ChatBox"
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
