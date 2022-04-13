import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import redis from "../../lib/redis";
import Chatbox from "../../components/chatbox"


export default function Chat({ chatArray }) {
  const router = useRouter();
  const { id } = router.query;

  const [chat, setChat] = useState(chatArray);
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("Ali")
      fetchList();
    }, 2000);
    return () => clearInterval(interval);
  });

  const fetchList = async () => {
    const response = await fetch(`/api/chat/${id}`, { method: "GET" });
    const data = await response.json();
    setChat(data.chatData);
  };

  const writeToChat = async () => {
    let replyText = "o:" + text;

    const response = await fetch(`/api/chat/${id}`, {
      method: "POST",
      body: JSON.stringify({ text: replyText }),
    });

    await fetchList();
    return setText("");
  };

  return (
    <div>

      <h2>
        Hi, chat id: {id}:
      </h2>
      <Chatbox chat={chat}></Chatbox>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          writeToChat();
        }}
      >
        <input
          value={text}
          placeholder="Type your message here."
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <button onClick={fetchList}>Click!</button>
    </div>
    // <div>
    //   <h2>
    //     Hi, {id}: {chat}
    //   </h2>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       writeToChat();
    //     }}
    //   >
    //     <input
    //       value={text}
    //       placeholder="Type your message here."
    //       onChange={(e) => setText(e.target.value)}
    //     />
    //   </form>
    //   <button onClick={fetchList}>Click!</button>
    // </div>
  );
}

export async function getServerSideProps({ params }) {
  const data = await redis.lrange(params.id, 0, 2 ** 32 - 1);
  // console.log(data);

  return {
    // props: { chatArray: ['ali'] }
    props: { chatArray: data },
  };
}

// export async function getStaticProps({ params }) {

//     console.log("params are:", params)
//     const data = await redis.lrange(params.id, 0, 2 ** 32 - 1)

//     console.log(data);

//     return {
//         props: { chat: data },
//     }

// }

// export async function getStaticPaths() {

//     return {
//         paths,
//         fallback: false
//     }

// }
