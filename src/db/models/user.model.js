import mongoose  from "mongoose";
import { GENDER, STATUS, USER_ROLES } from "../../common/constants.js";


 const userSchema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,
            minLength:[3, 'First name must be at least 3 characters long'],
            maxlength:[60, 'Last name must be less than 60 characters long']
        },
        lastName:{
            type:String,
            trim:true,
            minLength:[3, 'First name must be at least 3 characters long'],
            maxlength:[60, 'Last name must be less than 60 characters long']
        },
        email:{
            type:String,
            required:true,
            index:{
                unique:true,
                name:"index_email_unique"
            }
        },
         password:{
                type:String,
                required:true
            },
             phoneNumber:{
                type:String
            },
          role:{
                type:String,
                required:true,
                enum:Object.values(USER_ROLES)
            },
                   gender:{
                type:String,
                required:true,
                enum:Object.values(GENDER)
            },
            status:{
                type:String,
                required:true,
                enum:Object.values(STATUS),
                default:STATUS.ACTIVE
            }
    },
    {
        timestamps:true,
        toJSON:{ getters:true},
        toObject:{getters:true}
    }
)

userSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName
})


const User= mongoose.model('users', userSchema)


export default User; 