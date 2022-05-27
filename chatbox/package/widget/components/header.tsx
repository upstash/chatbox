import React, { useContext } from "react";
import FeedbackContext from "../store";

export default function Header() {
  const { title, description } = useContext(FeedbackContext);

  return (
    <div className="chatbox-widget-header">
      <h2>{title ? title : "Hi 👋"}</h2>
      <p>
        {description ? description : "Ask us anything, or share your feedback."}
      </p>
    </div>
  );
}
