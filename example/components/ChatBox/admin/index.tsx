import React from "react";
import { useRouter } from "next/router";
import { ChatBoxProvider } from "./store";
import Chat from "./components/Chat";
import Form from "./components/Form";

import styles from "./styles.module.css";

type Props = React.PropsWithChildren<any> & {};

export default function ChatBox({}: Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ChatBoxProvider id={id as string}>
      <div className={styles.Root}>
        <div className={styles.Grid}>
          <header className={styles.Header}>
            <h1>Hi, chat id: {id}:</h1>
          </header>
          <Chat />
          <Form />
        </div>
      </div>
    </ChatBoxProvider>
  );
}
