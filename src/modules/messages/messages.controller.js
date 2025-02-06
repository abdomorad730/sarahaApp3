import { Router } from "express";
import { sendMessages,getMessages } from "./message.services.js";
import { validation } from "../../middleware/validation.js";
import { messageSchema } from "./messageValidation.js";
import { authentecation } from "../../middleware/auth.js";
const messageRouter=Router()
messageRouter.post('/',validation(messageSchema),sendMessages)
messageRouter.get('/',authentecation,getMessages)

export default messageRouter