import Joi from "joi";
import { Types } from "mongoose";

export const signupSchema={
    body:Joi.object({
        name:Joi.string().min(3),
        password: Joi.string().pattern(/^^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        cpassword: Joi.string().valid(Joi.ref('password')),
        email:Joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        gender:Joi.string().valid("male","female"),
        phone:Joi.string().pattern(/^(\+201|01)[0-2,5]{1}[0-9]{8}/)
    }).options({presence:"required"})
}
export const updateSchema={
    body:Joi.object({
        name:Joi.string().min(3),
        gender:Joi.string().valid("male","female"),
        phone:Joi.string().pattern(/^(\+201|01)[0-2,5]{1}[0-9]{8}/)
    }),

}
export const passwordSchema={
    body:Joi.object({
        oldPassword: Joi.string().pattern(/^^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        password: Joi.string().pattern(/^^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        cpassword: Joi.string().valid(Joi.ref('password')),

    }).options({presence:"required"}),

}
export const idValid=(value,helper)=>{
    const valid=Types.ObjectId.isValid(value)
    return valid?value:helper.message(`inValid id :${value}`)
}
export const shareProfileSchema={
    params:Joi.object({
        id:Joi.string().custom(idValid).required()
    })
}