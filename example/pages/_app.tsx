import { AppProps } from "next/app";

import "../styles/globals.css";
import "@upstash/chatbox/dist/style.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
}
