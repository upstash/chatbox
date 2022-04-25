import dynamic from "next/dynamic";

const ChatBoxAdmin = dynamic({
  // @ts-ignore
  loader: () => import("@upstash/chatbox").then((mod) => mod.ChatBoxAdmin),
  ssr: false,
});

export default function () {
  return <ChatBoxAdmin />;
}
