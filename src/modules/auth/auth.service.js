import { AssymetricEncryption, encryption } from "../../common/security/encryption.js";
import { CHANNELS, comparePassword, createLoginCredentials , generateToken, hashPass, USER_ROLES } from '../../common/index.js'
// import User from "../../db/models/user.model.js";
import userRepository from "../../db/repositories/user.repository.js";
import { emailEvents, sendEmail } from "../../common/services/email.service.js";
import { otpTemplate } from "../../utils/template.js";
import { generateOtp } from "../../utils/generateOtp.js";





export const register= async (body)=>{

const {firstName, lastName, email, password, age, gender, phoneNumber}= body

const EmailExist= await userRepository.findOneDocument({email}, {email:1})
// console.log({EmailExist})

if(EmailExist){
    throw new Error('Email already exists')
}

const hashedPassword= await hashPass(password , 10)

const userData={
    firstName,
    lastName,
    email,
    password:hashedPassword,
    gender,
    age,
    role:USER_ROLES.USER
}

if(phoneNumber){
    userData.phoneNumber =encryption(phoneNumber)
}

const otp = generateOtp()

userData.otps = [{value:otp,  expireAt:Date.now() + 10 * 60 * 1000, channle:CHANNELS.EMAIL}]
console.log("otp>>>>", otp)


// try {
//   await sendEmail({
//     to: email,
//     subject: "Verify Your Email - Sarahah 💬",
//     html:otpTemplate({firstName:firstName, otp:otp})
//   });
// } catch (error) {
//   console.log("OTP email failed:", error);
// }


emailEvents.emit('sendEmail', {to:email, subject:'Verify Your Email - Sarahah 💬', html:otpTemplate({firstName:firstName, otp:otp}) })

const user= await userRepository.createDocument(userData)

return user;
}




export const verifiEmail = async (body)=>{
const {email, otp}=body

const user = await userRepository.findOneDocument({email})
if(!user){
    throw new Error('user not found', {cause:{status:404}})
}

const otpObject = user.otps.find(({value})=>{
    return value == otp
})

if(!otpObject){
    throw new Error('otp not found', {cause:{status:404}})
}

if(otpObject.expireAt < Date.now()){
    throw new Error("otp Expired", {cause:{status:400}})
}

const newOtps = user.otps.filter(({value})=>{
    return value !=otp
})
return await userRepository.findByIdAndUpdate({id: user._id, data:{isEmailVerified:true, otps:newOtps}, options:{new:true} })
}



export const resendOtp= async (body)=>{
const {email} = body 
const user = await userRepository.findOneDocument({email})
if(!email){
    throw new Error('user not found', {cause:{status:404}})
}

if(user.isEmailVerified){
    throw new Error('Email Already Verified', {cause:{status:400}})
}

const otp = generateOtp()

const updatedUser = await userRepository.findByIdAndUpdate({id:user._id, data:{otps:[{value:otp , expireAt: Date.now() + 10 * 60 * 1000 , channle:CHANNELS.EMAIL}], options:{new:true}}})

emailEvents.emit('sendEmail', {to:email, subject:'Verify Your Email - Sarahah 💬' , html:otpTemplate({firstName:user.firstName , otp:otp})})

return updatedUser;
}


export const logIn= async (body)=>{
    const {email, password} = body

    const userExist= await userRepository.findOneDocument({email})

    if(!userExist){
        throw new Error('User Not Found !')
    }

    if (!userExist.isEmailVerified) {
    throw new Error("Please verify your email first.");
}

    const isPasswordValid = await comparePassword(userExist.password, password)

    if(!isPasswordValid){
        throw new Error('Invalid Password !')
    }

    

    const {accessToken, refreshToken}= createLoginCredentials  (
        {
        payload:{sub: userExist._id, email, role:userExist.role},   
        }
    )

    return {accessToken, refreshToken};

}