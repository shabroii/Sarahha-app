import User from "../../db/models/user.model.js";
import { encryption } from "../../utils/encryption.utils.js";

export const register= async (body)=>{

const {firstName, lastName, email, password, role, gender, phoneNumber}= body

const EmailExist= await User.findOne({email}).select("email")

if(EmailExist){
    throw new Error('Email already exists')
}

const userData={
    firstName,
    lastName,
    email,
    password,
    role,
    gender,
}

if(phoneNumber){
    userData.phoneNumber =encryption(phoneNumber)
}

 return await User.create(userData)



}