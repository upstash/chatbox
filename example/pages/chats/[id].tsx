import { useRouter } from "next/router";
import { ChatBoxAdmin } from "@upstash/chatbox";

export default function () {
  const router = useRouter();
  const { id } = router.query;

  return <ChatBoxAdmin children={<div></div>} id={id as string} />;
}
