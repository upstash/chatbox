import React, { useContext } from "react";
import FeedbackContext from "../store";
import Form from "../../shared/form";
import Chat from "../../shared/chat";
import Header from "./header";

export default function Modal() {
  const { isModalShow, chat, message, setMessage, onSendMessage } =
    useContext(FeedbackContext);

  if (!isModalShow) return null;

  return (
    <div className="chatbox-widget-modal">
      <Header />
      <Chat chat={chat} />
      <Form
        message={message}
        setMessage={setMessage}
        onSendMessage={onSendMessage}
      />
    </div>
  );
}
