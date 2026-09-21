import express from 'express';
import { Signup } from '../controller/user.controller.js';
import upload from '../middleware/multer.js';



const userRouter = express.Router();

userRouter.post("/signup", upload.single('image'),Signup)

export default userRouter;