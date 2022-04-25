import React from "react";
import { useRouter } from "next/router";
import { ChatBoxProvider } from "./store";
import Chat from "./components/Chat";
import Form from "./components/Form";

import "./styles.scss";

export interface IChatBoxAdmin {}

export default function ChatBoxAdmin({}: IChatBoxAdmin) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ChatBoxProvider id={id as string}>
      <div className="Root">
        <div className="Grid">
          <header className="Header">
            <h1>Hi, chat id: {id}:</h1>
          </header>
          <Chat />
          <Form />
        </div>
      </div>
    </ChatBoxProvider>
  );
}
