import crypto from "node:crypto";
import fs from "node:fs"


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



// "b75abf3492c8ae915d8bf4c73552a489:fade9c2f8ad1692b04f2c08e7ef22b0a"
//Symmetric decryption

export const decryption=(inputCipher)=>{
    //Split sipher- [iv - encryption data]
    const [iv, encryptedData] = inputCipher.split(":")
    // console.log({encryptedData})
    const bufferIv = Buffer.from(iv, "hex")
    const decCipher= crypto.createDecipheriv('aes-256-cbc', ENC_KEY, bufferIv )
    let decrypted = decCipher.update(encryptedData, "hex", "utf-8")
    decrypted+= decCipher.final("utf-8")
    return decrypted;

}




//Asymmetric Encryption

//First - Genrate 2Keys [Puplic - Private]
// puplic Key For Encryption
// Private Key For Decryption

if(fs.existsSync('publicKey.pem') && fs.existsSync('privateKey.pem')){
    console.log('Keys Already Exist')
}else{
    const {publicKey, privateKey}= crypto.generateKeyPairSync('rsa',
    {
        modulusLength:2048,
        publicKeyEncoding:{
            type:"pkcs1",
            format:'pem'
        },
        privateKeyEncoding:{
            type:"pkcs1",
            format:"pem"
        }
    }
)
fs.writeFileSync('publicKey.pem', publicKey)
fs.writeFileSync('privateKey.pem',privateKey )
}


export const AssymetricEncryption=(text)=>{

    const bufferdText = Buffer.from(text, "utf-8")
    const publicKey= fs.readFileSync('publicKey.pem')

    const encryptedData = crypto.publicEncrypt({
        key:publicKey,
        padding:crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    bufferdText
)
return encryptedData.toString('hex')
}

export const AssymetricDecryption=(text)=>{

    const bufferdText = Buffer.from(text, "hex")
    const privateKey= fs.readFileSync('privateKey.pem')

    const decryptedData = crypto.privateDecrypt({
        key:privateKey,
        padding:crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    bufferdText
)
return decryptedData.toString('utf-8')
}

