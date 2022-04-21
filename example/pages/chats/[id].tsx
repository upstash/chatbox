import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ChatBoxAdmin = dynamic({
  // @ts-ignore
  loader: () => import("@upstash/chatbox").then((mod) => mod.ChatBoxAdmin),
  ssr: false,
});

export default function () {
  const router = useRouter();
  const { id } = router.query;

  return <ChatBoxAdmin id={id} />;
}
