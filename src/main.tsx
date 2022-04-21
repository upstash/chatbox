import React from "react";
import ReactDOM from "react-dom";
import ChatBoxAdmin from "./package/admin";
import ChatBoxWidget from "./package/widget";
import "./styles.css";

ReactDOM.render(
  <React.StrictMode>
    <div className="list">
      <ChatBoxAdmin />
      <ChatBoxWidget />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
