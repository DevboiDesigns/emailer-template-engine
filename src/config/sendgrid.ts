import { SENDGRID_KEY } from "./env.keys"
import sgMail from "@sendgrid/mail"
sgMail.setApiKey(SENDGRID_KEY)
export default sgMail
