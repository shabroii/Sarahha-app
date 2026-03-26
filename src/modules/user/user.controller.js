import { Router } from "express";
import { getProfileData } from "./user.service.js";

const userController=Router()

userController.get("/profile/:id", async (req, res)=>{

    const {id} = req.params
    try {
       const result= await getProfileData(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})




export default userController;