import Head from "next/head";
import dynamic from "next/dynamic";

const ChatBoxWidget = dynamic({
  // @ts-ignore
  loader: () => import("@upstash/chatbox/dist/widget"),
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChatBoxWidget />
    </>
  );
}
