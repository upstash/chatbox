import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Chatbox from "components/chatbox";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;

  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetchList();
    }, 2000);
    return () => clearInterval(interval);
  });

  const fetchList = async () => {
    const response = await fetch(`/api/chat/${id}`, { method: "GET" });
    const data = await response.json();
    setChat(data.chatData);
  };

  const writeToChat = async () => {
    let replyText = "o:" + text;

    const response = await fetch(`/api/chat/${id}`, {
      method: "POST",
      body: JSON.stringify({ text: replyText }),
    });

    await fetchList();
    return setText("");
  };

  return (
    <div>
      <h2>Hi, chat id: {id}:</h2>

      <Chatbox chat={chat}></Chatbox>

      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          writeToChat();
        }}
      >
        <input
          value={text}
          placeholder="Type your message here."
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">Click!</button>
      </form>
    </div>
  );
}
