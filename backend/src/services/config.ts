import dotenv from "dotenv";

dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 5000;

export const passportSecretKey = process.env.PASSPORT_SECRET_KEY!;
export const passportSignUpKey = process.env.PASSPORT_KEY_SIGNUP!;
export const passportSignInKey = process.env.PASSPORT_KEY_SIGNIN!;