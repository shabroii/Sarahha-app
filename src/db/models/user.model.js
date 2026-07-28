import mongoose, { mongo }  from "mongoose";
import { CHANNELS, GENDER, STATUS, USER_ROLES } from "../../common/constants.js";


 const userSchema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,
            minLength:[3, 'First name must be at least 3 characters long'],
            maxlength:[30, 'Last name must be less than 30 characters long']
        },
        lastName:{
            type:String,
            trim:true,
            minLength:[3, 'First name must be at least 3 characters long'],
            maxlength:[30, 'Last name must be less than 30 characters long']
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
                enum:Object.values(USER_ROLES),
                default:USER_ROLES.USER
            },
            gender:{
                type:String,
                required:true,
                enum:Object.values(GENDER)
            },
            age:{
                type:Number,
                required:true,
                min:18,
                max:65
            },
            status:{
                type:String,
                required:true,
                enum:Object.values(STATUS),
                default:STATUS.ACTIVE
            },
            otps:[{
                value:{
                    type:String,
                    required:true
                },
                expireAt:{
                    type:Date,
                    default: Date.now() + 10 * 60 * 1000
                },
                channle:{
                    type:String,
                    enum:Object.values(CHANNELS)
                }
            }],
            isEmailVerified:{
                type:Boolean,
                default:false
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


const User=mongoose.models.User || mongoose.model('users', userSchema)


export default User; 