import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const Signup = async (req,res) => {
  try {
    const { name, email, password, bio } = req.body;
    const image = req.file;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });
    }

   

    const existingUser = await User.findOne({email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this username or email.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imageUrl = "";
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      bio,
      profilePic: imageUrl,
    });

      const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id,
        userName: newUser.name,
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

export const Login=async (req,res) => {
  try {
     const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }
     const user = await User.findOne({ email});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
     const isPasswordValid = await bcrypt.compare(password, user.password);
 if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
      return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      token,
      user: {
        id: user._id,
        userName: user.name,
        email: user.email,
      },
    });

  } catch (error) {
      console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in.",
      error: error.message,
    });
  }
}
// Controller to update profile details
export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
   
    
    const { name, email, bio } = req.body;
    const image = req.file;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (!name && !email && bio === undefined && !image) {
      return res.status(400).json({
        success: false,
        message: "At least one profile field is required.",
      });
    }

    if (email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already in use.",
        });
      }
    }

    const updates = {};
    if (name ) updates.name = name;
    if (email) updates.email = email;
    if (bio !== undefined) updates.bio = bio;

    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "image",
      });
      updates.profilePic = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        userName: user.name,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the profile.",
      error: error.message,
    });
  }
};


//controller to check if user is authenticatd
export const checkAuth=(req,res)=>{
  res.json({success:true,user:req.user})
}