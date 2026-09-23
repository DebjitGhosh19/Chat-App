import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import http from "http";
import cors from 'cors'
import { Server } from "socket.io";
import userRouter from './routes/user.router.js';
import cloudinaryConfig from './config/cloudinary.js';
import messageRouter from './routes/message.router.js';
const port = process.env.PORT||3000;
//Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
// 2. Initialize Socket.io with CORS configuration
export const io = new Server(server, {
  cors: {
    origin: "*", // Your React frontend URL
   
  }
});
//store online users
export const userSocketMap={}

// 3. Listen for incoming socket connections
io.on('connection', (socket) => {
  const userId=socket.handshake.query.userId;
  console.log(`User connected: ` , userId);
  if (userId) userSocketMap[userId]=socket.id
   io.emit("getOnlineUsers",
            Object.keys(userSocketMap)
        );

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: `, userId);
    delete userSocketMap[userId]
    io.emit("getOnlineUsers",
            Object.keys(userSocketMap)
        )
  });
});
// middleware
connectDB()
//cloudinaryConfig
await cloudinaryConfig()
app.use(express.json({limit:"4mb"}))
app.use(cors())
app.use("/api/status",(req,res)=>{
  res.send("Server is live")
})
app.use("/api/users",userRouter)
app.use("/api/messages",messageRouter)
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});