import jwt from 'jsonwebtoken'

export const generate = async ({payload={},signature=process.env.CONFIRM_KEY,options={}})=>{
    return jwt.sign(payload,signature,options)
}