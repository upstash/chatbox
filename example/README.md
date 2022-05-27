# Free Live Chat Widget for Next.js Apps

Create a ChatBox Widget for your Next.js site like Intercom live chat. When your website's visitor starts a session, the chat link is sent to your Slack channel.  

See [the demo](https://upstash-chatbox.vercel.app)


Here the set up steps:

### 1. Create Database and Environment Variables

The data will be stored at [Upstash Redis](https://upstash.com).

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
// pages/_app.tsx

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
// pages/chat/[id].tsx

import dynamic from "next/dynamic";

const ChatBoxAdmin = dynamic({
  // @ts-ignore
  loader: () => import("@upstash/chatbox").then((mod) => mod.ChatBoxAdmin),
  ssr: false,
});

export default function () {
  return <ChatBoxAdmin />;
}

```

### 5. Create API

```js
// pages/api/chatbox/[...chatbox].ts

import createChatBoxAPI from "@upstash/chatbox/api";

const ChatBoxAPI = createChatBoxAPI({
  webhooks: [process.env.SLACK_WEBHOOK_URL!],
});

export default ChatBoxAPI;

```

## Local Development

To run the development server locally:

```
npm install
# or
yarn
```
to install dependencies. Then,

```bash
npm run dev
# or
yarn dev
```

to start development server.

(This project is configured on port 3001)
- Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Deploy on Vercel with Upstash Integration!
<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fupstash%2Fchatbox%2Ftree%2Fenchancements%2Fexample&env=SLACK_WEBHOOK_URL&integration-ids=oac_V3R1GIpkoJorr6fqyiwdhl17"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
