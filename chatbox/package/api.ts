import { Redis } from "@upstash/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default function createChatBoxAPI(options: { webhooks: string[] }) {
  const redis = Redis.fromEnv();

  return async function (req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    const api = req.query.chatbox[0];
    const chatId = req.query.chatbox[1];
    const host = `http://${req.headers.host}`;

    try {
      if (!chatId) throw new Error("Missing chatId");

      switch (api) {
        case "chat":
          switch (method) {
            // GET: /chat/[id]
            case "GET":
              const chatData = await redis.lrange(chatId, 0, 2 ** 32 - 1);
              return res.status(200).json({ chatData });

            // POST: /chat/[id]
            case "POST":
              const chatText = req.body.text;

              const response = await redis.rpush(chatId, chatText);
              return res.status(200).json({ response });

            default:
              throw new Error("Method not allowed");
          }

        case "slack-email":
          // POST: /slack-email/[id]
          if (method !== "POST") throw new Error("Method not allowed");

          const slackEmail = req.body.email;
          if (!slackEmail) throw new Error("Missing email");

          const notifyEmailText = `A user left their email address ${slackEmail} with chat id: ${host}/chat/${chatId}`;

          const requestsEmail = options.webhooks.map(async (webhook) => {
            return fetch(webhook, {
              method: "POST",
              body: JSON.stringify({ text: notifyEmailText }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(requestsEmail);

          return res.status(200).json({ response: "ok" });

        case "slack":
          // POST: /slack/[id]
          if (method !== "POST") throw new Error("Method not allowed");

          let notifyText = `New chat with id: ${host}/chat/${chatId}`;

          if (req.body) {
            notifyText = `Old chat with id: ${host}/chat/${chatId} has a new message!`;
          }

          const requestsNotify = options.webhooks.map(async (webhook) => {
            return fetch(webhook, {
              method: "POST",
              body: JSON.stringify({ text: notifyText }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          });

          await Promise.all(requestsNotify);

          return res.status(200).json({ response: "ok" });

        default:
          throw new Error("Method not allowed");
      }
    } catch (err) {
      let message = err;

      console.log(err);

      if (err instanceof TypeError) {
        message = err.message;
      }

      return res.status(500).json({ message });
    }
  };
}
