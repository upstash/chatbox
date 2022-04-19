import Head from "next/head";
// import ChatBox from "@upstash/chatbox";
import dynamic from "next/dynamic";
const ChatBox = dynamic(() => import("components/ChatBox/widget"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChatBox showOnInitial />

      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa
          dolore doloremque enim expedita, laborum maxime nostrum nulla,
          pariatur quis quisquam quo, rem sapiente sed sequi tempora veritatis
          voluptate voluptatum.
        </p>
      </div>
    </div>
  );
}
