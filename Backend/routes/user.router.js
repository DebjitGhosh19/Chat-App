import express from 'express';
import { Login, Signup, UpdateProfile } from '../controller/user.controller.js';
import UserAuth from '../middleware/auth.js';
import upload from '../middleware/multer.js';



const userRouter = express.Router();

userRouter.post("/signup",upload.single('image'),Signup)
userRouter.post("/login", UserAuth,Login)
userRouter.put("/update-profile",UserAuth,upload.single('image'),UpdateProfile)
export default userRouter;