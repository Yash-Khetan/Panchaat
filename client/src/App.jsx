import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("rmessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("rmessage");
    };
  }, []);

  const sendmessage = () => {
    socket.emit("sendmessage", message);
    setMessage("");
  };

  return (
    <>
      <div>
        <h1>Welcome to Chat App</h1>
      </div>
      <div>
        <h1>messages</h1>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendmessage}>Send Message</button>
      </div>
    </>
  );
}

export default App;