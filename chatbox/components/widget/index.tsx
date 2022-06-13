import React from "react";
import Modal from "./components/modal";
import TriggerButton from "./components/trigger-button";
import { ChatBoxProvider } from "./store";

// import "../styles.css";

export interface IChatBoxWidget {
  themeColor?: string;
  textColor?: string;
  autoMessage?: string;
  title?: string;
  description?: string;
  showOnInitial?: boolean;
  customIcon?: React.ReactElement;
}

export default function ChatBox({
  themeColor = "#2d00c6",
  textColor = "#fff",
  autoMessage,
  title,
  description,
  showOnInitial = false,
  customIcon,
}: IChatBoxWidget) {
  return (
    <ChatBoxProvider
      themeColor={themeColor}
      textColor={textColor}
      autoMessage={autoMessage}
      title={title}
      description={description}
      showOnInitial={showOnInitial}
    >
      <div
        className="chatbox"
        style={{
          // @ts-ignore
          "--color-primary": themeColor,
          "--color-text": textColor,
        }}
      >
        <div className="chatbox-widget-root">
          <TriggerButton>{customIcon}</TriggerButton>
          <Modal />
        </div>
      </div>
    </ChatBoxProvider>
  );
}
