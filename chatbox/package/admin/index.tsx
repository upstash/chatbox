import React from "react";
import { useRouter } from "next/router";
import { ChatBoxProvider } from "./store";
import Chat from "./components/chat";
import Form from "./components/form";

export interface IChatBoxAdmin {}

export default function ChatBoxAdmin({}: IChatBoxAdmin) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ChatBoxProvider id={id as string}>
      <div className="chatbox">
        <div className="chatbox-admin-root">
          <div className="chatbox-admin-grid">
            <header className="chatbox-admin-header">
              <h1>Hi, chat id: {id}:</h1>
            </header>
            <Chat />
            <Form />
          </div>
        </div>
      </div>
    </ChatBoxProvider>
  );
}
