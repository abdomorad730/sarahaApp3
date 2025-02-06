import cryptoJs from 'crypto-js'

export const decrypt = async (key,signature=process.env.SECRET_KEY_ADMIN)=>{
    return  cryptoJs.AES.encrypt(key,signature ).toString(cryptoJs.enc.Utf8)
}