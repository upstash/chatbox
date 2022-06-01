import React, { useContext } from "react";
import FeedbackContext from "../store";

export default function Email() {
  const { email, setEmail, onSendEmail } = useContext(FeedbackContext);

  return (
    <form
      className="chatbox-widget-email-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSendEmail();
      }}
    >
      <p>
        Don’t have time to wait for a response? Leave your email and we’ll be in
        touch as soon as possible.
      </p>

      <input
        type="email"
        placeholder="Enter email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </form>
  );
}
