import mongoose from "mongoose";




const messageSchema= new mongoose.Schema({
content:{
    type:String,
    required:true
},
reciverId:{
    type:String,
    ref:'User',
    required:true,
    index:{
        name:'idx_reciverId'
    }
}

},
{
    timestamps:true
}
)



const message= mongoose.models.message || mongoose.model('message', messageSchema)


export default message;