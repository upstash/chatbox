import createChatBoxAPI from "@upstash/chatbox/api";

const ChatBoxAPI = createChatBoxAPI({
  webhooks: [process.env.SLACK_WEBHOOK_URL!],
});

export default ChatBoxAPI;
