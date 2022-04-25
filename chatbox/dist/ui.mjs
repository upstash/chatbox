import {
  __objRest,
  __spreadValues
} from "./chunk-N3HJPGEW.mjs";

// package/admin/index.tsx
import React4 from "react";
import { useRouter } from "next/router";

// package/admin/store.tsx
import React, { createContext, useEffect, useState } from "react";
var defaultState = {};
var ChatBoxContext = createContext(defaultState);
function ChatBoxProvider({
  children,
  id
}) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  async function fetchList() {
    const response = await fetch(`/api/chatbox/chat/${id}`, { method: "GET" });
    const data = await response.json();
    setChat(data.chatData);
  }
  const onSendMessage = async () => {
    let replyText = "o:" + message;
    await fetch(`/api/chatbox/chat/${id}`, {
      method: "POST",
      body: JSON.stringify({ text: replyText })
    });
    await fetchList();
    return setMessage("");
  };
  useEffect(() => {
    if (!id)
      return;
    fetchList();
    const interval = setInterval(() => {
      fetchList();
    }, 3e3);
    return () => clearInterval(interval);
  }, [id]);
  return /* @__PURE__ */ React.createElement(ChatBoxContext.Provider, {
    value: {
      chat,
      message,
      setMessage,
      onSendMessage
    }
  }, children);
}
var store_default = ChatBoxContext;

// package/admin/components/Chat.tsx
import React2, { useContext } from "react";
function Chat(props) {
  const { chat } = useContext(store_default);
  function parseString(str) {
    let sender = str.substring(0, 1);
    let message = str.substring(2);
    return [sender, message];
  }
  const Messages = chat.map((item, index) => {
    const parsedStr = parseString(item);
    const isIn = parsedStr[0] === "i";
    const classNames = isIn ? "ChatMessageIn" : "ChatMessageOut";
    return /* @__PURE__ */ React2.createElement("div", {
      key: index,
      className: classNames
    }, /* @__PURE__ */ React2.createElement("span", null, parsedStr[1]));
  });
  return /* @__PURE__ */ React2.createElement("div", {
    className: "Chat"
  }, Messages);
}

// package/admin/components/Form.tsx
import React3, { useContext as useContext2 } from "react";
import TextareaAutosize from "react-textarea-autosize";
function Form(props) {
  const { message, setMessage, onSendMessage } = useContext2(store_default);
  return /* @__PURE__ */ React3.createElement("form", {
    className: "Form",
    onSubmit: (e) => {
      e.preventDefault();
      onSendMessage();
    }
  }, /* @__PURE__ */ React3.createElement(TextareaAutosize, {
    autoFocus: true,
    required: true,
    name: "message",
    placeholder: "Write a message...",
    className: "FormMessage",
    maxRows: 5,
    value: message,
    onChange: (event) => setMessage(event.target.value)
  }), /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("button", {
    type: "submit",
    className: "FormSubmit"
  }, /* @__PURE__ */ React3.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-send",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#666",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /* @__PURE__ */ React3.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /* @__PURE__ */ React3.createElement("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  }), /* @__PURE__ */ React3.createElement("path", {
    d: "M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
  })))));
}

// package/admin/index.tsx
function ChatBoxAdmin({}) {
  const router = useRouter();
  const { id } = router.query;
  return /* @__PURE__ */ React4.createElement(ChatBoxProvider, {
    id
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "Root"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "Grid"
  }, /* @__PURE__ */ React4.createElement("header", {
    className: "Header"
  }, /* @__PURE__ */ React4.createElement("h1", null, "Hi, chat id: ", id, ":")), /* @__PURE__ */ React4.createElement(Chat, null), /* @__PURE__ */ React4.createElement(Form, null))));
}

// package/widget/index.tsx
import React13 from "react";

// package/widget/store.tsx
import React5, { createContext as createContext2, useEffect as useEffect2, useState as useState2 } from "react";
var defaultState2 = {
  showOnInitial: false
};
var ChatBoxContext2 = createContext2(defaultState2);
function ChatBoxProvider2({
  children,
  showOnInitial
}) {
  function setWithExpiry(key, value, ttl = 24 * 60 * 60 * 1e3) {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      window.location.reload();
      return null;
    }
    return item.value;
  }
  let initialID = "visitor";
  const localID = getWithExpiry("chatbox_id");
  console.log("localID", localID);
  const [UID, setUID] = useState2(localID ? localID : initialID);
  const [chatInitiated, setChatInitiated] = useState2(localID ? true : false);
  const [chat, setChat] = useState2([]);
  const [message, setMessage] = useState2("");
  const [isModalShow, setIsModalShow] = useState2(showOnInitial);
  async function fetchList(id = UID) {
    const response = await fetch(`/api/chatbox/chat/${id}`, { method: "GET" });
    const data = await response.json();
    setChat(data.chatData);
  }
  const onSendMessage = async () => {
    try {
      let id = UID;
      if (!chatInitiated) {
        id = new Date().getTime().toString();
        const initResponse = await fetch(`/api/chatbox/slack/${id}`, {
          method: "POST"
        });
        setWithExpiry("chatbox_id", id);
        if (initResponse.status !== 200) {
          localStorage.removeItem("chatbox_id");
          throw new Error("Failed to init chat");
        }
        setChatInitiated(true);
        setUID(id);
      }
      let replyText = "i:" + message;
      const replyResponse = await fetch(`/api/chatbox/chat/${id}`, {
        method: "POST",
        body: JSON.stringify({ text: replyText })
      });
      if (replyResponse.status !== 200) {
        throw new Error("Failed to reply");
      }
      await fetchList(id);
      return setMessage("");
    } catch (err) {
      alert(err);
    }
  };
  const onModalShow = (status) => {
    setIsModalShow(status);
  };
  const onChangeMessage = (value) => {
    setMessage(value);
  };
  useEffect2(() => {
    if (!chatInitiated || !isModalShow)
      return;
    fetchList();
    const interval = setInterval(() => {
      fetchList();
    }, 3e3);
    return () => clearInterval(interval);
  }, [chatInitiated, isModalShow, UID]);
  return /* @__PURE__ */ React5.createElement(ChatBoxContext2.Provider, {
    value: {
      showOnInitial,
      isModalShow,
      onModalShow,
      chat,
      message,
      onChangeMessage,
      onSendMessage
    }
  }, children);
}
var store_default2 = ChatBoxContext2;

// package/widget/components/Modal.tsx
import React9, { useContext as useContext6 } from "react";

// package/widget/components/Form.tsx
import React6, { useContext as useContext3 } from "react";
import TextareaAutosize2 from "react-textarea-autosize";
function Form2(props) {
  const { message, onChangeMessage, onSendMessage } = useContext3(store_default2);
  return /* @__PURE__ */ React6.createElement("form", {
    className: "Form",
    onSubmit: (e) => {
      e.preventDefault();
      onSendMessage();
    }
  }, /* @__PURE__ */ React6.createElement(TextareaAutosize2, {
    autoFocus: true,
    required: true,
    name: "message",
    placeholder: "Write a message...",
    className: "styles.FormMessage",
    maxRows: 5,
    value: message,
    onChange: (event) => onChangeMessage(event.target.value)
  }), /* @__PURE__ */ React6.createElement("div", null, /* @__PURE__ */ React6.createElement("button", {
    type: "submit",
    className: "FormSubmit"
  }, /* @__PURE__ */ React6.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "icon icon-tabler icon-tabler-send",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "#666",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /* @__PURE__ */ React6.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /* @__PURE__ */ React6.createElement("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  }), /* @__PURE__ */ React6.createElement("path", {
    d: "M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
  })))));
}

// package/widget/components/Chat.tsx
import React7, { useContext as useContext4 } from "react";
function Chat2(props) {
  const { chat } = useContext4(store_default2);
  function parseString(str) {
    let sender = str.substring(0, 1);
    let message = str.substring(2);
    return [sender, message];
  }
  const Messages = chat.map((item, index) => {
    const parsedStr = parseString(item);
    const isIn = parsedStr[0] === "i";
    const classNames = isIn ? "ChatMessageIn" : "ChatMessageOut";
    return /* @__PURE__ */ React7.createElement("div", {
      key: index,
      className: classNames
    }, /* @__PURE__ */ React7.createElement("span", null, parsedStr[1]));
  });
  return /* @__PURE__ */ React7.createElement("div", {
    className: "Chat"
  }, Messages);
}

// package/widget/components/Header.tsx
import React8, { useContext as useContext5 } from "react";
function Header() {
  const {} = useContext5(store_default2);
  return /* @__PURE__ */ React8.createElement("div", {
    className: "Header"
  }, /* @__PURE__ */ React8.createElement("h2", null, "Hi \u{1F44B}"), /* @__PURE__ */ React8.createElement("p", null, "Ask us anything, or share your feedback."));
}

// package/widget/components/Modal.tsx
function Modal() {
  const { isModalShow } = useContext6(store_default2);
  if (!isModalShow)
    return null;
  return /* @__PURE__ */ React9.createElement("div", {
    className: "Modal"
  }, /* @__PURE__ */ React9.createElement(Header, null), /* @__PURE__ */ React9.createElement(Chat2, null), /* @__PURE__ */ React9.createElement(Form2, null));
}

// package/widget/components/TriggerButton.tsx
import React12, { useContext as useContext7 } from "react";

// package/widget/components/IconDefault.tsx
import React10 from "react";
function IconDefault(_a) {
  var _b = _a, { size = 30 } = _b, props = __objRest(_b, ["size"]);
  return /* @__PURE__ */ React10.createElement("svg", __spreadValues({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "var(--color-text)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    width: size,
    height: size
  }, props), /* @__PURE__ */ React10.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /* @__PURE__ */ React10.createElement("path", {
    d: "M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"
  }), /* @__PURE__ */ React10.createElement("line", {
    x1: "12",
    y1: "12",
    x2: "12",
    y2: "12.01"
  }), /* @__PURE__ */ React10.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "8",
    y2: "12.01"
  }), /* @__PURE__ */ React10.createElement("line", {
    x1: "16",
    y1: "12",
    x2: "16",
    y2: "12.01"
  }));
}

// package/widget/components/IconClose.tsx
import React11 from "react";
function IconClose(_a) {
  var _b = _a, { size = 30 } = _b, props = __objRest(_b, ["size"]);
  return /* @__PURE__ */ React11.createElement("svg", __spreadValues({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "var(--color-text)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    width: size,
    height: size
  }, props), /* @__PURE__ */ React11.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /* @__PURE__ */ React11.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /* @__PURE__ */ React11.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
}

// package/widget/components/TriggerButton.tsx
function TriggerButton({
  children
}) {
  const { isModalShow, onModalShow } = useContext7(store_default2);
  return /* @__PURE__ */ React12.createElement("button", {
    type: "button",
    className: "TriggerButton",
    onClick: () => {
      onModalShow(!isModalShow);
    }
  }, isModalShow ? /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement(IconClose, {
    size: 30
  })) : /* @__PURE__ */ React12.createElement(React12.Fragment, null, children ? children : /* @__PURE__ */ React12.createElement(IconDefault, null)));
}

// package/widget/index.tsx
function ChatBox({
  themeColor = "#2d00c6",
  textColor = "#fff",
  showOnInitial = false
}) {
  return /* @__PURE__ */ React13.createElement(ChatBoxProvider2, {
    showOnInitial
  }, /* @__PURE__ */ React13.createElement("div", {
    className: "ChatBox",
    style: {
      "--color-primary": themeColor,
      "--color-text": textColor
    }
  }, /* @__PURE__ */ React13.createElement(TriggerButton, null), /* @__PURE__ */ React13.createElement(Modal, null)));
}
export {
  ChatBoxAdmin,
  ChatBox as ChatBoxWidget
};
