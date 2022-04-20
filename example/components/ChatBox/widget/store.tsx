import React, { createContext, useEffect, useState } from "react";

interface IChatBoxContext {
  showOnInitial: boolean;
  isModalShow: boolean;
  onModalShow: (state: boolean) => void;

  chat: string[];
  message: string;
  onChangeMessage: (message: string) => void;
  onSendMessage: () => void;
}

const defaultState = {
  showOnInitial: false,
} as IChatBoxContext;

const ChatBoxContext = createContext<IChatBoxContext>(defaultState);

export function ChatBoxProvider({
  children,
  showOnInitial,
}: {
  children: any;
  showOnInitial: boolean;
}) {
  const initialID = "visitor";

  const [UID, setUID] = useState(initialID);
  const [chatInitiated, setChatInitiated] = useState(false);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const [isModalShow, setIsModalShow] = useState(showOnInitial);

  async function fetchList(id = UID) {
    const response = await fetch(`/api/chatbox/chat/${id}`, { method: "GET" });
    const data = await response.json();
    setChat(data.chatData);
  }

  const onSendMessage = async () => {
    try {
      let id = UID;

      if (!chatInitiated) {
        id = new Date().getTime().toString();

        const initResponse = await fetch(`/api/chatbox/slack/${id}`, {
          method: "POST",
        });

        if (initResponse.status !== 200) {
          throw new Error("Failed to init chat");
        }

        setChatInitiated(true);
        setUID(id);
      }

      let replyText = "i:" + message;

      const replyResponse = await fetch(`/api/chatbox/chat/${id}`, {
        method: "POST",
        body: JSON.stringify({ text: replyText }),
      });

      if (replyResponse.status !== 200) {
        throw new Error("Failed to reply");
      }

      await fetchList(id);
      return setMessage("");
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

  useEffect(() => {
    if (!chatInitiated || !isModalShow) return;

    const interval = setInterval(() => {
      fetchList();
    }, 3000);

    return () => clearInterval(interval);
  }, [chatInitiated, isModalShow]);

  return (
    <ChatBoxContext.Provider
      value={{
        showOnInitial,

        isModalShow,
        onModalShow,

        chat,
        message,
        onChangeMessage,
        onSendMessage,
      }}
    >
      {children}
    </ChatBoxContext.Provider>
  );
}

export default ChatBoxContext;
