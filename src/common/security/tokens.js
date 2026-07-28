import jwt from "jsonwebtoken"
import userRepository from "../../db/repositories/user.repository.js";
import envConfig from "../../config/env.config.js";

const jwtSecret = envConfig.jwt.ACCESS_SIGNATURE


//Generate Token
export const generateToken = ({payload, secret, options})=>{
    return jwt.sign(payload, secret, options)
}


//Verify Token 
export const verifyToken = ({token, secret, options})=>{
    return jwt.verify(token, secret, options)
}


//Create Token Credintials
export const createLoginCredentials = ({payload, secret})=>{
 const accessToken= generateToken( 
    { payload,
     secret:jwtSecret, 
     options:{expiresIn:'1d'}
    })

 const refreshToken= generateToken( 
    { payload,
     secret:jwtSecret, 
     options:{expiresIn:'30d'}
    })
 
    return {accessToken, refreshToken}
}




export const decodedToken = ({token, secret})=>{
 
    
   const decodedData= verifyToken( { token, secret:jwtSecret })

    if(!decodedData.sub) throw new Error("Invalid Payload !",{cause:{status:400}})
    
    return userRepository.findDocumentById(decodedData.sub)

}


