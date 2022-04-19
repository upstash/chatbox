import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const webhook = process.env.SLACK_WEBHOOK as string;

  switch (req.method) {
    case "POST":
      const { id } = JSON.parse(req.body);
      const text = `New chat with id: http://localhost:3000/chats/${id}`;

      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ text }),
      });

      return res.status(200).json({ response });

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
