import ChatBoxAPI from "components/api";

export default (req: any, res: any) =>
  ChatBoxAPI(req, res, {
    webhooks: [process.env.SLACK_WEBHOOK_URL!],
  });
