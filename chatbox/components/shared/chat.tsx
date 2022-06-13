import React, { useEffect, useRef } from "react";
import Email from "../widget/components/email";

interface IChatBoxAdminChat {
  chat: string[];
  emailForm?: boolean;
  isChatTrigger: number;
}

export default function Chat({
  isChatTrigger,
  chat,
  emailForm = false,
}: IChatBoxAdminChat) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;
    chatContainerRef.current.scrollTo({
      behavior: "smooth",
      top: 99999,
    });
  }, [isChatTrigger]);

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
      <div className={`chatbox-chat-message ${classNames}`}>
        <span>{parsedStr[1]}</span>
      </div>
    );

    if (emailForm && index === 0) {
      return (
        <div key={9999}>
          <Message />
          <Email />
        </div>
      );
    }

    return (
      <div key={index}>
        <Message />
      </div>
    );
  });

  return (
    <div className="chatbox-chat" ref={chatContainerRef}>
      {Messages}
    </div>
  );
}
