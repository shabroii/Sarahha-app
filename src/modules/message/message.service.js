import messageRepository from "../../db/repositories/message.repository.js"



export const messages = async (body)=>{
const {content, reciverId}= body

return await messageRepository.createDocument({content, reciverId})
}