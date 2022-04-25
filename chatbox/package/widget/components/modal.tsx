import FeedbackContext from "../store";
import React, { useContext } from "react";
import Form from "./form";
import Chat from "./chat";
import Header from "./header";

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
