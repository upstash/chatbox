import { useContext } from "react";
import FeedbackContext from "../store";

export default function Email() {
  const { email, setEmail, onSendEmail } = useContext(FeedbackContext);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSendEmail();
      }}
    >
      <input
        type="text"
        placeholder="Give your email for us to reach you and end session."
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </form>
  );
}
