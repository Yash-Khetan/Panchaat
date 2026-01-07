import express from "express"
import {Server} from "socket.io"
import {createServer} from  "http"
const app = express() ;

const port = 5000; 
const server = createServer(app);
const io =  new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        
    }
})

io.on("connection", (socket) => {
    console.log("user connected with id", socket.id);
    socket.on("sendmessage", (msg)=> {
        // 
        socket.broadcast.emit("rmessage",msg); 
        // console.log("messaging with the text", msg); 
    })
    socket.on("disconnect", () => {
        console.log("user left with id: ",socket.id)
    })
})


server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`); 
})