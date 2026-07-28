import { decodedToken } from "../common/security/tokens.js"




export const authenticate= async (req, res, next)=>{

    const {authorization}= req.headers
    if(!authorization) {
        throw new Error("Authorization Header Is Required", {cause:{status:400}})
    }

   const user= await decodedToken({token:authorization})
   if(!user){
    throw new Error("Invalid User Credentials, Please Rgister First", {cause:{status:404}})
   }
   req.user = user
   next()
}