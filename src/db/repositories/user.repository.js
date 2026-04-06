import User from "../models/user.model.js"
import { baseRepository } from "./base.repository.js"


 class userRepository extends baseRepository{

   constructor(){
      super(User)
   }


    
}

export default new userRepository()