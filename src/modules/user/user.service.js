import User from "../../db/models/user.model.js"
import { AssymetricDecryption, encryption } from "../../common/security/encryption.js"

import { decodedToken, verifyToken } from "../../common/index.js";
import userRepository from "../../db/repositories/user.repository.js";

const JWT_SECRET_USER = "temp_9xA$kL92!s8dH@2kLmZpQ";

export const getProfileData = async (req)=>{
   console.log({req})
   // const accessToken = headers.authorization
   // return decodedToken({
   //    token:accessToken,
   //    // secret:JWT_SECRET_USER
   // })
   return req.user;
 
}



export const updateUser= async(user, body)=>{

const {_id}= user
const {firstName, lastName, email, age, gender}= body

// console.log({_id, body})
if(email){
   const emailExist= await userRepository.findOneDocument({email, _id:{$ne:_id} })
   if(emailExist){
      throw new Error("Email Already Exist", {cause:{status:409}})
   }
}
   
    const updatedUser=userRepository.findByIdAndUpdate({id:_id, data:{firstName, lastName, email, gender, age}, options:{new:true}})
   console.log({updatedUser})
    return updatedUser
}



export const listAllUsers= async ()=>{

   return await userRepository.findDocuments()
}