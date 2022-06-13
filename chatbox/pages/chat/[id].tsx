import dynamic from "next/dynamic";

const ChatBoxAdmin = dynamic({
  loader: () => import("../../components/admin/index"),
  ssr: false,
});

export default function () {
  return <ChatBoxAdmin />;
}
