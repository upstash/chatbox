import { NextApiRequest, NextApiResponse } from 'next';

declare function createChatBoxAPI(options: {
    webhooks: string[];
}): (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export { createChatBoxAPI as default };
