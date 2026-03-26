import mongoose from "mongoose";

const url="mongodb://localhost:27017/sarahah"

const dbConnection= async ()=>{
    try {
        await mongoose.connect(url)
        console.log('Database connected successfully')
    } catch (error) {
        console.log('database connection faild' , error)
    }
}


export default dbConnection;