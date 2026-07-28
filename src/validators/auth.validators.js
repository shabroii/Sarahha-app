import Joi from "joi";
import { GENDER } from "../common/index.js";



export const registerSchema={
    body: Joi.object({
        firstName:Joi.string().min(3).max(30).required(),
        lastName:Joi.string().min(3).max(30).required(),
        email:Joi.string().email().required().messages({
        "string.email": "Invalid email format: example example@gmail.com",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }).trim().lowercase(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).messages({"string.pattern.base" :"Password must contain uppercase, lowercase, number and special character from [#?!@$%^&*-]"}).required(),
        gender: Joi.string().valid(...Object.values(GENDER)).required(),
        age: Joi.number().required(),
        phoneNumber: Joi.string().required()

    })
}   