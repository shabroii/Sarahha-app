import { AssymetricEncryption, encryption } from "../../common/security/encryption.js";
import { comparePassword, hashPass } from '../../common/index.js'
// import User from "../../db/models/user.model.js";
import userRepository from "../../db/repositories/user.repository.js";






export const register= async (body)=>{

const {firstName, lastName, email, password, role, gender, phoneNumber}= body

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
    role,
    gender,
}

if(phoneNumber){
    userData.phoneNumber =encryption(phoneNumber)
}

 return await userRepository.createDocument(userData)

}



export const logIn= async (body)=>{
    const {email, password} = body

    const userExist= await userRepository.findOneDocument({email})

    if(!userExist){
        throw new Error('User Not Found !')
    }

    const isPasswordValid = await comparePassword(userExist.password, password)

    if(!isPasswordValid){
        throw new Error('Invalid Password !')
    }

    return userExist;

}