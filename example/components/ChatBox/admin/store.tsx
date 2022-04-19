import { createContext, useEffect, useState } from "react";

interface IChatBoxContext {
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
      body: JSON.stringify({ text: replyText }),
    });

    await fetchList();
    return setMessage("");
  };

  useEffect(() => {
    if (!id) return;

    fetchList();

    const interval = setInterval(() => {
      fetchList();
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <ChatBoxContext.Provider
      value={{
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
