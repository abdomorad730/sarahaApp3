
import jwt from 'jsonwebtoken'
import userModel from '../db/models/users.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const authentecation = asyncHandler(async (req, res, next) => {
    
    const { authorization } = req.headers
    if (!authorization) {
        return next(new Error("login first" ))
    }
    const [prefix, token] = authorization.split(' ')
    let secret_key = ''
    if (prefix == "admin") {
        secret_key = process.env.SECRET_KEY_ADMIN
    } else {
        secret_key = process.env.SECRET_KEY_USER

    }

    const decoded = jwt.verify(token, secret_key)
    if (!decoded?.id) {
        return next(new Error("invalid token"))
    }
    let user = await userModel.findById(decoded.id)

    if (!user) {
        return next(new Error("user not found"))
    }
    if(decoded?.iat<parseInt(user?.passwordChangedAt?.getTime())/1000 ){
        return next(new Error("token is expired",{cause:401}))
    }
    if(user?.isDeleted){
        return next(new Error("user is deleted",{cause:401}))

    }
    req.user = user
    next()

})