import { config as conf } from "dotenv";
conf()

const _config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    SECRET_KEY: process.env.SECRET_KEY,
}

export const config = Object.freeze(_config);