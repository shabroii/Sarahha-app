import { Router } from "express";
import { logIn, register, resendOtp, verifiEmail } from "./auth.service.js";
import { registerSchema } from "../../validators/index.js";
import { validation } from "../../middlewares/validation.midlleware.js";

const authController=Router()


authController.post('/register',validation(registerSchema),  async (req, res)=>{

try {
    const result = await register(req.body)
    res.status(201).json({message:"User Register Successfully", result})
} catch (error) {
    res.status(400).json({error:error.message})
}
})

authController.put('/verify', async (req, res)=>{

    try {
      const result= await verifiEmail(req.body)
        res.status(200).json({Message:'Email Verified Successfully', data:result})
    } catch (error) {
     res.status(400).json({error:error.message})
    }
})


authController.post('/resend', async (req, res)=>{

    try {
       await resendOtp(req.body)
       res.status(200).json({Message:'Otp Sent Successfully'})
    } catch (error) {
       res.status(400).json({error:error.message})

    }
})

authController.post('/login', async(req, res)=>{

    try {
       const result=  await logIn(req.body)
        res.status(200).json({Message:"User Logged in successfully", accessToken:result })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


export default authController;