import bcrypt from 'bcrypt'
import argon2 from 'argon2'

//Bcrypt
// export const hashPass= async (plainText, salt)=>{
//     return await bcrypt.hash(plainText, parseInt(salt))
// }



//argon2
export const hashPass= async (plainText)=>{
    return await argon2.hash(plainText)
}


//Bcrypt
// export const comparePassword= async (plainText, hashPassword)=>{
//     return await bcrypt.compare(plainText, hashPassword)
// }



//argon2
export const comparePassword= async ( hashPassword, plainText)=>{
    return await argon2.verify( hashPassword,plainText)
}