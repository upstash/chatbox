import React, { useContext } from "react";
import FeedbackContext from "../store";

interface IChatBoxAdminChat {}

export default function Chat(props: IChatBoxAdminChat) {
  const { chat } = useContext(FeedbackContext);

  function parseString(str: string) {
    let sender = str.substring(0, 1);
    let message = str.substring(2);
    return [sender, message];
  }

  const Messages = chat.map((item, index) => {
    const parsedStr = parseString(item);
    const isIn = parsedStr[0] === "i";
    const classNames = isIn
      ? "chatbox-chat-message-in"
      : "chatbox-chat-message-out";

    return (
      <div key={index} className={`chatbox-chat-message ${classNames}`}>
        <span>{parsedStr[1]}</span>
      </div>
    );
  });

  return <div className="chatbox-chat">{Messages}</div>;
}
