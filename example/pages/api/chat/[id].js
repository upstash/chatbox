import redis from "../../../lib/redis";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;

  switch (method) {
    case "GET":
      console.log("in GET");
      const data = await redis.lrange(id, 0, 2 ** 32 - 1);
      return res.status(200).json({ chatData: data });

    case "POST":
      const { text } = JSON.parse(req.body);
      // console.log(req.body)

      // console.log(text)
      const response = await redis.rpush(id, text);
      return res.status(200).json({ response });

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
