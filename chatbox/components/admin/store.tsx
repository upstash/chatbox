import React, { createContext, useEffect, useState } from "react";

interface IChatBoxContext {
  id: string;
  isChatTrigger: number;
  chat: string[];
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
}

const defaultState = {} as IChatBoxContext;

const ChatBoxContext = createContext<IChatBoxContext>(defaultState);

export function ChatBoxProvider({
  children,
  id,
}: {
  children: any;
  id: string;
}) {
  const [isChatTrigger, setIsChatTrigger] = useState(performance.now());
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  async function fetchList() {
    const response = await fetch(`/api/chatbox/chat/${id}`, { method: "GET" });
    const data = await response.json();
    setChat(data.chatData);
  }

  const onSendMessage = async () => {
    let replyText = "o:" + message;

    await fetch(`/api/chatbox/chat/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: replyText }),
    });

    await fetchList();
    setIsChatTrigger(performance.now());
    setMessage("");
  };

  useEffect(() => {
    if (!id) return;

    fetchList();
    setTimeout(() => {
      setIsChatTrigger(performance.now());
    }, 100);

    const interval = setInterval(() => {
      fetchList();
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <ChatBoxContext.Provider
      value={{
        id,
        isChatTrigger,
        chat,
        message,
        setMessage,
        onSendMessage,
      }}
    >
      {children}
    </ChatBoxContext.Provider>
  );
}

export default ChatBoxContext;
