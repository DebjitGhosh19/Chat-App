import express from 'express';
import UserAuth from '../middleware/auth.js';
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from '../controller/message.controller.js';
const messageRouter = express.Router();
messageRouter.get("/users",UserAuth,getUsersForSidebar)
messageRouter.get("/:id",UserAuth,getMessages)
messageRouter.put("/mark/:id",UserAuth,markMessageAsSeen)
messageRouter.post("/send/:id",UserAuth,sendMessage)
export default messageRouter;