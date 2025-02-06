import cryptoJs from 'crypto-js'

export const encrypt = async (key,signature=process.env.SECRET_KEY_ADMIN)=>{
    return  cryptoJs.AES.encrypt(key,signature ).toString()
}