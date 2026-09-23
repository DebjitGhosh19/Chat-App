import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
const UserAuth= async (req,res,next) => {
    const {token} = req.headers.token;
  try{
      if(!token){
        return res.status(401).json({
            success: false, 
            message: "No token provided.",
          });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user=await User.findById(decoded.id).select("-password")
    if(!user) return res.json({success:false,message:"user not found"})
  req.user=user;
    
    next();
  }
  catch(error){
    console.error("Authentication error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
}

export default UserAuth;