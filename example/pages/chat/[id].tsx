import dynamic from "next/dynamic";

const ChatBoxAdmin = dynamic({
  loader: () => import("@upstash/chatbox/admin"),
  ssr: false,
});

export default function () {
  return <ChatBoxAdmin />;
}
