import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const Signup = async (req,res) => {
  try {
    const { name, email, password, bio } = req.body;
    const image = req.file
      if (!req.file) {
      return res.status(400).json({ success: false, message: 'কোনো ফাইল পাওয়া যায়নি!' });
    }
    console.log(image);
    

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });
    }
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this username or email.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imagesUrl = result.secure_url;
    const newUser = await User.create({
      fullName: name,
      email,
      password: hashedPassword,
      bio,
      profilePic:imagesUrl,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        userName: newUser.fullName,
        email: newUser.email,
        bio: newUser.bio,
        profilePic:newUser.profilePic
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while signing up.",
      error: error.message,
    });
  }
};
