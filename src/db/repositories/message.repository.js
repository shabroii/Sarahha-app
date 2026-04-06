import message from "../models/message.model.js";
import { baseRepository } from "./base.repository.js";


 class messageRepository extends baseRepository{

    constructor(){
        super(message)
    }
    

 }


 export default new messageRepository();