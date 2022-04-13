import redis from "../../../lib/redis";

export default async function handler(req, res) {
  const { id } = req.query;
  const method = req.method;

  const webhook = process.env.SLACK_WEBHOOK
  // console.log("webhook:", webhook)

  switch (method) {

    case "POST":
      const { id } = JSON.parse(req.body);
      // console.log(req.body)
      const text = `New chat with id: http://localhost:3000/chats/${id}`

      // console.log("3:", id)
      const response = await fetch(webhook, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        // body: JSON.stringify({ text: `New chat with id: ${id}` }),
        body: JSON.stringify({text})

      })
      // console.log(response)
      return res.status(200).json({ response });

    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
