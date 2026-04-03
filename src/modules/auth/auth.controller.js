import { Router } from "express";
import { logIn, register } from "./auth.service.js";

const authController=Router()


authController.post('/register', async (req, res)=>{

try {
    const result = await register(req.body)
    res.status(201).json({message:"User Register Successfully", result})
} catch (error) {
    res.status(400).json({error:error.message})
}
})




authController.post('/login', async(req, res)=>{


    try {
       const result=  await logIn(req.body)
        res.status(200).json({Message:"Logged in successfully", Data:result })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


export default authController;