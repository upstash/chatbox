import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(
  req: any,
  res: any,
  options: { webhooks: string[] }
) {
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
          const text = `New chat with id: ${process.env.DOMAIN}/chats/${chatId}`;

          const requests = options.webhooks.map(async (webhook) => {
            return fetch(webhook, {
              method: "POST",
              body: JSON.stringify({ text }),
              headers: { "Content-Type": "application/json" },
            });
          });

          await Promise.all(requests);

          return res.status(200).json({ response: "ok" });

        default:
          return res.status(405).json({ message: "Method Not Allowed" });
      }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
