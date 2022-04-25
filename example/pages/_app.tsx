import { AppProps } from "next/app";

import "@upstash/chatbox/index.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
