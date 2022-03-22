import React, { useRef } from "react";
import "./Message.css";

const Message = ({ type = "Yellow", message }) => {
  const messageEl = useRef();
  setTimeout(() => messageEl.current?.classList.add("fade"), 2000);
  return (
    <div
      ref={messageEl}
      className="message-container"
      style={{ backgroundColor: type }}
    >
      {message}
    </div>
  );
};

export default Message;
