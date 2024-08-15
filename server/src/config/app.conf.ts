import dotenv from 'dotenv'
dotenv.config()

export const SECRET_SAUCE = process.env.SECRET_SAUCE || ''
export const PORT = process.env.PORT
export const SALT_ROUND = process.env.SALT_ROUND
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET
export const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL
