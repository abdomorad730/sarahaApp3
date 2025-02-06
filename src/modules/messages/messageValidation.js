import Joi from "joi";
import { idValid } from "../Users/userValidation.js";

export const messageSchema = {
   body:Joi.object({
    content:Joi.string().required(),
    userId:Joi.string().custom(idValid).required()
   }) 
}