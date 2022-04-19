function Chatbox({ chat = [] }: { chat: string[] }) {
  function parseString(str: string) {
    let sender = str.substring(0, 1);
    let message = str.substring(2);
    return [sender, message];
  }

  const listItems = chat.map((item, index) => {
    const parsedStr = parseString(item);
    return (
      <li key={index}>
        {parsedStr[0]}:{parsedStr[1]}
      </li>
    );
  });

  return (
    <div>
      <h2>Chat:</h2>

      <ul>{listItems}</ul>
    </div>
  );
}

export default Chatbox;
