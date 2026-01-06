import React from "react";
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io ("http://localhost:5000");

// const [roomId, setRoomId] = useState("");
// const [username, setUsername] = useState("");
// const roomcreation =() => {
//   // I need to implement room creation logic here

// }
// const joinroom = () => {

// }
const [message,setMessage] = useState("");
const sendmessage = () => {
  socket.emit ("sendmessage", message);
}
function App () {
  return <>
          <div>
          <h1>Welcome to Chat App</h1>
          </div>
          <div>
          <input type="text" placeholder="Enter your message" onChange= {(e) => setMessage (e.target.value)} />
          <button onClick={sendmessage}>Send Message</button>
          </div>
  
        </>
}

export default App;