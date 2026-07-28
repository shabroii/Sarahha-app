import { Router } from "express";
import { getProfileData, listAllUsers, updateUser } from "./user.service.js";
import { authenticate } from "../../middlewares/authentication.middleware.js";
import { USER_ROLES } from "../../common/constants.js";
import { authorized } from "../../middlewares/authorization.middleware.js";
import multerLocal from "../../middlewares/multer.middleware.js";

const userController=Router()

userController.get("/profile",authenticate, async (req, res)=>{

    // const {id} = req.params
    try {
       const result= await getProfileData(req)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})




userController.put("/update", authenticate, async (req, res)=>{

 
    try {
        const result =await updateUser(req.user, req.body)
        res.status(200).json({Message:"User Updated Successfully", result})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
  
})


userController.get("/allUsers", authenticate , authorized([USER_ROLES.ADMIN]), async (req, res)=>{
    try {
       const users= await listAllUsers()
        res.status(200).json({AllUsers:users})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})



userController.patch('/upload/profile', authenticate, multerLocal('profiles').single('profilePicture') , (req, res)=>{
    try {
        console.log(req.file)
        res.status(200).json({message:"Profile Picture Upload Successfully"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
export default userController;