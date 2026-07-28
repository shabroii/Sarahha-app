    
// const reqKeys= ['body', 'headers', 'query', 'params']

    export const validation= (schema)=>{
        return (req,res,next)=>{
             const validationErrors=[]
            for(const key in schema){
                // console.log({key, reqSchema:schema[key]})
                const {error}=schema[key].validate(req[key], { abortEarly: false})
                // console.log(error)
                if(error){
                    // console.log(error.details[0].message)
                    validationErrors.push(...error.details.map(err => err.message))
                    console.log({validationErrors})
                }
            }


                if(validationErrors.length > 0){
                    return res.status(400).json({
                        Message: "validation Error",
                        errors:validationErrors
                    })
            }

            
            next()
        }
    }