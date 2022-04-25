import "../styles/globals.css";
import "@upstash/chatbox/index.css";

import { AppProps } from "next/app";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
