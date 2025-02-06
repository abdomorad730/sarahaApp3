import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase:true,
        maxLength:50,
        minLenghth:3
    },
    email:{
        lowercase:true,
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
        minLenghth:8

    }, 
    gender:{
        type: String,
        required:true,
        enum:["male","female"],
        lowercase:true

    },
    role:{
        type:String,
        enum:['user',"admin"],
        default:'user',
        lowercase:true

    },
    confirmed:{
        type:Boolean,
        default:false
    },
    phone:{
        type: String,
        required:true,
    },
    passwordChangedAt:Date,
    isDeleted:{
        type:Boolean,
        default:false
    },
    accountDeleted:Date,


},{timestamps:true})
const userModel=mongoose.models.User || mongoose.model('User',userSchema)
export default userModel