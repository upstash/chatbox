var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// package/index.ts
var package_exports = {};
__export(package_exports, {
  ChatBoxAdmin: () => ChatBoxAdmin,
  ChatBoxWidget: () => ChatBox
});
module.exports = __toCommonJS(package_exports);

// package/admin/index.tsx
var import_react4 = __toESM(require("react"));
var import_router = require("next/router");

// package/admin/store.tsx
var import_react = __toESM(require("react"));
var defaultState = {};
var ChatBoxContext = (0, import_react.createContext)(defaultState);
function ChatBoxProvider({
  children,
  id
}) {
  const [chat, setChat] = (0, import_react.useState)([]);
  const [message, setMessage] = (0, import_react.useState)("");
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
  (0, import_react.useEffect)(() => {
    if (!id)
      return;
    fetchList();
    const interval = setInterval(() => {
      fetchList();
    }, 3e3);
    return () => clearInterval(interval);
  }, [id]);
  return /* @__PURE__ */ import_react.default.createElement(ChatBoxContext.Provider, {
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
var import_react2 = __toESM(require("react"));
function Chat(props) {
  const { chat } = (0, import_react2.useContext)(store_default);
  function parseString(str) {
    let sender = str.substring(0, 1);
    let message = str.substring(2);
    return [sender, message];
  }
  const Messages = chat.map((item, index) => {
    const parsedStr = parseString(item);
    const isIn = parsedStr[0] === "i";
    const classNames = isIn ? "ChatMessageIn" : "ChatMessageOut";
    return /* @__PURE__ */ import_react2.default.createElement("div", {
      key: index,
      className: classNames
    }, /* @__PURE__ */ import_react2.default.createElement("span", null, parsedStr[1]));
  });
  return /* @__PURE__ */ import_react2.default.createElement("div", {
    className: "Chat"
  }, Messages);
}

// package/admin/components/Form.tsx
var import_react3 = __toESM(require("react"));
var import_react_textarea_autosize = __toESM(require("react-textarea-autosize"));
function Form(props) {
  const { message, setMessage, onSendMessage } = (0, import_react3.useContext)(store_default);
  return /* @__PURE__ */ import_react3.default.createElement("form", {
    className: "Form",
    onSubmit: (e) => {
      e.preventDefault();
      onSendMessage();
    }
  }, /* @__PURE__ */ import_react3.default.createElement(import_react_textarea_autosize.default, {
    autoFocus: true,
    required: true,
    name: "message",
    placeholder: "Write a message...",
    className: "FormMessage",
    maxRows: 5,
    value: message,
    onChange: (event) => setMessage(event.target.value)
  }), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("button", {
    type: "submit",
    className: "FormSubmit"
  }, /* @__PURE__ */ import_react3.default.createElement("svg", {
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
  }, /* @__PURE__ */ import_react3.default.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /* @__PURE__ */ import_react3.default.createElement("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  }), /* @__PURE__ */ import_react3.default.createElement("path", {
    d: "M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
  })))));
}

// package/admin/index.tsx
function ChatBoxAdmin({}) {
  const router = (0, import_router.useRouter)();
  const { id } = router.query;
  return /* @__PURE__ */ import_react4.default.createElement(ChatBoxProvider, {
    id
  }, /* @__PURE__ */ import_react4.default.createElement("div", {
    className: "Root"
  }, /* @__PURE__ */ import_react4.default.createElement("div", {
    className: "Grid"
  }, /* @__PURE__ */ import_react4.default.createElement("header", {
    className: "Header"
  }, /* @__PURE__ */ import_react4.default.createElement("h1", null, "Hi, chat id: ", id, ":")), /* @__PURE__ */ import_react4.default.createElement(Chat, null), /* @__PURE__ */ import_react4.default.createElement(Form, null))));
}

// package/widget/index.tsx
var import_react13 = __toESM(require("react"));

// package/widget/store.tsx
var import_react5 = __toESM(require("react"));
var defaultState2 = {
  showOnInitial: false
};
var ChatBoxContext2 = (0, import_react5.createContext)(defaultState2);
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
  const [UID, setUID] = (0, import_react5.useState)(localID ? localID : initialID);
  const [chatInitiated, setChatInitiated] = (0, import_react5.useState)(localID ? true : false);
  const [chat, setChat] = (0, import_react5.useState)([]);
  const [message, setMessage] = (0, import_react5.useState)("");
  const [isModalShow, setIsModalShow] = (0, import_react5.useState)(showOnInitial);
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
  (0, import_react5.useEffect)(() => {
    if (!chatInitiated || !isModalShow)
      return;
    fetchList();
    const interval = setInterval(() => {
      fetchList();
    }, 3e3);
    return () => clearInterval(interval);
  }, [chatInitiated, isModalShow, UID]);
  return /* @__PURE__ */ import_react5.default.createElement(ChatBoxContext2.Provider, {
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
var import_react9 = __toESM(require("react"));

// package/widget/components/Form.tsx
var import_react6 = __toESM(require("react"));
var import_react_textarea_autosize2 = __toESM(require("react-textarea-autosize"));
function Form2(props) {
  const { message, onChangeMessage, onSendMessage } = (0, import_react6.useContext)(store_default2);
  return /* @__PURE__ */ import_react6.default.createElement("form", {
    className: "Form",
    onSubmit: (e) => {
      e.preventDefault();
      onSendMessage();
    }
  }, /* @__PURE__ */ import_react6.default.createElement(import_react_textarea_autosize2.default, {
    autoFocus: true,
    required: true,
    name: "message",
    placeholder: "Write a message...",
    className: "styles.FormMessage",
    maxRows: 5,
    value: message,
    onChange: (event) => onChangeMessage(event.target.value)
  }), /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("button", {
    type: "submit",
    className: "FormSubmit"
  }, /* @__PURE__ */ import_react6.default.createElement("svg", {
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
  }, /* @__PURE__ */ import_react6.default.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /* @__PURE__ */ import_react6.default.createElement("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  }), /* @__PURE__ */ import_react6.default.createElement("path", {
    d: "M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
  })))));
}

// package/widget/components/Chat.tsx
var import_react7 = __toESM(require("react"));
function Chat2(props) {
  const { chat } = (0, import_react7.useContext)(store_default2);
  function parseString(str) {
    let sender = str.substring(0, 1);
    let message = str.substring(2);
    return [sender, message];
  }
  const Messages = chat.map((item, index) => {
    const parsedStr = parseString(item);
    const isIn = parsedStr[0] === "i";
    const classNames = isIn ? "ChatMessageIn" : "ChatMessageOut";
    return /* @__PURE__ */ import_react7.default.createElement("div", {
      key: index,
      className: classNames
    }, /* @__PURE__ */ import_react7.default.createElement("span", null, parsedStr[1]));
  });
  return /* @__PURE__ */ import_react7.default.createElement("div", {
    className: "Chat"
  }, Messages);
}

// package/widget/components/Header.tsx
var import_react8 = __toESM(require("react"));
function Header() {
  const {} = (0, import_react8.useContext)(store_default2);
  return /* @__PURE__ */ import_react8.default.createElement("div", {
    className: "Header"
  }, /* @__PURE__ */ import_react8.default.createElement("h2", null, "Hi \u{1F44B}"), /* @__PURE__ */ import_react8.default.createElement("p", null, "Ask us anything, or share your feedback."));
}

// package/widget/components/Modal.tsx
function Modal() {
  const { isModalShow } = (0, import_react9.useContext)(store_default2);
  if (!isModalShow)
    return null;
  return /* @__PURE__ */ import_react9.default.createElement("div", {
    className: "Modal"
  }, /* @__PURE__ */ import_react9.default.createElement(Header, null), /* @__PURE__ */ import_react9.default.createElement(Chat2, null), /* @__PURE__ */ import_react9.default.createElement(Form2, null));
}

// package/widget/components/TriggerButton.tsx
var import_react12 = __toESM(require("react"));

// package/widget/components/IconDefault.tsx
var import_react10 = __toESM(require("react"));
function IconDefault(_a) {
  var _b = _a, { size = 30 } = _b, props = __objRest(_b, ["size"]);
  return /* @__PURE__ */ import_react10.default.createElement("svg", __spreadValues({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "var(--color-text)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    width: size,
    height: size
  }, props), /* @__PURE__ */ import_react10.default.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /* @__PURE__ */ import_react10.default.createElement("path", {
    d: "M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"
  }), /* @__PURE__ */ import_react10.default.createElement("line", {
    x1: "12",
    y1: "12",
    x2: "12",
    y2: "12.01"
  }), /* @__PURE__ */ import_react10.default.createElement("line", {
    x1: "8",
    y1: "12",
    x2: "8",
    y2: "12.01"
  }), /* @__PURE__ */ import_react10.default.createElement("line", {
    x1: "16",
    y1: "12",
    x2: "16",
    y2: "12.01"
  }));
}

// package/widget/components/IconClose.tsx
var import_react11 = __toESM(require("react"));
function IconClose(_a) {
  var _b = _a, { size = 30 } = _b, props = __objRest(_b, ["size"]);
  return /* @__PURE__ */ import_react11.default.createElement("svg", __spreadValues({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "var(--color-text)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    width: size,
    height: size
  }, props), /* @__PURE__ */ import_react11.default.createElement("path", {
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /* @__PURE__ */ import_react11.default.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /* @__PURE__ */ import_react11.default.createElement("line", {
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
  const { isModalShow, onModalShow } = (0, import_react12.useContext)(store_default2);
  return /* @__PURE__ */ import_react12.default.createElement("button", {
    type: "button",
    className: "TriggerButton",
    onClick: () => {
      onModalShow(!isModalShow);
    }
  }, isModalShow ? /* @__PURE__ */ import_react12.default.createElement(import_react12.default.Fragment, null, /* @__PURE__ */ import_react12.default.createElement(IconClose, {
    size: 30
  })) : /* @__PURE__ */ import_react12.default.createElement(import_react12.default.Fragment, null, children ? children : /* @__PURE__ */ import_react12.default.createElement(IconDefault, null)));
}

// package/widget/index.tsx
function ChatBox({
  themeColor = "#2d00c6",
  textColor = "#fff",
  showOnInitial = false
}) {
  return /* @__PURE__ */ import_react13.default.createElement(ChatBoxProvider2, {
    showOnInitial
  }, /* @__PURE__ */ import_react13.default.createElement("div", {
    className: "ChatBox",
    style: {
      "--color-primary": themeColor,
      "--color-text": textColor
    }
  }, /* @__PURE__ */ import_react13.default.createElement(TriggerButton, null), /* @__PURE__ */ import_react13.default.createElement(Modal, null)));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatBoxAdmin,
  ChatBoxWidget
});
