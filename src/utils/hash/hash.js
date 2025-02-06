import bcrypt from 'bcrypt';

export const hashing = async(key,SALT_ROUNDES)=>{
    return bcrypt.hashSync(key, Number(SALT_ROUNDES))
}