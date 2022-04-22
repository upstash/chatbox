import {NextApiRequest, NextApiResponse} from "next"
import ChatBoxAPI from "components/api";

export default (req: NextApiRequest, res: NextApiResponse) =>
  ChatBoxAPI(req, res, {
    webhooks: [process.env.SLACK_WEBHOOK_URL!],
  });
