import { useState, useEffect } from "react";
import Chatbox from "../../components/chatbox"

export default function CustomerChatbox({ chatArray }) {


  // Implement local storage.
  // So that now ids won't be created in every refresh.
  
  const initialID = "visitor"

  const [chat, setChat] = useState(chatArray);
  const [text, setText] = useState("");
  const [chatInitiated, setChatInitiated] = useState(false);
  const [UID, setUID] = useState(initialID)

  // console.log(new Date().getTime());
  // console.log(UID);

  useEffect(() => {
    if (chatInitiated) {
      const interval = setInterval(() => {
        // console.log("Ali")
        fetchList();
      }, 2000);
      return () => clearInterval(interval);
    }
  });


  async function fetchList(id = UID) {
    // console.log("5:", UID, id)
    const response = await fetch(`/api/chat/${id}`, { method: "GET" });
    const data = await response.json();
    setChat(data.chatData);
  };


  const writeToChat = async () => {
    // console.log("initiated:", chatInitiated);
    // console.log("uid:", UID);

    // Initiate chat and send to slack channel
    let id = UID
    if (!chatInitiated) {
      id = new Date().getTime()
      const response = await fetch(`/api/slack/${id}`, {
        method: "POST",
        body: JSON.stringify({ id }),
      })
      // console.log("4", response)

      if (response.status == 200) {
        // console.log("in there...")
        setChatInitiated(true)
        setUID(id)
      }
      else {
        return;
      }
    }


    let replyText = "i:" + text;
    // console.log("2:", UID, id)

    const response = await fetch(`/api/chat/${id}`, {
      method: "POST",
      body: JSON.stringify({ text: replyText }),
    });

    await fetchList(id)
    return setText("");
  };

  return (
    <div>
      
      <h2>
        Hi, chat id: {UID}:
      </h2>
      <Chatbox chat={chat}></Chatbox>
      <br/>
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
  );
}

// export async function getServerSideProps({ params }) {
//   const data = await redis.lrange(params, 0, 2 ** 32 - 1);
//   console.log(data);

//   return {
//     // props: { chatArray: ['ali'] }
//     props: { chatArray: data },
//   };
// }
