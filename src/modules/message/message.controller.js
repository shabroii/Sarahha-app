import { Router } from "express";
import { messages } from "./message.service.js";

const messageController=Router()

messageController.post('/sendMessage',async (req, res)=>{
    try {
       const result= await messages(req.body)
        res.status(201).json({message:'Message Sent Successfully', result})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

export default messageController;