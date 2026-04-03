import User from "../../db/models/user.model.js"
import { AssymetricDecryption, encryption } from "../../common/security/encryption.js"



export const getProfileData = async (id)=>{


   const user= await User.findById(id)
    if (!user) {
       throw new Error("User not found");
   }
   if(user.phoneNumber){
    user.phoneNumber = encryption(user.phoneNumber)
   }
   return user
}