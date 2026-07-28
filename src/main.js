import  './config/env.config.js';
import express from 'express'
import cors from 'cors'
import dbConnection from './db/db.connection.js';
import * as controllers from './modules/index.js'
import {decryption, encryption} from './common/security/encryption.js'
import envConfig from './config/env.config.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import { limiter } from './config/limiter.config.js';
import { corsOptions } from './config/cors.config.js';

const app =express()





//Express App
app.use(express.json())


//Databsae Connection
dbConnection()
app.use(cors(corsOptions))
//Rate Limting
app.use(limiter)

//Controllers
app.use('/auth', controllers.authController)
app.use('/message', controllers.messageController)
app.use('/user', controllers.userController)

app.use(globalErrorHandler)

//Api Test
app.get('/', (req, res)=>{
    res.send('Hello World!')
})


app.use((req, res, next)=>{
    res.send({message:'Route not found'})
})


//Server Start
const port= envConfig.app.PORT
console.log(port)
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})



