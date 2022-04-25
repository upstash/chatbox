import React, { useContext } from "react";
import FeedbackContext from "../store";

export default function Header() {
  const {} = useContext(FeedbackContext);

  return (
    <div className="chatbox-widget-header">
      <h2>Hi 👋</h2>
      <p>Ask us anything, or share your feedback.</p>
    </div>
  );
}
