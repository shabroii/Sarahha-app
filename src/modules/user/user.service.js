import User from "../../db/models/user.model.js"
import { decryption } from "../../utils/encryption.utils.js"



export const getProfileData = async (id)=>{


   const user= await User.findById(id)
   if(user.phoneNumber){
    user.phoneNumber = decryption(user.phoneNumber)
   }
   return user
}