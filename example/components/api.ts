import { Redis } from "@upstash/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default function createHandler(options: { webhooks: string[] }) {
  const redis = Redis.fromEnv();
  const domain = process.env.DOMAIN;

  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    const api = req.query.chatbox[0];
    const chatId = req.query.chatbox[1];

    try {
      if (!chatId) throw new Error("Missing chatId");

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
              throw new Error("Method not allowed");
          }

        case "slack":
          switch (method) {
            // POST: /slack/[id]
            case "POST":
              const text = `New chat with id: ${domain}/chats/${chatId}`;

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
              throw new Error("Method not allowed");
          }
        default:
          throw new Error("Method not allowed");
      }
    } catch (err) {
      let message = err;

      if (err instanceof TypeError) {
        message = err.message;
      }

      return res.status(500).json({ message });
    }
  };
}
