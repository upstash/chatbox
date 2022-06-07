# ChatBox Widget for Next.js Apps

Create a ChatBox Widget (like Intercom live chat) for your Next.js app. When your website's visitor starts a session, the chat link is sent to your Slack channel.  

Check out the [the demo](https://upstash-chatbox.vercel.app).


Here the steps:

### 1. Create Upstash Redis

We will use [Upstash Redis](https://upstash.com) to keep the data as well as messaging (Redis pub/sub).

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
  loader: () => import("@upstash/chatbox"),
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

The options can be passed as React props

| key              | type                 | default                                  |
| ---------------- | -------------------- | ---------------------------------------- |
| `themeColor?`    | `string`             | #2d00c6                                  |
| `textColor?`     | `string`             | #fff                                     |
| `title?`         | `string`             | Hi 👋                                    |
| `description?`   | `string`             | Ask us anything, or share your feedback. |
| `showOnInitial?` | `boolean`            | false                                    |
| `customIcon?`    | `React.ReactElement` |                                          |

### 4. Admin Dashboard

```js
// pages/chat/[id].js

import dynamic from "next/dynamic";

const ChatBoxAdmin = dynamic({
  loader: () => import("@upstash/chatbox"),
  ssr: false,
});

export default function () {
  return <ChatBoxAdmin />;
}
```

### 5. Create API

```js
// pages/api/chatbox/[...chatbox].js

import createChatBoxAPI from "@upstash/chatbox/api";

const ChatBoxAPI = createChatBoxAPI({
  webhooks: [process.env.SLACK_WEBHOOK_URL],
});

export default ChatBoxAPI;
```
