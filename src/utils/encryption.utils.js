import crypto from "node:crypto";


//generate 32byte random
const ENC_KEY= Buffer.from("cd52c565f826b14198c4ca47bed0cd4db05c4f0678515da8cf65173a52a50ea9", "hex")
console.log(ENC_KEY)
const ENC_IV_LENGTH=16


//Symmetric Encryption

export const encryption=(plainText)=>{
    //Generate iv based on iv lenght
    const iv = crypto.randomBytes(parseInt(ENC_IV_LENGTH))

    //create cipher object= algo - key - iv 
    const cipher= crypto.createCipheriv("aes-256-cbc", ENC_KEY , iv)

    //update cipher with plaintext encryption
    let encrypted  = cipher.update(plainText, "utf-8", 'hex')

    //finlaize encryption with .final() to handle padding
    encrypted += cipher.final('hex')

    //return iv in hex string : Encrypted data
    return `${iv.toString('hex')}:${encrypted}`

}


//Symmetric decryption
export const decryption=()=>{
    
}