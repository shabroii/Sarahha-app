import envConfig from "../../config/env.config.js";
import transporter from "../clients/email.clients.js";
import { EventEmitter } from "node:events";


const fromEmail = envConfig.emails.user
export const sendEmail= async ({to, subject, html})=>{
try {
  const info = await transporter.sendMail({
    from: `SARAHAHH <${fromEmail}>`, 
    to , 
    subject , 
    html , 
  });
  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account

} catch (err) {
  console.error("Error while sending mail:", err);
}
}



export const emailEvents = new EventEmitter()
emailEvents.on('sendEmail', async ({to, subject, html})=>{
  await sendEmail({to, subject, html})
})