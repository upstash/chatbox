import React from "react";
import TextareaAutosize from "react-textarea-autosize";

interface IChatBoxAdminForm {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
}

export default function Form({
  message,
  setMessage,
  onSendMessage,
}: IChatBoxAdminForm) {
  return (
    <form
      className="chatbox-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSendMessage();
      }}
    >
      <TextareaAutosize
        autoFocus
        required
        name="message"
        placeholder="Write a message..."
        className="chatbox-form-message"
        maxRows={5}
        value={message}
        onChange={(event) => {
          setMessage(
            event.target.value
              .split("\n")
              .filter((v) => v)
              .join(" ")
          );
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSendMessage();
          }
        }}
      />

      <div>
        <button type="submit" className="chatbox-form-submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#666"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="10" y1="14" x2="21" y2="3" />
            <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
