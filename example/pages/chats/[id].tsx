import dynamic from "next/dynamic";

const ChatBoxAdmin = dynamic({
  loader: () => import("components/Admin"),
  ssr: false,
});

export default function () {
  return <ChatBoxAdmin />;
}
