# ChatBox Widget for Next.js

Create a ChatBox Widget for your Next.js site.

See [the demo](https://upstash-chatbox.vercel.app)

### 1. Create Database and Environment Variables

The data will be kept at [Upstash Redis](https://upstash.com).

Create a free Redis database at [Upstash Console](https://console.upstash.com)

Copy the `.env.local.example` file to `.env.local` (which will be ignored by
Git):

```bash
cp .env.local.example .env.local
```

- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` can be found at the
  database details page in Upstash Console.
- `SLACK_WEBHOOK_URL` can be found at the Slack integration page
  in https://api.slack.com/messaging/webhooks

### 2. Install Package

```bash
yarn add @upstash/chatbox
```

### 3. Import CSS and Widget

```jsx
// pages/_app.js

import "@upstash/chatbox/index.css";
import dynamic from "next/dynamic";

const ChatBoxWidget = dynamic({
  loader: () => import("@upstash/chatbox").then((mod) => mod.ChatBoxWidget),
  ssr: false,
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChatBoxWidget />
      <Component {...pageProps} />
    </>
  );
}
```

### 4. Admin Dashboard

```jsx
// pages/chat/[id].jsx

import dynamic from "next/dynamic";

const ChatBoxAdmin = dynamic({
  loader: () => import("@upstash/chatbox").then((mod) => mod.ChatBoxAdmin),
  ssr: false,
});

export default function () {
  return <ChatBoxAdmin />;
```

### 5. Create API

```js
// pages/api/chatbox/[...chatbox].js

import createChatBoxAPI from "@upstash/chatbox/api";

const ChatBoxAPI = createChatBoxAPI({
  webhooks: [process.env.SLACK_WEBHOOK_URL!],
});

export default ChatBoxAPI;
```


