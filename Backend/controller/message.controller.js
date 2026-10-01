import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { io,userSocketMap } from "../index.js";
//get all user except the logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
       const userId=req.user._id;
    const filteredUsers = await User.find({
     _id: { $ne: userId }
    }).select("-password");
       //count number of messages not seen
       const unseenMessages={}
    const promises = filteredUsers.map(async (user) => {
        const messages=await Message.find({senderId:user._id,receiverId:userId,seen:false})
     if(messages.length>0){
         unseenMessages[user._id]=messages.length;
     }

    
    })
    await Promise.all(promises)
    res.json({ success: true, users: filteredUsers, unseenMessages });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

//get all messages for the selected user
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        await Message.updateMany(
            { senderId: selectedUserId, receiverId: myId, seen: false },
            { $set: { seen: true } }
        );

        res.json({ success: true, messages });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//api to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id} = req.params;

        const message = await Message.findByIdAndUpdate(
            id,
            { seen: true },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }

        res.json({ success: true, message });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

 //send message to selected user

// export const sendMessage=async (req,res) => {
//     try {
//         const {text,image}=req.body;
//         const receiverId=req.params.id;
//         const senderId=req.user._id;

//         let imageUrl;
//          if (image) {
//               const result = await cloudinary.uploader.upload(image.path, {
//                 resource_type: "image",
//               });
//               imageUrl = result.secure_url;
//             }

//             const newMessage=await Message.create({
//                         senderId,
//                         receiverId,
//                         text,
//                         image:imageUrl,                    
//                     }
//             )
// //Emit the new message to the recevier's socket
// const receiverSocketId=userSocketMap[receiverId]
// if (receiverSocketId) {
//     io.to(receiverSocketId).emit("newMesage", newMessage)
// }

//             res.json({success:true, newMessage})
//     } catch (error) {
//          console.log(error.message);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }
// export const sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;

//     const receiverId = req.params.id;
//     const senderId = req.user._id;

//     let imageUrl = "";

//     if (image) {
//       const result = await cloudinary.uploader.upload(image, {
//         resource_type: "image",
//       });

//       imageUrl = result.secure_url;
//     }

//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       text,
//       image: imageUrl,
//     });

//     return res.json({
//       success: true,
//       newMessage,
//     });

//   } catch (error) {
//     console.log(error);
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl = "";

    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        resource_type: "image",
      });

      imageUrl = result.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // 🔥 Find receiver's socket
    const receiverSocketId = userSocketMap[receiverId.toString()];

    console.log("Receiver ID:", receiverId.toString());
    console.log("Receiver Socket ID:", receiverSocketId);

    // 🔥 Send realtime message to receiver
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("✅ newMessage emitted to receiver");
    } else {
      console.log("❌ Receiver is not online");
    }

    return res.json({
      success: true,
      newMessage,
    });

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};