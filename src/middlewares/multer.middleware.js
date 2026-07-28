import multer from "multer";
import path from "node:path"
import fs from "node:fs"
import { fileExtentions } from "../common/index.js";


const multerLocal = (folderName)=>{
    const storage = multer.diskStorage({
        destination:function(req, file, cb){
            const destination = `uploads/${folderName}`

            if(!fs.existsSync(destination)){
                fs.mkdirSync(destination, {recursive:true})
            }
            cb(null, destination)

        },
        filename:function(req, file, cb){
            const uniqueName = Date.now() + path.extname(file.originalname)
            cb(null, uniqueName)
        }
    })

    const fileFilter = (req, file, cb)=>{
        const [type, ext ]= file.mimetype.split('/')
        const allowedExt = fileExtentions[type]

        if(allowedExt.includes(ext)){
            return cb(null, true)
        }else{
            cb(new Error('File Type Not Allowed'), false)
        }
    }

    

    return multer({fileFilter, storage})
}


export default multerLocal;