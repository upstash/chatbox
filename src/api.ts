import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const webhook = process.env.SLACK_WEBHOOK as string;
const domain = process.env.DOMAIN as string;

export default async function handler(req: any, res: any) {
  const method = req.method;

  const api = req.query.chatbox[0];
  const chatId = req.query.chatbox[1];

  if (!chatId) return res.status(400).json({ message: "Bad Request" });

  switch (api) {
    case "chat":
      switch (method) {
        // GET: /chat/[id]
        case "GET":
          const data = await redis.lrange(chatId, 0, 2 ** 32 - 1);
          return res.status(200).json({ chatData: data });

        // POST: /chat/[id]
        case "POST":
          const { text } = JSON.parse(req.body);

          const response = await redis.rpush(chatId, text);
          return res.status(200).json({ response });

        default:
          return res.status(405).json({ message: "Method Not Allowed" });
      }

    case "slack":
      switch (method) {
        // POST: /slack/[id]
        case "POST":
          const text = `New chat with id: ${domain}/chats/${chatId}`;

          const response = await fetch(webhook, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ text }),
          });

          return res.status(200).json({ response });

        default:
          return res.status(405).json({ message: "Method Not Allowed" });
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
