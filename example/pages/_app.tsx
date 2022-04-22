import "../styles/globals.css";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";

const ChatBoxWidget = dynamic({
  loader: () => import("components/Widget"),
  ssr: false,
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <div>
      <ChatBoxWidget />
      <Component {...pageProps} />
    </div>
  );
}
