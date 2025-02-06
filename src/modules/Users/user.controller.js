import { Router } from "express";
import { addUser, freeze, getProfile, sender, shareAccount, signin, updatePassword, updateProfile } from "./user.services.js";
import { authentecation } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { passwordSchema, shareProfileSchema, signupSchema, updateSchema } from "./userValidation.js";


const userRouter= Router()
userRouter.post('/',validation(signupSchema),addUser)
userRouter.post('/signin',signin)
userRouter.get('/profile',authentecation,getProfile)
userRouter.get('/confirm/:token',sender)
userRouter.patch('/updateProfile',validation(updateSchema),authentecation,updateProfile)
userRouter.patch('/updatePasssword',validation(passwordSchema),authentecation,updatePassword)
userRouter.delete('/freezeAccount',authentecation,freeze)
userRouter.get('/shareAccount/:id',validation(shareProfileSchema),shareAccount)






export default userRouter