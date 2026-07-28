import nodemailer from 'nodemailer'
import { emailConfig } from '../../config/email.config.js'



const transporter = nodemailer.createTransport(emailConfig)

export default transporter;