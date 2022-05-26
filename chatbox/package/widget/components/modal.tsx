import React, { useContext } from "react";
import FeedbackContext from "../store";
import Form from "../../shared/form";
import Chat from "../../shared/chat";
import Header from "./header";

export default function Modal() {
  const { isModalShow, chat, message, setMessage, onSendMessage, onSendEmail } =
    useContext(FeedbackContext);

  if (!isModalShow) return null;

  return (
    <div className="chatbox-widget-modal">
      <Header />
      <Chat chat={chat} />
      <form onSubmit={onSendEmail}>
        <input type="text" placeholder="Give your email for us to reach you and end session."></input>
      </form>

      <Form
        message={message}
        setMessage={setMessage}
        onSendMessage={onSendMessage}
      />
    </div>
  );
}
