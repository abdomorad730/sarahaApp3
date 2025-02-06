import userModel from "../../db/models/users.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { eventEmitter } from "../../utils/sendEmailEvent.js";
import { compare, hashing } from "../../utils/hash/index.js";
import { decrypt, encrypt } from "../../utils/encryption/index.js";
import { generate, verify } from "../../utils/token/index.js";


export const addUser = asyncHandler(async (req, res, next) => {
    const { email, name, password, phone, cpassword, gender } = req.body
    const emailExist = await userModel.findOne({ email })
    if (emailExist) {
        return next(new Error("email already exist"))
    }
    /*if(password !== cpassword){
        }*/
    const hash = await hashing(password,process.env.SALT_ROUNDES)


    const cryptPhone = await encrypt(phone,process.env.SECRET_KEY_ADMIN)
    eventEmitter.emit('sendMail',{email})
    /*if (!emailSender) {
          return next( new Error("fail to send email"))  
    }*/
    const user = await userModel.create({ email, name, password: hash, phone: cryptPhone, gender })
    res.status(200).json({ msg: "user is added successfully" })

})


export const sender = asyncHandler(async (req, res, next) => {

    const { token } = req.params

    const decoded = await verify(token,process.env.CONFIRM_KEY)
    if (!decoded?.email) {
        return next(new Error("invalid token"))
    }
    const user = await userModel.findOneAndUpdate({ email: decoded.email, confirmed: false }, { confirmed: true }).lean()
    if (!user) {
        return next(new Error("user not found" ))
    }
    /*user.confirmed=true
     await user.save()*/
    return res.status(200).json({ msg: "done" })


})


export const signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const User = await userModel.findOne({ email })
    if (!User) {
        return next(new Error("user not found" ))
    }
    const isValid = await compare(password,User.password)
    if (!isValid) {
        return next(new Error("password is not valid"))

    }
    const token = await generate({
       payload: { name: User.name, id: User._id },
        signature:User.role == "user" ? process.env.SECRET_KEY_USER : process.env.SECRET_KEY_ADMIN,
        options:{ algorithm: "HS384" }}
    )
    return res.status(200).json({ msg: "done", token })


})


export const getProfile = asyncHandler(async (req, res, next) => {
    const user = req.user
    const phone = await decrypt(user.phone, process.env.SECRET_KEY_ADMIN)
    return res.status(200).json({ msg: "done", ...user, phone })

})


export const updateProfile=asyncHandler(async(req,res,next)=>{
    if (req.body.phone){
        const phone =await encrypt(req.body.phone,process.env.SECRET_KEY_ADMIN)
        req.body.phone =phone
    }
    const user = await userModel.findByIdAndUpdate(req?.user._id,req.body,{new:true})
    return res.status(200).json({ msg: "done", user })

})
export const updatePassword = asyncHandler(async(req,res,next)=>{
    const {oldPassword,password}=req.body
    if(!await compare(oldPassword , req.user.password)){
        return next(new Error("oldPassword is wrong"))
    }
    const hash = await hashing(password,process.env.SALT_ROUNDES)
    const user =await userModel.findByIdAndUpdate(req.user._id,{password:hash,passwordChangedAt:Date.now()},{new:true})
    return res.status(200).json({ msg: "done", user })
})

export const freeze = asyncHandler(async(req,res,next)=>{
    const user =await userModel.findByIdAndUpdate(req.user._id,{isDeleted:true,accountDeleted:Date.now()},{new:true})
    return res.status(200).json({ msg: "done", user })

})
export const shareAccount = asyncHandler(async(req,res,next)=>{
    
    const user =await userModel.findById(req.params.id).select("name email phone")
    if(!user){
        return next(new Error("user not found"))

    }
    return res.status(200).json({ msg: "done", user })

})