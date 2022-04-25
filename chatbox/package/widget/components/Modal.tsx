import FeedbackContext from "../store";
import React, { useContext } from "react";
import Form from "./Form";
import Chat from "./Chat";
import Header from "./Header";

export default function Modal() {
  const { isModalShow } = useContext(FeedbackContext);

  if (!isModalShow) return null;

  return (
    <div className="chatbox-widget-modal">
      <Header />
      <Chat />
      <Form />
    </div>
  );
}
