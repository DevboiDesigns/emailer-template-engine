import { config } from "dotenv"
config()

const SENDGRID_KEY = process.env.SENDGRID_KEY || ""

export { SENDGRID_KEY }
