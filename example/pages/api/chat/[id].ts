import type { NextApiRequest, NextApiResponse } from "next";
import redis from "lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      console.log("in GET");
      const data = await redis.lrange(id.toString(), 0, 2 ** 32 - 1);
      return res.status(200).json({ chatData: data });

    case "POST":
      const { text } = JSON.parse(req.body);

      const response = await redis.rpush(id.toString(), text);
      return res.status(200).json({ response });

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
