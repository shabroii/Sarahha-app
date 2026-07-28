import messageRepository from "../../db/repositories/message.repository.js"



export const messages = async (body, params)=>{
const {content}= body
const {receiverId} = params

return await messageRepository.createDocument({content, receiverId})
}