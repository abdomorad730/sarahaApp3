import { messageModel } from "../../db/models/messages.model.js";
import userModel from "../../db/models/users.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const sendMessages = asyncHandler(async(req,res,next)=>{
    const {content,userId}=req.body
    if(!await userModel.findOne({_id:userId,isDeleted:false})){
        return next(new Error("user not found",{cause:404}))
    }
    const messages =  await messageModel.create({content,userId})
    return res.status(200).json({message:'done',messages})
})
export const getMessages = asyncHandler(async(req,res,next)=>{
    const messages =  await messageModel.find({userId:req.user._id}).populate("userId","name email")
    return res.status(200).json({message:'done',messages})
})
