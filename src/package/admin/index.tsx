import { PropsWithChildren } from "react";
import { ChatBoxProvider } from "./store";
import Chat from "./components/Chat";
import Form from "./components/Form";

import styles from "./styles.module.css";

type Props = PropsWithChildren<any> & { id: string };

export default function ChatBox({ id }: Props) {
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
