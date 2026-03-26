import express from 'express'
import dbConnection from './db/db.connection.js';
import * as controllers from './modules/index.js'
import {decryption, encryption} from './utils/encryption.utils.js'

const app =express()
const port=3000;





//Express App
app.use(express.json())


//Databsae Connection
dbConnection()

//Controllers
app.use('/auth', controllers.authController)
app.use('/message', controllers.messageController)
app.use('/user', controllers.userController)

//Api Test
app.get('/', (req, res)=>{
    res.send('Hello World!')
})


app.use((req, res, next)=>{
    res.send({message:'Route not found'})
})


//Server Start
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})



const encryptedData = encryption('hello world')


const decryptedData= decryption(encryptedData)

console.log({encryptedData, decryptedData})