import jwt from 'jsonwebtoken'

export const verify = async (token,signature=process.env.CONFIRM_KEY)=>{
    return jwt.verify(token,signature )
}