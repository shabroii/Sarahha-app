import { Router } from "express";
import { register } from "./auth.service.js";

const authController=Router()


authController.post('/register', async (req, res)=>{

try {
    const result = await register(req.body)
    res.status(201).json({message:"User Register Successfully", result})
} catch (error) {
    res.status(400).json({error:error.message})
}
})


export default authController;