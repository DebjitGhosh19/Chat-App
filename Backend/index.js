import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import http from "http";
import cors from 'cors'
import { Server } from "socket.io";
import userRouter from './routes/user.router.js';
const port = process.env.PORT||3000;
//Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// middleware
connectDB()
app.use(express.json({limit:"4mb"}))
app.use(cors())
app.use("/api/status",(req,res)=>{
  res.send("Server is live")
})
app.use("/api/users",userRouter)
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});