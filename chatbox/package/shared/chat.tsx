import React from "react";
import Email from "../widget/components/email";

interface IChatBoxAdminChat {
  chat: string[];
  emailForm?: boolean;
}

export default function Chat({ chat, emailForm = false }: IChatBoxAdminChat) {
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

    const Message = () => (
      <div key={index} className={`chatbox-chat-message ${classNames}`}>
        <span>{parsedStr[1]}</span>
      </div>
    );

    if (emailForm && index === 0) {
      return (
        <div key={index}>
          <Message />
          <Email />
        </div>
      );
    }

    return <Message />;
  });

  return <div className="chatbox-chat">{Messages}</div>;
}
