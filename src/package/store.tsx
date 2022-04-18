import React, { createContext, useState } from "react";

const defaultState = {
  themeColor: "",
  textColor: "",
  showOnInitial: false,

  isModalShow: false,
  onModalShow: (state: boolean) => {},

  message: "",
  onChangeMessage: (message: string) => {},
  onSend: () => {},
};

const ChatboxContext = createContext(defaultState);

export function ChatboxProvider({
  children,
  themeColor,
  textColor,
  showOnInitial,
}: {
  children: React.ReactElement;
  themeColor: string;
  textColor: string;
  showOnInitial: boolean;
}) {
  const [isModalShow, setIsModalShow] = useState(showOnInitial);

  const [message, setMessage] = useState("");

  const onSend = async () => {
    try {
      await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message,
        }),
      });
      setMessage("");
    } catch (err) {
      alert(err);
    }
  };

  const onModalShow = (status: boolean) => {
    setIsModalShow(status);
  };

  const onChangeMessage = (value: string) => {
    setMessage(value);
  };

  return (
    <ChatboxContext.Provider
      value={{
        themeColor,
        textColor,
        showOnInitial,

        isModalShow,
        onModalShow,

        message,
        onChangeMessage,
        onSend,
      }}
    >
      {children}
    </ChatboxContext.Provider>
  );
}

export default ChatboxContext;
